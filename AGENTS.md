# AGENTS.md

Instrukcje dla każdego agenta AI (Claude Code, Codex, Cursor, Copilot, OpenCode i in.) pracującego w tym repozytorium. Reguły oznaczone **MUSISZ** są obowiązkowe — nie pomijaj ich, nawet przy drobnych zadaniach.

## Struktura katalogu `.ai/`

```
.ai/
├── specs/                    # specyfikacje SDD (spec-driven development)
│   ├── YYYY-MM-DD-slug.md    # specyfikacje aktywne: szkic, zatwierdzone, w realizacji
│   ├── implemented/          # specyfikacje w pełni wdrożone
│   └── archive/              # specyfikacje porzucone lub zastąpione
├── runs/                     # logi autonomicznych przebiegów AI
│   └── YYYY-MM-DD-slug.md
├── lessons.md                # indeks wniosków — czytaj na początku każdej pracy
├── lessons/                  # pełne opisy wniosków
│   └── YYYY-MM-DD-slug.md
├── prototypes/               # prototypy HTML (discovery)
├── qa/                       # narzędzia QA (Playwright)
└── browsers/                 # opis providera przeglądarki
```

`.ai/cezar/` to wewnętrzny katalog cockpitu cezar (worktree, jego własne logi). Nie zapisuj tam niczego i nie myl go z `.ai/runs/`.

### Konwencja nazw

Każdy nowy plik w `.ai/specs/`, `.ai/runs/` i `.ai/lessons/` **MUSI** mieć nazwę `YYYY-MM-DD-slug.md`:

- `YYYY-MM-DD` to data utworzenia pliku (nie data ostatniej zmiany). Przy przenoszeniu do `implemented/` lub `archive/` nazwa się nie zmienia.
- `slug` pisz małymi literami, bez polskich znaków, słowa łącz myślnikami, maks. ok. 6 słów, np. `2026-10-20-review-ai-eskalacja.md`.
- Jeśli nazwa jest zajęta, dodaj sufiks `-2`, `-3` itd.

Wyjątki: istniejące artefakty discovery (`.ai/specs/product-brief.md`, `.ai/specs/ux-shape-rdzen-ai.md`, `.ai/specs/research/`) zachowują obecne nazwy i położenie, bo odwołują się do nich inne dokumenty.

## Zasady obowiązkowe

### 1. Na początku każdego zadania

1. **MUSISZ** przeczytać `.ai/lessons.md` i otworzyć z `.ai/lessons/` pełne wpisy powiązane z zadaniem.
2. **MUSISZ** sprawdzić, czy w `.ai/specs/` jest aktywna specyfikacja dla zadania. Jeśli jest, pracuj zgodnie z nią.

### 2. Specyfikacje (SDD) — `.ai/specs/`

- Każda nietrywialna zmiana (nowa funkcja, zmiana zachowania, zmiana architektury) **MUSI** zaczynać się od specyfikacji w `.ai/specs/YYYY-MM-DD-slug.md`. Najpierw specyfikacja, potem kod. Literówki, drobne poprawki i zmiany w samej dokumentacji nie wymagają specyfikacji.
- Jeśli kod musi odejść od specyfikacji, najpierw zaktualizuj specyfikację (sekcja „Decyzje” z datą), potem zmień kod.
- Cykl życia (zawsze przez `git mv`, żeby zachować historię):
  - wdrożona w całości → `status: implemented`, przenieś do `.ai/specs/implemented/`;
  - porzucona lub zastąpiona → `status: archived` (przy zastąpieniu `superseded_by`), przenieś do `.ai/specs/archive/`.
- W katalogu głównym `.ai/specs/` zostają tylko specyfikacje o statusie `draft`, `approved` lub `in-progress`.

Szablon specyfikacji:

