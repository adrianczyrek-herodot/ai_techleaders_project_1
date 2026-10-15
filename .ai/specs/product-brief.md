# Review-first Mentoring — product brief

- Date: 2026-10-15 (cztery refreshe tego samego dnia; ostatni: potwierdzenie briefu przez właściciela i odpowiedzi na Q13–Q15, D23–D26)
- Mode: own; Owner: Adrian Czyrek; Pass: full
- Evidence basis: wyłącznie decyzje właściciela, zapisane w sześciu rekordach (zlecenie D01, kontynuacja na założeniach D06, odpowiedzi D07–D12, D13–D17, D18–D22 i D23–D26). Brak wywiadów, danych i sprawdzonych benchmarków. Rozmowy z juniorami i mentorami właściciel świadomie odłożył (D12), więc problem i grupa docelowa pozostają niesprawdzone. Najbardziej ryzykowne niesprawdzone przekonanie: `confidence` deklarowana przez model odróżnia trafne uwagi `major`/`critical` od błędnych na tyle, że R09 wyłapuje przypadki wymagające mentora (A03, A04). Pierwszy test: golden set 10–15 próbek jako orientacja (D12, D17); potem faza kalibracji, w której mentor widzi pierwsze 50 zgłoszeń (D21).
- Coverage: 83 claims — 68 sourced (interview 0, data 0, document 68, product 0, benchmark 0), 0 synthetic, 15 assumed; 1 entries on the collection plan
- Synthetic hypotheses outside Coverage: 0
- Definition of Ready signed by: Adrian Czyrek, 2026-10-15 (D23) — problem i grupa docelowa zaakceptowane jako niesprawdzone (D12); ready for: koncepcja i klikalne mockupy (Etap 1 i 2 z D03) oraz kalibracja na golden secie; nie dla planowania wdrożenia produktu
- Sources: `.ai/specs/research/decisions/2026-10-15-D01-zakres-mvp.md`, `.ai/specs/research/decisions/2026-10-15-D06-kontynuacja-na-zalozeniach.md`, `.ai/specs/research/decisions/2026-10-15-D07-D12-odpowiedzi-wlasciciela.md`, `.ai/specs/research/decisions/2026-10-15-D13-D17-metryki-i-akcje-mentora.md`, `.ai/specs/research/decisions/2026-10-15-D18-D22-walidacje-recall-faza-kalibracji.md`, `.ai/specs/research/decisions/2026-10-15-D23-D26-potwierdzenie-briefu.md`

## Decision summary

Decyzja bieżąca: discovery zamknięte (D22), brief potwierdzony przez właściciela (D23). Zakres MVP, reguły eskalacji, metryki evals i kryteria porzucenia są ustalone przez właściciela i stanowią podstawę koncepcji (Etap 1) oraz klikalnych mockupów (Etap 2). Przy konflikcie celów wygrywa nauka AI engineeringu (D08).

Nie mamy obserwacji, jak juniorzy dziś dostają review ani ile czasu poświęcają mu mentorzy (Problems, Target group). Właściciel odłożył rozmowy (D12); problem pozostaje założeniem A01–A02, zaakceptowanym bez testu.

Teraz robimy: zgłoszenie kodu, review AI według rubryki, eskalację decydowaną przez kod (R09, R10), fazę kalibracji, w której pierwsze 50 zgłoszeń trafia do mentora w 100%, a potem 20% zgłoszeń nieeskalowanych jako próbka losowa (R16; nieeskalowane zgłoszenia z fazy kalibracji należą do próbki, D24) — panel mentora z dodawaniem własnych uwag z twardą walidacją „dlaczego” (R13, R15) oraz evals: precyzja ścisła i luźna, szacunkowy recall i stan kryteriów porzucenia (D13, R17, R19). Junior od razu widzi review AI z etykietą „czeka na mentora”, tak samo przy eskalacji i próbce (D07, R12). Bez płatności, kalendarza, wyszukiwarki i ocen mentorów, czatu i powiadomień (N01–N05).

Najbardziej ryzykowne: R09 polega na `confidence` i wagach nadanych przez ten sam model (A03). Przeoczenia AI są mierzalne w próbce (R14, R17), a dwa kryteria porzucenia obejmują trafność i przeoczenia, z minimalnymi progami danych (D13, D16, R19). Faza kalibracji przyspiesza zbieranie próbki, ale w niej każdy junior czeka na mentora (R12, R16). Kryterium 25% daje ostrzeżenie przy 10–19 zgłoszeniach z próbki, a decyzję o rewizji dopiero od 20 (R19).

Następny krok: Etap 1 (koncepcja) na podstawie tego briefu; równolegle właściciel zbiera golden set 10–15 próbek prawdziwego kodu do wstępnej kalibracji progu 0.7 (Collection plan); ponowna kalibracja po 30+ przypadkach testowych (D17; odczyt agenta: chodzi o próg 0.7). Terminy nieustalone.

## Vision

Junior dostaje szybkie, wyjaśniające „dlaczego” review swojego kodu od AI, a mentor poświęca czas tylko uwagom, które tego wymagają; korekty mentora uczą zespół, jak dobre jest AI. To zamierzony kierunek, nie wykazana korzyść. `[DOCUMENT]` research/decisions/2026-10-15-D01-zakres-mvp.md

## Target group and stakeholders

- Customer (pays): nieokreślony — płatności są poza zakresem (N01); nie wiadomo, czy płaci junior, mentor czy organizacja. `[ASSUMPTION]` brak materiału; patrz Q03
- User (uses): junior — zgłasza kod i czyta review (rola wybrana przez właściciela, nie zaobserwowana grupa). `[DOCUMENT]` D01
- User (uses): mentor — zatwierdza, poprawia lub odrzuca uwagi AI i dodaje własne w zgłoszeniach eskalowanych i z próbki kontrolnej (rola wybrana przez właściciela; R13, R16). `[DOCUMENT]` D01, D10, D15
- Stakeholders (decides, blocks, operates): właściciel pomysłu (D01); inni decydenci nieznani. `[DOCUMENT]` D01
- Decider for scope decisions: Adrian Czyrek (właściciel)

