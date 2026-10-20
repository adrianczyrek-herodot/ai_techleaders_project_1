---
date: 2026-10-20
agent: Claude Code / claude-opus-5-5
status: done
spec:
branch: cez/3a88849d
---

# Zasady z 10 wskazówek Borisa Cherny’ego w AGENTS.md

## Zlecenie

Przeczytać https://ykdojo.github.io/claude-code-tips/content/boris-claude-code-tips, wybrać zasady przydatne w projekcie (planowanie złożonych zadań, weryfikacja zmian, zapisywanie wniosków po poprawkach) i dopisać je zwięźle do `AGENTS.md` bez duplikowania istniejących instrukcji. Upewnić się, że `CLAUDE.md` wczytuje `@AGENTS.md`.

## Przebieg

- WebFetch odrzucony (headless cezar). Stronę pobrano przez `curl` do katalogu tymczasowego poza repozytorium → wniosek w `.ai/lessons/`.
- Na gałęzi zadania nie było `AGENTS.md` ani `CLAUDE.md`; powstały w równoległym zadaniu na `cez/ee491100` (commit `32d0b86`). Gałąź przesunięto fast-forwardem na ten commit, żeby dopasować się do istniejących zasad.
- Wybrane wskazówki: 2 (plan mode, re-plan, przegląd planu przez drugiego agenta), 3 (reguła po każdej korekcie), 4 (powtarzalne czynności jako skrypt/skill w repo), 5 (samodzielne naprawianie błędów — tu jako „odtwórz, napraw, potwierdź”), 6 (przegląd własnych zmian, przepisanie nieeleganckiej poprawki, precyzyjne zlecenie), 8 (subagenci, równoległość przy rozłącznym zakresie).
- Pominięte jako niezwiązane z repozytorium: 7 (terminal), 9 (analityka danych), 10 (style wyjaśniania).
- Dodano sekcje 5 „Planowanie i realizacja” i 6 „Weryfikacja zmian”, akapit o regule po poprawce w sekcji 4, punkt weryfikacji w checkliście (teraz sekcja 7). W `CLAUDE.md` dopisano odwołanie do sekcji 5 przy plan mode; import `@AGENTS.md` już był.

## Zmienione pliki

- `AGENTS.md`, `CLAUDE.md`
- `.ai/lessons/2026-10-20-webfetch-zablokowany-w-cezar.md`, `.ai/lessons.md`
- ten log

## Weryfikacja

- `grep -n '@AGENTS.md' CLAUDE.md` — import obecny.
- `grep -n '^### ' AGENTS.md` — sekcje 1–7 w kolejności, bez luk; odwołania „sekcja 4” (`.ai/lessons.md`) i „Na koniec zadania” (`CLAUDE.md`) nadal trafne.

## Wynik i stan końcowy

Zasady dopisane. Nie sprawdzano, czy agenci faktycznie się do nich stosują — to wyjdzie w kolejnych zadaniach.

## Wnioski

- [WebFetch bywa zablokowany w zadaniach cezar](../lessons/2026-10-20-webfetch-zablokowany-w-cezar.md)