```markdown
---
title: <tytuł>
status: draft            # draft | approved | in-progress | implemented | archived
created: YYYY-MM-DD
updated: YYYY-MM-DD
owner: <osoba>
superseded_by:           # tylko przy archiwizacji
---

# <tytuł>

## Kontekst i problem
## Cel i zakres (w zakresie / poza zakresem)
## Wymagania (numerowane, testowalne)
## Projekt rozwiązania
## Kryteria akceptacji
## Plan i zadania
## Decyzje (data — decyzja — powód)
## Otwarte pytania
```

### 3. Logi przebiegów — `.ai/runs/`

- Każdy przebieg autonomiczny, czyli praca AI bez bieżącego nadzoru człowieka (zadanie zlecone agentowi, przebieg w tle, automatyzacja, subagent z własnym zadaniem), **MUSI** zostawić log w `.ai/runs/YYYY-MM-DD-slug.md`.
- Załóż plik na początku przebiegu i aktualizuj go w trakcie, nie dopiero na końcu, żeby przerwany przebieg też zostawił ślad.
- Log commituj razem ze zmianami, których dotyczy.
- Log jest zapisem faktów. Nie wpisuj, że coś działa lub przeszło testy, jeśli tego nie sprawdziłeś. Wpisz wtedy, czego nie zweryfikowano.

Szablon logu:

```markdown
---
date: YYYY-MM-DD
agent: <narzędzie / model>
status: in-progress       # in-progress | done | partial | failed | blocked
spec: .ai/specs/<plik>.md # jeśli dotyczy
branch: <gałąź>
---

# <cel przebiegu>

## Zlecenie
## Przebieg (najnowsze na górze, z godziną)
## Zmienione pliki
## Weryfikacja (polecenia i ich wynik)
## Wynik i stan końcowy
## Problemy, ryzyka, otwarte kwestie
## Wnioski (→ link do .ai/lessons/, jeśli powstał wpis)
```

### 4. Wnioski i pamięć długoterminowa — `.ai/lessons.md` i `.ai/lessons/`

`.ai/lessons/` to wspólna, wersjonowana pamięć długoterminowa projektu dla wszystkich agentów i ludzi. Prywatna pamięć narzędzia (np. auto-memory Claude) jej nie zastępuje.

**MUSISZ** dodać wpis, gdy:

- naprawisz błąd, którego przyczyna była nieoczywista lub może wrócić;
- odkryjesz pułapkę w narzędziach, środowisku, bibliotece lub procesie;
- użytkownik poprawi Twoje podejście albo potwierdzi nieoczywisty sposób pracy;
- ustalisz coś, co powinien wiedzieć następny agent: konwencję, decyzję, usprawnienie procesu.

Nie zapisuj tego, co wynika wprost z kodu, historii gita lub specyfikacji.

Jak zapisać wniosek:

1. Sprawdź `.ai/lessons.md`. Jeśli temat już jest opisany, zaktualizuj istniejący wpis zamiast tworzyć duplikat. Wpis, który okazał się błędny, popraw albo usuń.
2. Utwórz `.ai/lessons/YYYY-MM-DD-slug.md` według szablonu poniżej.
3. Dodaj jedną linię do `.ai/lessons.md` w odpowiedniej sekcji: `- [Tytuł](lessons/YYYY-MM-DD-slug.md) — jedno zdanie: kiedy to ma znaczenie`.

Szablon wpisu:

```markdown
---
date: YYYY-MM-DD
tags: [<obszar>, <narzędzie>]
source: <run / spec / commit / rozmowa>
---

# <tytuł>

## Kontekst — co się stało
## Wniosek — co jest prawdą
## Jak stosować — co robić następnym razem
```

### 5. Na koniec zadania

Zanim uznasz zadanie za zakończone, sprawdź:

- [ ] specyfikacja ma aktualny status, a wdrożona lub porzucona jest przeniesiona do `implemented/` lub `archive/`;
- [ ] log przebiegu w `.ai/runs/` jest kompletny (przy pracy autonomicznej);
- [ ] nowe wnioski są zapisane w `.ai/lessons/` i dopisane do indeksu `.ai/lessons.md`;
- [ ] nowe pliki mają nazwy `YYYY-MM-DD-slug.md`.