## Problems, with evidence

- Brak zarejestrowanej obserwacji: nikt nie opisał przypadku review kodu juniora, czasu oczekiwania ani kosztu mentora. Rozmowy odłożone przez właściciela (D12).
- Junior czeka na review lub dostaje je rzadko, bo mentor ma ograniczony czas. `[ASSUMPTION]` wynika z wizji w D01; A01, zaakceptowane bez testu (D12)
- Mentor traci czas na uwagi, które AI mogłoby obsłużyć samo; chce angażować się tylko w trudne przypadki. `[ASSUMPTION]` wynika z idei human-in-the-loop w D01; A02, zaakceptowane bez testu (D12)
- Osoba i cel bez przesądzania rozwiązania: junior, który pisze kod do nauki lub pierwszej pracy, chce zrozumieć, co i dlaczego poprawić, zanim nawyki się utrwalą. `[ASSUMPTION]` sformułowanie agenta na podstawie D01

## Product and how it stands out

- What it is: aplikacja webowa, w której AI robi pierwsze review według rubryki, a mentor-człowiek dostaje przypadki wskazane przez deterministyczną regułę (R09, R10) oraz losową próbkę kontrolną (R16). `[DOCUMENT]` D01, D09, D10, D21
- What makes it different: połączenie trzech elementów — review AI bez gotowego kodu (R20), eskalacja decydowana przez kod (R09) i zamiana akcji mentora w przypadki testowe (R05). Że to wyróżnia produkt na tle istniejących narzędzi, jest hipotezą. `[ASSUMPTION]` niesprawdzone; porównanie z benchmarkami odłożone (D04)

| reference | what it does well | where it falls short for our users | checked on | link |
|---|---|---|---|---|

Benchmarki wskazane przez właściciela (GitHub PR review, narzędzia AI code review, MentorCruise) służą jako inspiracja funkcjonalna i UX przy projektowaniu ekranów, z zakazem kopiowania wyglądu, treści i kodu (D04). Nie zostały sprawdzone; porównanie odłożone, bo nie zmienia decyzji o koncepcji.

## Goals and success criteria

- Business goal: dwa cele właściciela — nauka AI engineeringu i sprawdzenie potencjału produktu; najmniejsze spójne MVP. `[DOCUMENT]` D01
- Kolejność celów: przy konflikcie wygrywa nauka AI engineeringu (D08). `[DOCUMENT]` research/decisions/2026-10-15-D07-D12-odpowiedzi-wlasciciela.md
- User outcome: junior rozumie, co poprawić i dlaczego, bez gotowego rozwiązania; mentor ocenia tylko zgłoszenia eskalowane i z próbki kontrolnej. `[DOCUMENT]` D01, D10
- Primary metric: precyzja luźna = (zatwierdzone + poprawione) / ocenione uwagi AI, liczona na losowej próbce; próg 60% w kryterium porzucenia, oceniany po 30 ocenionych uwagach AI z próbki i 3 iteracjach promptu (D13, D20). Baseline nieznany; próg to cel wybrany przez właściciela, nie pomiar. `[DOCUMENT]` research/decisions/2026-10-15-D13-D17-metryki-i-akcje-mentora.md
- Metryki evals: precyzja ścisła = zatwierdzone / ocenione i precyzja luźna, obie osobno dla eskalacji i dla próbki; wyniki z eskalacji są diagnostyczne (D13). `[DOCUMENT]` D13
- Przeoczenia AI: każda uwaga dodana przez mentora to osobny typ przypadku testowego (R14); w próbce losowej odsetek zgłoszeń z dodaną uwagą ≥ `major` ma próg 25% w kryterium porzucenia (D15, D16). `[DOCUMENT]` D15, D16
- Recall (szacunkowy) = trafne uwagi AI (zatwierdzone + poprawione) / (trafne uwagi AI + uwagi dodane przez mentora), tylko na próbce, zawsze z n (n = mianownik, D24); przy n < 10 widok pokazuje tylko liczbę przeoczeń (R17). `[DOCUMENT]` research/decisions/2026-10-15-D18-D22-walidacje-recall-faza-kalibracji.md
- Metryka pomocnicza w widoku evals (propozycja agenta, bez progu): odsetek eskalacji. `[ASSUMPTION]` propozycja agenta
- What must not get worse: nie dotyczy — brak istniejącego produktu i użytkowników.

## Scope

- **Now:** zgłoszenie kodu (link do PR lub fragment + opis celu); review AI wg rubryki (R02, R03, R20); eskalacja (R09, R10); próbka losowa z fazą kalibracji (R16); widok juniora z etykietą „czeka na mentora” (D07, R12); panel mentora z kolejką, akcjami na uwagach i dodawaniem własnych uwag z walidacją (R13, R15); zapis akcji mentora jako przypadków testowych, w tym przeoczeń (R05, R14), i widok metryk z recall i stanem kryteriów porzucenia (D13, D16, R17, R19). UI po polsku, mobile-first, w przeglądarce (R07). Dostarczane jako Etap 1 (koncepcja, z zatrzymaniem na akceptację) i Etap 2 (klikalne mockupy z danymi mockowanymi) — D03. Równolegle: golden set do wstępnej kalibracji (D12, D17).
- **Later:** nieustalone przez właściciela. Propozycja agenta: wdrożenie z prawdziwym modelem i integracją GitHub, rozmowy z juniorami i mentorami (odłożone, D12), kwestia płatnika (Q03). `[ASSUMPTION]` propozycja agenta
- **Not doing:** see Non-goals

