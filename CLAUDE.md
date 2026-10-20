# CLAUDE.md

Pełne zasady pracy w repozytorium są w `AGENTS.md`, importowanym poniżej. Obowiązują Claude Code bez wyjątków.

@AGENTS.md

## Skrót dla Claude Code

Katalog `.ai/` jest obowiązkową warstwą pracy AI w tym projekcie:

| Ścieżka | Do czego | Kiedy |
|---|---|---|
| `.ai/specs/YYYY-MM-DD-slug.md` | specyfikacje SDD (aktywne) | przed każdą nietrywialną zmianą w kodzie |
| `.ai/specs/implemented/` | specyfikacje wdrożone | po wdrożeniu (`git mv`) |
| `.ai/specs/archive/` | specyfikacje porzucone lub zastąpione | po porzuceniu (`git mv`) |
| `.ai/runs/YYYY-MM-DD-slug.md` | log autonomicznego przebiegu | od początku każdego przebiegu bez nadzoru człowieka |
| `.ai/lessons.md` | indeks wniosków | czytaj na starcie każdego zadania |
| `.ai/lessons/YYYY-MM-DD-slug.md` | pełny opis wniosku | po nieoczywistym bugfixie, korekcie od użytkownika, odkryciu pułapki |

Zasady specyficzne dla Claude Code:

- Auto-memory Claude (`~/.claude/projects/.../memory/`) jest prywatna i niewidoczna dla innych agentów. Wnioski dotyczące projektu **MUSISZ** zapisywać w `.ai/lessons/`. W auto-memory zapisuj najwyżej preferencje użytkownika niezwiązane z tym repozytorium.
- Przy pracy w trybie planowania (plan mode) zapisz zatwierdzony plan jako specyfikację w `.ai/specs/`, zanim zaczniesz implementację. Złożone zadania zaczynaj w plan mode i wracaj do niego, gdy realizacja zbacza z planu (`AGENTS.md`, sekcja 5).
- Subagent lub zadanie cezar z własnym zleceniem to przebieg autonomiczny, więc zakłada własny log w `.ai/runs/`.
- Przed zakończeniem zadania przejdź checklistę z sekcji „Na koniec zadania” w `AGENTS.md`.
