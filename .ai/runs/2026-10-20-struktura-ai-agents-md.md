---
date: 2026-10-20
agent: Claude Code / claude-opus-5-5
status: done
spec:
branch: cez/ee491100
---

# Struktura `.ai/` oraz AGENTS.md i CLAUDE.md

## Zlecenie

Utworzyć `AGENTS.md`, `CLAUDE.md` oraz w `.ai/`: `specs/` (z `implemented/` i `archive/`), `runs/`, `lessons.md` i `lessons/`. Nazwy plików w formacie `YYYY-MM-DD-slug.md`. Opisać strukturę i zapisać instrukcje wymuszające korzystanie z niej.

## Przebieg

- Sprawdzono istniejące `.ai/`: są w nim `specs/` z artefaktami discovery bez daty w nazwie, `prototypes/`, `qa/` i `browsers/`. Istniejących plików nie przemianowano, w `AGENTS.md` opisano je jako wyjątki.
- Utworzono katalogi z plikami `.gitkeep`, indeks `.ai/lessons.md`, `AGENTS.md` (pełne zasady i szablony) oraz `CLAUDE.md` (import `@AGENTS.md` i zasady specyficzne dla Claude Code).
- Bez specyfikacji: zmiana dotyczy tylko dokumentacji i procesu.

## Zmienione pliki

- `AGENTS.md`, `CLAUDE.md`
- `.ai/lessons.md`
- `.ai/specs/implemented/.gitkeep`, `.ai/specs/archive/.gitkeep`, `.ai/runs/.gitkeep`, `.ai/lessons/.gitkeep`
- ten log

## Weryfikacja

- `git status` — nowe pliki widoczne, nic nie jest ignorowane.

## Wynik i stan końcowy

Struktura gotowa i opisana. Nie powstały żadne wnioski do `.ai/lessons/`.