## Domain glossary

| Term | Meaning | Owned by | Visible to |
|---|---|---|---|
| Zgłoszenie | Link do PR lub fragment kodu + opis celu przesłany przez juniora | junior | junior, mentor (po eskalacji lub wylosowaniu) |
| Uwaga | Pojedyncza pozycja review: kategoria, waga, wyjaśnienie „dlaczego”, `confidence` (tylko uwagi AI); uwaga mentora ma kategorię, wagę, linię i wyjaśnienie (R13) | AI lub mentor | junior, mentor |
| Kategoria | `readability`, `correctness`, `security`, `testing`, `architecture` (R02) | rubryka | wszyscy |
| Waga | `info` < `minor` < `major` < `critical` (R03) | rubryka | wszyscy |
| `confidence` | Liczba deklarowana przez model dla uwagi, porównywana z progiem 0.7 (R09); zakres 0–1 to założenie agenta | AI | mentor (junior jej nie widzi, D07) |
| Eskalacja | Przekazanie zgłoszenia do kolejki mentora wg R09 lub R10 | kod aplikacji | junior, mentor |
| Próbka kontrolna (losowa) | Zgłoszenia nieeskalowane przekazywane mentorowi, żeby evals nie opierały się tylko na trudnych przypadkach: losowe 20% po fazie kalibracji (R16); nieeskalowane zgłoszenia z fazy kalibracji też należą do próbki (D24) | kod aplikacji | mentor |
| Faza kalibracji | Pierwsze 50 zgłoszeń, w których wszystkie trafiają do mentora (R16) | kod aplikacji | mentor, właściciel |
| Przypadek testowy (eval) | Zapis akcji mentora. Dwa typy: ocena uwagi AI (zatwierdź / popraw / odrzuć + ewentualna poprawka, R05) i przeoczenie AI (uwaga dodana przez mentora, R14) | system | mentor, właściciel |
| Precyzja ścisła | zatwierdzone / ocenione uwagi AI (D13) | właściciel | mentor, właściciel |
| Precyzja luźna | (zatwierdzone + poprawione) / ocenione uwagi AI; podstawa kryterium porzucenia (D13) | właściciel | mentor, właściciel |
| Przeoczenie | Uwaga dodana przez mentora, której AI nie zgłosiło; nie wlicza się do progu 30 ocenionych uwag AI (D15, D20) | mentor | mentor, właściciel |
| Recall (szacunkowy) | Trafne uwagi AI / (trafne uwagi AI + przeoczenia), tylko na próbce, z n = mianownik (R17, D24) | właściciel | mentor, właściciel |
| Strumień | Źródło zgłoszenia w kolejce mentora: eskalacja (R09, R10) albo próbka losowa (R16); metryki liczone osobno dla każdego (D13) | kod aplikacji | mentor, właściciel (junior nie widzi, R12) |
| Golden set | 10–15 próbek prawdziwego kodu z ręczną oceną, do orientacyjnej kalibracji progu (D12, D17) | właściciel | właściciel |

## Key flows

- Current state: nieznany — brak materiału o tym, jak juniorzy i mentorzy robią review dziś; rozmowy odłożone (D12).
- Future state, junior: zgłasza kod i cel → walidacja (np. prywatny PR, za duży diff) → review AI → kod ocenia R09, R10, R16 (w fazie kalibracji każde zgłoszenie trafia do mentora) → bez przekazania mentorowi: junior widzi review; z eskalacją: junior od razu widzi review AI z etykietą „czeka na mentora”, a po decyzji mentora wersję zweryfikowaną (D07). Junior może sam poprosić o mentora (R09). `[DOCUMENT]` D01, D07, D21
- Future state, junior — zgłoszenie z próbki kontrolnej: ta sama etykieta „czeka na mentora” co przy eskalacji; junior nie odróżnia próbki od eskalacji (R12). `[DOCUMENT]` D14
- Future state, mentor: kolejka (eskalacje i próbka kontrolna) → otwarcie zgłoszenia → przy każdej uwadze AI zatwierdź / popraw (walidacja jak R15) / odrzuć; opcjonalnie dodaj własną uwagę (kategoria, waga, linia, wyjaśnienie „dlaczego” min. 20 znaków; gotowy kod daje ostrzeżenie, nie blokadę — R15) → każda akcja zapisuje przypadek testowy (R05, R14). Przy zgłoszeniu bez uwag AI (R10) jedyną akcją mentora jest dodanie uwag. `[DOCUMENT]` D01, D10, D15, D18, D25
- Future state, mentor (uzupełnienie): po ocenie wszystkich uwag mentor kończy review; od tego momentu junior widzi wersję zweryfikowaną (D07 mówi tylko o wersji po decyzji mentora; krok „zakończ review” to propozycja na Etap 1; dotyczy też zgłoszenia bez uwag AI, które mentor zamyka bez dodawania uwag). `[ASSUMPTION]` propozycja agenta
- Future state, evals: widok metryk jakości AI liczonych z przypadków testowych, osobno dla eskalacji i próbki (D01, D13). `[DOCUMENT]` D01, D13
- Future state, evals — kryteria porzucenia: kryterium 25% pokazuje „za mało danych” przed 10 zgłoszeniami z próbki, ostrzeżenie przy 10–19, decyzję o rewizji od 20 (R19); kryterium precyzji liczone po 30 ocenionych uwagach AI z próbki; recall z n, przy n < 10 tylko liczba przeoczeń (R17). `[DOCUMENT]` D19, D20, D26
- Future state, evals (uzupełnienie): przed 30 ocenionymi uwagami AI widok pokazuje „za mało danych” także dla kryterium precyzji, analogicznie do kryterium 25%. `[ASSUMPTION]` propozycja agenta
- Ścieżki błędów wymagane w Etapie 1: timeout modelu, niepoprawny JSON z modelu, za duży diff, prywatny PR. `[DOCUMENT]` D01; sposób obsługi każdego z nich zostaje do koncepcji

## Business rules

| Id | Rule | Applies to | Source | Status | Review by | Required path to change | Owner | Supersedes |
|---|---|---|---|---|---|---|---|---|
| R01 | O eskalacji do mentora decyduje kod, nie model. Eskalacja, gdy: jest uwaga `critical`, LUB uwaga `architecture` o wadze ≥ `major`, LUB średnia `confidence` uwag < 0.7, LUB junior o nią poprosi | review AI, kolejka mentora | `[DOCUMENT]` D01 | superseded | — | — | Adrian Czyrek | none |
| R02 | Kategorie uwag: `readability`, `correctness`, `security`, `testing`, `architecture` | review AI | `[DOCUMENT]` D01 | active | unknown | właściciel | Adrian Czyrek | none |
| R03 | Wagi uwag: `info`, `minor`, `major`, `critical` (rosnąco) | review AI | `[DOCUMENT]` D01 | active | unknown | właściciel | Adrian Czyrek | none |
| R04 | Każda uwaga ma wyjaśnienie „dlaczego” i nie zawiera gotowego kodu | review AI, poprawki mentora | `[DOCUMENT]` D01 | superseded | — | — | Adrian Czyrek | none |
| R05 | Każda akcja mentora na uwadze (zatwierdź / popraw / odrzuć) zapisuje się jako przypadek testowy | panel mentora, evals | `[DOCUMENT]` D01 | active | unknown | właściciel | Adrian Czyrek | none |
| R06 | Przy każdej uwadze w panelu mentora dostępne są akcje zatwierdź / popraw / odrzuć | panel mentora | `[DOCUMENT]` D01 | superseded | — | — | Adrian Czyrek | none |
| R07 | Aplikacja działa w przeglądarce, mobile-first, UI po polsku | wszystkie ekrany | `[DOCUMENT]` D01 | active | unknown | właściciel | Adrian Czyrek | none |
| R08 | Zgłoszenie bez żadnej uwagi AI ma średnią `confidence` nieokreśloną i nie eskaluje z tego warunku | reguła R01 | `[ASSUMPTION]` propozycja agenta, odrzucona przez właściciela (D09) | superseded | — | — | — | none |
| R09 | O eskalacji do mentora decyduje kod, nie model. Eskalacja, gdy: jest uwaga `critical`, LUB uwaga `architecture` o wadze ≥ `major`, LUB którakolwiek uwaga o wadze ≥ `major` ma `confidence` < 0.7, LUB junior o nią poprosi | review AI, kolejka mentora | `[DOCUMENT]` D09 | active | orientacyjnie po golden secie, właściwie po 30+ przypadkach testowych (D17) | superseding row zatwierdzony przez właściciela | Adrian Czyrek | R01 |
| R10 | Zgłoszenie, w którym AI nie zwróciło żadnej uwagi, zawsze trafia do mentora (ryzyko przeoczenia) | review AI, kolejka mentora | `[DOCUMENT]` D09 | active | po kalibracji na golden secie (A04; punkt przeglądu zaproponowany przez agenta) | superseding row zatwierdzony przez właściciela | Adrian Czyrek | R08 |
| R11 | 20% losowo wybranych zgłoszeń, których nie eskalowały R09 ani R10, trafia do mentora jako próbka kontrolna dla evals | kolejka mentora, evals | `[DOCUMENT]` D10 | superseded | — | — | Adrian Czyrek | none |
| R12 | Zgłoszenie z próbki kontrolnej ma dla juniora tę samą etykietę „czeka na mentora” co eskalacja; junior nie odróżnia próbki od eskalacji | widok review juniora | `[DOCUMENT]` D14 | active | unknown | superseding row zatwierdzony przez właściciela | Adrian Czyrek | none |
| R13 | W panelu mentora przy każdej uwadze AI dostępne są akcje zatwierdź / popraw / odrzuć; mentor może też dodać własną uwagę z kategorią, wagą, linią i wyjaśnieniem | panel mentora | `[DOCUMENT]` D15 | active | unknown | superseding row zatwierdzony przez właściciela | Adrian Czyrek | R06 |
| R14 | Każda uwaga dodana przez mentora oznacza przeoczenie AI i zapisuje się jako osobny typ przypadku testowego (recall) | panel mentora, evals | `[DOCUMENT]` D15 | active | unknown | superseding row zatwierdzony przez właściciela | Adrian Czyrek | none |
| R15 | Uwaga dodana przez mentora i poprawka uwagi AI przez mentora mają te same pola i zasady co uwaga AI (kategoria, waga, linia, wyjaśnienie). Wyjaśnienie „dlaczego” jest wymagane: twarda walidacja, min. 20 znaków. Gotowy kod daje ostrzeżenie, nie blokadę | formularz uwagi i poprawki mentora | `[DOCUMENT]` D18, D25 | active | unknown | superseding row zatwierdzony przez właściciela | Adrian Czyrek | none |
| R16 | Faza kalibracji: pierwsze 50 zgłoszeń trafia do mentora w 100%; potem 20% losowo wybranych zgłoszeń, których nie eskalowały R09 ani R10, trafia do mentora jako próbka kontrolna dla evals | kolejka mentora, evals | `[DOCUMENT]` D21 | active | po fazie kalibracji (punkt przeglądu zaproponowany przez agenta) | superseding row zatwierdzony przez właściciela | Adrian Czyrek | R11 |
| R17 | Recall w widoku evals: trafne uwagi AI (zatwierdzone + poprawione) / (trafne uwagi AI + uwagi dodane przez mentora), liczony tylko na próbce, zawsze z n, oznaczony jako szacunkowy; przy n < 10 widok pokazuje tylko liczbę przeoczeń | widok evals | `[DOCUMENT]` D19 | active | unknown | superseding row zatwierdzony przez właściciela | Adrian Czyrek | none |
| R18 | Próg 30 w kryterium precyzji to 30 ocenionych uwag AI z próbki; uwagi dodane przez mentora są przypadkami typu „przeoczenie”, ale się do niego nie wliczają. Kryterium 25% ocenia się po min. 10 zgłoszeniach z próbki; wcześniej widok pokazuje „za mało danych” | evals, kryteria porzucenia | `[DOCUMENT]` D20 | superseded | unknown | superseding row zatwierdzony przez właściciela | Adrian Czyrek | none |
| R19 | Kryterium 25% (D16): przed 10 zgłoszeniami z próbki widok pokazuje „za mało danych”; przy 10–19 tylko ostrzeżenie; decyzja o rewizji od 20 zgłoszeń z próbki. Próg 30 w kryterium precyzji to 30 ocenionych uwag AI z próbki; uwagi dodane przez mentora (przeoczenia) się do niego nie wliczają | evals, kryteria porzucenia | `[DOCUMENT]` D20, D26 | active | unknown | superseding row zatwierdzony przez właściciela | Adrian Czyrek | R18 |
| R20 | Każda uwaga AI ma wyjaśnienie „dlaczego” i nie zawiera gotowego kodu | review AI | `[DOCUMENT]` D01, D25 | active | unknown | superseding row zatwierdzony przez właściciela | Adrian Czyrek | R04 |

## Non-goals

| Id | We are not building | Why | Owner | Status | Review by | Required path to change | Source | Supersedes |
|---|---|---|---|---|---|---|---|---|
| N01 | Płatności | poza zakresem najmniejszego spójnego MVP | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D01 | none |
| N02 | Kalendarz / umawianie sesji | jw. | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D01 | none |
| N03 | Wyszukiwarka i oceny mentorów | jw. | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D01 | none |
| N04 | Czat | jw. | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D01 | none |
| N05 | Powiadomienia | jw. | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D01 | none |

## Decisions

| Id | Date | Decision | Why | Owner | Status | Review by | Required path to change | Source | Supersedes |
|---|---|---|---|---|---|---|---|---|---|
| D01 | 2026-10-15 | Zakres MVP: zgłoszenie, review AI wg rubryki, eskalacja, panel mentora, evals; przyjęcie R01–R07 i N01–N05 (później R01 zastąpione przez R09, R06 przez R13) | najmniejsze spójne MVP służące nauce AI engineeringu i sprawdzeniu potencjału produktu | Adrian Czyrek | active | po Etapie 1 | superseding row zatwierdzony przez właściciela | `[DOCUMENT]` research/decisions/2026-10-15-D01-zakres-mvp.md | none |
| D02 | 2026-10-15 | Eskalację rozstrzyga deterministyczny kod, nie model | reguła podana przez właściciela w zleceniu; uzasadnienie i rozważane alternatywy nie zostały podane (D01) | Adrian Czyrek | active | po kalibracji (A03) | właściciel | `[DOCUMENT]` D01 | none |
| D03 | 2026-10-15 | Kolejność: Etap 1 koncepcja z zatrzymaniem na akceptację, potem Etap 2 klikalne mockupy (HTML/CSS/TS, Vite, bez frameworka UI, `mocks.ts`, przełącznik roli, `?state=error`, ZIP z `KONCEPCJA.md` i `README.md`) | właściciel chce zatwierdzić koncepcję przed mockupami | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D01 | none |
| D04 | 2026-10-15 | GitHub PR review, narzędzia AI code review i MentorCruise są benchmarkami funkcjonalnymi i UX; nie kopiujemy wyglądu, treści ani kodu | ograniczenie podane przez właściciela; uzasadnienie niepodane (D01) | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D01 | none |
| D05 | 2026-10-15 | Discovery w trybie własnego pomysłu | wskazane przez właściciela | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D01 | none |
| D06 | 2026-10-15 | Kontynuować bez odpowiedzi na pytania discovery, na założeniach | polecenie właściciela; Q01, Q02 i Q04 rozstrzygnięte później w D07–D11 | Adrian Czyrek | active | gdy właściciel odpowie na Q01–Q04 (spełnione 2026-10-15, poza Q03) | właściciel | `[DOCUMENT]` research/decisions/2026-10-15-D06-kontynuacja-na-zalozeniach.md | none |
| D07 | 2026-10-15 | Przy eskalacji junior od razu widzi review AI z etykietą „czeka na mentora”, a po decyzji mentora wersję zweryfikowaną; `confidence` widzi tylko mentor | właściciel zaakceptował propozycję D07 z poprzedniej wersji briefu przez odwołanie („akceptuję D07”); treść, uzasadnienie (junior nie czeka bezczynnie, etykieta oznacza uwagi jako niezweryfikowane) i odrzucona alternatywa (ukryć review do decyzji mentora) pochodzą z rekomendacji agenta | Adrian Czyrek | active | akceptacja Etapu 1 | właściciel | `[DOCUMENT]` research/decisions/2026-10-15-D07-D12-odpowiedzi-wlasciciela.md | none |
| D08 | 2026-10-15 | Przy konflikcie celów wygrywa nauka AI engineeringu (evals i obsługa błędów modelu w pełnym zakresie MVP) | właściciel zaakceptował propozycję D08 przez odwołanie („akceptuję D08, przy konflikcie wygrywa nauka”); doprecyzowanie w nawiasie i alternatywa (priorytet produktu, uproszczenie evals) pochodzą z rekomendacji agenta | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D07–D12 rekord | none |
| D09 | 2026-10-15 | Warunek średniej `confidence` zastąpiony warunkiem per uwaga ≥ `major` (R09); zgłoszenie bez uwag zawsze do mentora (R10) | decyzja właściciela; brak uwag traktowany jako ryzyko przeoczenia; odrzucona propozycja agenta R08 | Adrian Czyrek | active | po kalibracji na golden secie | właściciel | `[DOCUMENT]` D07–D12 rekord | none |
| D10 | 2026-10-15 | 20% losowa próbka zgłoszeń bez eskalacji trafia do mentora (R11; później R16 dodaje fazę kalibracji) | decyzja właściciela: „evals bez biasu”; odpowiedź na Q06, które wskazywało, że mentor widzi tylko eskalowane zgłoszenia; odsetek 20% wybrany bez pomiaru | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D07–D12 rekord | none |
| D11 | 2026-10-15 | Kryterium porzucenia: jeśli po 30 przypadkach testowych i 3 iteracjach promptu precyzja (odsetek zatwierdzonych uwag) < 60% → rewizja koncepcji | decyzja właściciela; próg i liczby wybrane bez pomiaru bazowego | Adrian Czyrek | superseded | — | — | `[DOCUMENT]` D07–D12 rekord | none |
| D12 | 2026-10-15 | Rozmowy z juniorami i mentorami odłożone; zamiast nich właściciel zbiera 10–15 próbek prawdziwego kodu jako golden set do kalibracji progu | decyzja właściciela, uzasadnienie niepodane; oznacza akceptację ryzyka A01–A02 bez testu | Adrian Czyrek | active | przed decyzją o rozwoju jako produkt (punkt przeglądu zaproponowany przez agenta) | właściciel | `[DOCUMENT]` D07–D12 rekord | none |
| D13 | 2026-10-15 | Dwie metryki precyzji: ścisła = zatwierdzone / ocenione, luźna = (zatwierdzone + poprawione) / ocenione; obie osobno dla eskalacji i próbki. Kryterium porzucenia 1: po 30 przypadkach testowych i 3 iteracjach promptu precyzja luźna na losowej próbce < 60% → rewizja koncepcji; eskalacje są diagnostyczne | decyzja właściciela (odpowiedź na Q07); 30 przypadków i 3 iteracje przejęte z D11, którego właściciel nie odwołał; progi bez pomiaru bazowego | Adrian Czyrek | active | po 30 przypadkach i 3 iteracjach promptu | właściciel | `[DOCUMENT]` research/decisions/2026-10-15-D13-D17-metryki-i-akcje-mentora.md | D11 |
| D14 | 2026-10-15 | Zgłoszenie z próbki ma dla juniora tę samą etykietę co eskalacja (R12) | decyzja właściciela (odpowiedź na Q08); uzasadnienie niepodane | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D13–D17 rekord | none |
| D15 | 2026-10-15 | Mentor może dodać własną uwagę; każda dodana uwaga to przeoczenie AI i osobny typ przypadku testowego (R13, R14) | decyzja właściciela (odpowiedź na Q09) | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D13–D17 rekord | none |
| D16 | 2026-10-15 | Kryterium porzucenia 2: jeśli w próbce losowej mentor dodaje uwagę ≥ `major` w > 25% zgłoszeń → rewizja koncepcji | decyzja właściciela; próg bez pomiaru bazowego; okno oceny ustalone w D20, D26 | Adrian Czyrek | active | decyzja od 20 zgłoszeń z próbki (D26) | właściciel | `[DOCUMENT]` D13–D17 rekord | none |
| D17 | 2026-10-15 | Golden set 10–15 próbek służy jako orientacja; ponowna kalibracja progu po 30+ przypadkach testowych | decyzja właściciela; „próg” odczytany przez agenta jako próg `confidence` 0.7 z R09 (właściciel napisał „kalibracja progu”) | Adrian Czyrek | active | po 30+ przypadkach testowych | właściciel | `[DOCUMENT]` D13–D17 rekord | none |
| D18 | 2026-10-15 | Uwaga mentora ma te same pola i zasady co uwaga AI; „dlaczego” wymagane (min. 20 znaków); gotowy kod = ostrzeżenie (R15) | decyzja właściciela (odpowiedź na Q11); uzasadnienie niepodane | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` research/decisions/2026-10-15-D18-D22-walidacje-recall-faza-kalibracji.md | none |
| D19 | 2026-10-15 | Recall w widoku evals według wzoru właściciela, tylko na próbce, z n, szacunkowy; przy n < 10 tylko liczba przeoczeń (R17) | decyzja właściciela (odpowiedź na Q12) | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D18–D22 rekord | none |
| D20 | 2026-10-15 | Próg 30 = ocenione uwagi AI (bez przeoczeń); kryterium 25% po min. 10 zgłoszeniach z próbki, wcześniej „za mało danych” (R18) | decyzja właściciela (odpowiedź na Q10); doprecyzowuje D13 i D16 bez zmiany progów | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D18–D22 rekord | none |
| D21 | 2026-10-15 | Faza kalibracji: pierwsze 50 zgłoszeń do mentora w 100%, potem próbka 20% (R16) | decyzja właściciela jako odpowiedź na ograniczenie wielkości próbki wskazane w briefie; liczba 50 wybrana bez pomiaru | Adrian Czyrek | active | po fazie kalibracji (punkt przeglądu zaproponowany przez agenta) | właściciel | `[DOCUMENT]` D18–D22 rekord | none |
| D22 | 2026-10-15 | Discovery zamknięte; pytania nieblokujące Etapu 1 zostają w briefie jako otwarte i nie są teraz zadawane | polecenie właściciela | Adrian Czyrek | active | przy akceptacji Etapu 1 (punkt przeglądu zaproponowany przez agenta) | właściciel | `[DOCUMENT]` D18–D22 rekord | none |
| D23 | 2026-10-15 | Brief potwierdzony przez właściciela; podpis gotowości do Etapu 1–2 | decyzja właściciela | Adrian Czyrek | active | przy akceptacji Etapu 1 (punkt przeglądu zaproponowany przez agenta) | właściciel | `[DOCUMENT]` research/decisions/2026-10-15-D23-D26-potwierdzenie-briefu.md | none |
| D24 | 2026-10-15 | Q13 i Q14 zgodnie z odczytem briefu: 50 = wszystkie zgłoszenia, nieeskalowane z fazy kalibracji należą do próbki; n w recall = mianownik | decyzja właściciela | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D23–D26 rekord | none |
| D25 | 2026-10-15 | Poprawka mentora podlega R15, nie R04; R04 zawężone do uwag AI (R20) | decyzja właściciela (odpowiedź na Q15) | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D23–D26 rekord | none |
| D26 | 2026-10-15 | Kryterium 25%: przy n < 20 tylko ostrzeżenie, decyzja o rewizji od n ≥ 20 (R19); n = liczba zgłoszeń z próbki — odczyt agenta, spójny z R18 | decyzja właściciela | Adrian Czyrek | active | unknown | właściciel | `[DOCUMENT]` D23–D26 rekord | D20 (w części okna oceny kryterium 25%) |

## Riskiest assumptions

| Id | Assumption | Importance | Evidence today | If false | Smallest test | Owner | By when | Result |
|---|---|---|---|---|---|---|---|---|
| A01 | Juniorzy potrzebują szybszego review niż to, które dostają, i będą czytać wyjaśnienia „dlaczego” bez gotowego kodu `[ASSUMPTION]` z wizji D01 | high | brak obserwacji | produkt rozwiązuje nieistniejący problem albo frustruje brakiem gotowych poprawek | rozmowy z juniorami o ostatnim review — odłożone (D12) | Adrian Czyrek | przed decyzją o rozwoju jako produkt | accepted untested (D12) |
| A02 | Mentorzy chcą weryfikować uwagi AI zamiast robić review od zera i robią to szybciej `[ASSUMPTION]` z idei human-in-the-loop w D01 | high | brak obserwacji | panel mentora nie oszczędza czasu; zmienia się rola mentora | rozmowy z mentorami — odłożone (D12); później pomiar czasu korekty na prototypie z prawdziwymi uwagami | Adrian Czyrek | przed decyzją o rozwoju jako produkt | accepted untested (D12) |
| A03 | `confidence` deklarowana przez model odróżnia trafne uwagi ≥ `major` od błędnych, a próg 0.7 ma sens `[ASSUMPTION]` próg z D01 bez źródła empirycznego | high | brak; próg wybrany przez właściciela | R09 eskaluje losowo albo za rzadko; trzeba zmienić warunek | golden set 10–15 próbek (D12): review AI, ręczna ocena każdej uwagi, porównanie trafności z `confidence` — orientacja (D17); potem ponowna kalibracja na 30+ przypadkach testowych (D17) | Adrian Czyrek | po 30+ przypadkach testowych | untested |
| A04 | AI rzadko przeocza problemy ≥ `major`, więc 80% zgłoszeń nieeskalowanych po fazie kalibracji, których mentor nie widzi, nie kryje poważnych błędów `[ASSUMPTION]` agenta | high | brak; R09 opiera się tylko na tym, co model zgłosił; przeoczenia są mierzalne w próbce (R14, R17) | junior w nieeskalowanych zgłoszeniach dostaje review z pominiętymi poważnymi błędami; kryterium D16 ma to wychwycić | na golden secie policzyć przypadki, w których ręczna ocena znalazła problem ≥ `major`, a R09/R10 nie eskalowały; w MVP odsetek zgłoszeń z próbki z dodaną uwagą ≥ `major` (D16) | Adrian Czyrek | po min. 10 zgłoszeniach z próbki (D20) | untested |
| A05 | Akcje mentorów dają spójne etykiety, z których metryki jakości AI są wiarygodne `[ASSUMPTION]` agenta | medium | brak | metryki evals i kryteria D13, D16 mierzą różnice między mentorami, nie jakość AI | dwóch mentorów ocenia te same uwagi; porównać zgodność | Adrian Czyrek | po Etapie 2 | untested |

## Kill criteria

Dwa kryteria właściciela, oba liczone wyłącznie na losowej próbce (R16), łącznie z nieeskalowanymi zgłoszeniami z fazy kalibracji (D24); wyniki z eskalacji są diagnostyczne. Decyduje Adrian Czyrek.

1. Po 30 ocenionych uwagach AI z próbki i 3 iteracjach promptu precyzja luźna < 60% → rewizja koncepcji (D13, D20; zastępuje D11). Przeoczenia nie wliczają się do progu 30.
2. Mentor dodaje uwagę ≥ `major` w > 25% zgłoszeń z próbki: przed 10 zgłoszeniami „za mało danych”, przy 10–19 tylko ostrzeżenie, od 20 zgłoszeń decyzja o rewizji koncepcji (D16, D26, R19).

To intencje właściciela na przyszłość, nie zaobserwowane wyniki; progi wybrane bez pomiaru bazowego. Faza kalibracji (pierwsze 50 zgłoszeń w 100% do mentora, R16) pozwala szybciej zebrać próbkę. Ograniczenia: przy 20 zgłoszeniach jedno zgłoszenie zmienia odsetek o 5 punktów procentowych, więc kryterium 2 tuż po progu nadal jest wrażliwe; przy jednym mentorze wynik zależy od jego standardów (A05). Kryteria nie dotyczą problemu użytkowników — ten pozostaje niesprawdzony (D12).

## Hypotheses to test

Brak — nie przeprowadzono symulowanych rozmów ani walkthroughów.

## Open questions

| Id | Question | Blocking | Who can answer | Status |
|---|---|---|---|---|
| Q01 | Który cel wygrywa przy konflikcie: nauka AI engineeringu czy produkt? Co musiałoby się okazać, żeby porzucić lub zmienić pomysł? | — | właściciel | closed: D08; kryteria porzucenia D11 → D13, D16 |
| Q02 | Co junior widzi między eskalacją a decyzją mentora? | — | właściciel | closed: D07 |
| Q03 | Kto jest płatnikiem i skąd pochodzą mentorzy (organizacja, rynek, prywatne relacje)? | nie dla MVP (N01, N03); blokuje decyzje produktowe później | właściciel | open |
| Q04 | Jak liczyć średnią `confidence`: ze wszystkich uwag, czy tylko z wagą ≥ `minor`? | — | właściciel | closed: średnia zastąpiona warunkiem per uwaga (D09, R09) |
| Q05 | Gdy AI nie zwróci żadnej uwagi, zgłoszenie omija mentora czy trafia do kolejki? | — | właściciel | closed: zawsze do mentora (D09, R10) |
| Q06 | Czy mentor ma dostawać także losową próbkę zgłoszeń nieeskalowanych, żeby evals mierzyły jakość AI ogólnie? | — | właściciel | closed: tak, 20% (D10, R11 → R16) |
| Q07 | Precyzja w D11: czy uwaga „poprawiona” liczy się jako trafna, nietrafna czy osobno? Czy liczyć ją ze wszystkich przypadków, czy osobno dla eskalacji i próbki kontrolnej (eskalacje mogą mieć inny rozkład trafności niż próbka, np. przez niższą `confidence` lub uwagi `critical`)? | — | właściciel | closed: D13 |
| Q08 | Co widzi junior, gdy zgłoszenie bez eskalacji trafiło do mentora z próbki kontrolnej (R11): tę samą etykietę „czeka na mentora” czy review bez etykiety? | — | właściciel | closed: D14, R12 |
| Q09 | Czy mentor może dodać własną uwagę (np. przeoczony `critical`) i czy taka akcja zapisuje się jako przypadek testowy? Dziś R06 daje tylko zatwierdź / popraw / odrzuć na istniejących uwagach, więc zgłoszenie bez uwag (R10) nie daje mentorowi żadnej akcji ani przypadku testowego | — | właściciel | closed: D15, R13, R14 |
| Q10 | Brief przyjmuje, że 30 przypadków w D13 liczy się wyłącznie z próbki losowej. Czy wliczają się do nich także uwagi dodane przez mentora (przeoczenia, R14), czy tylko oceny uwag AI? Po ilu zgłoszeniach z próbki oceniać kryterium 25% z D16? | — | właściciel | closed: D20, R18 |
| Q11 | Czy uwaga dodana przez mentora podlega R04 (wyjaśnienie „dlaczego”, bez gotowego kodu)? R04 obejmuje już poprawki mentora | — | właściciel | closed: D18, R15 |
| Q12 | Jak liczyć metrykę recall z przypadków typu „przeoczenie” (R14), np. jako udział uwag AI zatwierdzonych lub poprawionych wśród wszystkich trafnych uwag, łącznie z dodanymi przez mentora? | — | właściciel | closed: D19, R17 |
| Q13 | Faza kalibracji (R16): czy „pierwsze 50 zgłoszeń” to wszystkie zgłoszenia, czy tylko nieeskalowane? Czy nieeskalowane zgłoszenia z fazy kalibracji (100%, nie losowane) liczą się jako próbka losowa do kryteriów porzucenia i recall? Odczyt briefu: 50 = wszystkie zgłoszenia; eskalowane należą do strumienia eskalacji, nieeskalowane do próbki | — | właściciel | closed: D24 |
| Q14 | W R17 „n” to mianownik recall (trafne uwagi AI + przeoczenia) czy liczba zgłoszeń z próbki? Odczyt briefu: mianownik | — | właściciel | closed: D24 |
| Q15 | Czy poprawka uwagi AI przez mentora („popraw”) podlega tej samej walidacji co R15 (min. 20 znaków „dlaczego”, gotowy kod = ostrzeżenie), czy dalej R04 (bez gotowego kodu)? Odczyt briefu: obowiązuje R04 (aktywna reguła) plus wymagane „dlaczego”; przyjęcie walidacji jak R15 poluzowałoby R04 i wymaga decyzji właściciela | — | właściciel | closed: D25, R15, R20 |

## Definition of Ready addendum (own)

Problems i Target group nie mają wsparcia w żadnej obserwacji; właściciel zaakceptował A01–A02 bez testu (D12) — to decyzja o ryzyku, nie dowód. Zakres Now, reguły (R02, R03, R05, R07, R09, R10, R12–R17, R19, R20), wykluczenia i oba kryteria porzucenia (D13, D16, D26) są aktywnymi decyzjami właściciela. Brief potwierdzony przez właściciela (D23). Otwarte pozostaje tylko Q03 (płatnik, później). Brief jest gotowy do Etapu 1 (koncepcja), Etapu 2 (klikalne mockupy z danymi mockowanymi) i kalibracji na golden secie. Nie jest gotowy do planowania wdrożenia produktu ani do backlogu — problem użytkowników niesprawdzony, A03–A05 nieprzetestowane.

## Collection plan

### Czy `confidence` modelu i reguła R09/R10 wyłapują uwagi, których ocena wymaga człowieka?

- What decision or work needs it: wstępna, orientacyjna ocena progu 0.7 i R09/R10 przed ponowną kalibracją po 30+ przypadkach (A03, A04, D17)
- Who can answer it: właściciel z dostępem do prawdziwego kodu juniorów i osoba zdolna ocenić uwagi ręcznie
- How: golden set 10–15 próbek prawdziwego kodu lub PR juniorów (za zgodą autorów, bez danych osobowych i sekretów), review AI, ręczna ocena każdej uwagi i lista problemów `critical` znalezionych ręcznie (D12)
- Owner and by when: Adrian Czyrek; unknown
- Template: `.ai/specs/research/templates/data-request.md`
