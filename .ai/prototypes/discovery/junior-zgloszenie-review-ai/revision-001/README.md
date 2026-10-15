# Prototyp discovery: junior zgłasza kod i dostaje review AI

- Rewizja: `revision-001`, 2026-10-15; poprzednia rewizja: brak
- Brief: `.ai/specs/product-brief.md` (potwierdzony, D23)
- Kierunek UX: `.ai/specs/ux-shape-rdzen-ai.md` (ekrany J1–J3, teksty, wartości `?state=`)
- Flow: Key flows → „Future state, junior” (zgłoszenie → walidacja → review AI → R09/R10/R16 → „czeka na mentora” → wersja zweryfikowana), z przypadkiem „zgłoszenie z próbki kontrolnej” (R12) i ścieżkami błędów (timeout, niepoprawny JSON, za duży diff, prywatny PR)
- Raport panelu syntetycznego: nie podano. Prototyp powstał bez pierwszego panelu `om-synthetic-users`, więc nie ma tu sugestii `[SYNTHETIC]`.
- Zakres symulacji: podany wprost przez właściciela w zleceniu (formularz → ładowanie → review z banerem „Czeka na mentora” → błędy: za duży diff, prywatny PR, timeout).

## Jak otworzyć

Otwórz `index.html` w przeglądarce (`file://`). Wszystko działa lokalnie, bez serwera i sieci. **Reset symulacji** na górnym pasku przywraca start: pustą listę „Moje zgłoszenia”, czysty formularz i domyślne ustawienia stanu testowego. Panel „Stan testowy (poza produktem)” pod ekranem steruje odpowiedzią serwera, wywołaniem modelu i decyzją kodu. Ma też linki do stanów `?state=`.

Wszystkie dane są fikcyjne: repozytorium `przyklad/sklep-demo`, kod i uwagi. Prototyp nie jest dowodem badawczym, nie dowodzi popytu i nie jest gotowością produkcyjną. Nie spełnia też Definition of Ready.

## Aktor, start, sukces

- Aktor: junior (rola wybrana przez właściciela, D01; grupa niesprawdzona, A01).
- Start: J1 „Moje zgłoszenia”, stan pusty.
- Sukces: junior widzi review AI z uwagami (waga, kategoria, miejsce, „Dlaczego:”, kontekst kodu). Przy przekazaniu mentorowi widzi baner „Czeka na mentora”, a po symulowanej decyzji mentora wersję sprawdzoną.
- Poza prototypem: rola mentora (M1 Kolejka, M2 Ocena zgłoszenia), E1 Jakość AI, logowanie, brak dostępu do cudzego zgłoszenia (J3), log niepoprawnych odpowiedzi. W nagłówku widnieje „widok mentora poza tym prototypem”. Decyzję mentora zastępuje przycisk w panelu testowym.

## Zachowane reguły i decyzje

| Id | Treść (skrót) | Jak widać w prototypie | Status / właściciel / ścieżka zmiany |
|---|---|---|---|
| R02, R03 | Kategorie i wagi rubryki | Etykiety PL ze słownika ux-shape; waga zawsze tekstem; sortowanie od najwyższej wagi, potem plik i linia | active · Adrian Czyrek · właściciel |
| R07 | Przeglądarka, mobile-first, UI po polsku | `lang="pl"`, jedna kolumna do 40rem, cele dotyku ≥ 44px | active · Adrian Czyrek · właściciel |
| R09 | Eskalację rozstrzyga kod; junior może poprosić o mentora | Wynik decyzji kodu ustawiany w panelu testowym; „Poproś mentora o sprawdzenie” + potwierdzenie w stanie „Review AI” | active · Adrian Czyrek · superseding row zatwierdzony przez właściciela |
| R10 | Brak uwag AI → zawsze do mentora | Stan „Czeka na mentora, AI bez uwag” | active · jw. |
| R12, D14 | Próbka ma tę samą etykietę co eskalacja | Jeden wariant „Do mentora: eskalacja, próbka lub faza kalibracji” → identyczny baner; junior nie widzi strumienia | active · jw. |
| R16 | Faza kalibracji: pierwsze 50 zgłoszeń do mentora | Domyślna decyzja kodu w symulacji to „Do mentora”, spójnie z fazą kalibracji; brak osobnego komunikatu dla juniora | active · jw. |
| R20 | Uwaga AI ma „dlaczego” i nie zawiera gotowego kodu | Fikcyjne uwagi mają tylko wyjaśnienia; kod w karcie to kod juniora (kontekst ±2 linie) | active · jw. |
| D07 | Junior od razu widzi review AI z etykietą; `confidence` widzi tylko mentor | Review widoczne przy „Czeka na mentora”; pewności modelu nie ma nigdzie w UI juniora | active · Adrian Czyrek · właściciel |
| ux-shape 2 | Odpowiedź modelu walidowana w całości, 1 automatyczne ponowienie | Ścieżki „Analizuję kod” → „Pierwsza próba się nie udała…” → błąd z drogą dalej; brak częściowego review | zaakceptowane przez właściciela 2026-10-15 |
| ux-shape 3 / O7 | Zdanie o losowym wyborze w banerze | Tekst banera bez zmian; O7 (zgodność z R12) nadal otwarte | zaakceptowane; O7 open |
| ux-shape O2 | „Poproś mentora” po błędzie → mentor robi review od początku | Baner „Review AI się nie udało, więc mentor zrobi je od początku.” | zaakceptowane |
| N01–N05 | Bez płatności, kalendarza, wyszukiwarki, czatu, powiadomień | Żaden z tych elementów nie występuje; brak powiadomienia o wersji sprawdzonej | active |

## Założenia

- `[ASSUMPTION]` P-A01 — Limit 400 linii i komunikat „1 240 linii” to wartości z ux-shape (O4), niesprawdzone na golden secie. Sprawdzenie: golden set, budżet tokenów i czas odpowiedzi.
- `[ASSUMPTION]` P-A02 — Czasy symulacji (wysyłka 0,9 s, analiza 1,5 s, ponowienie 1,5 s) są skrócone dla wygody testu. Prawdziwy czas („zwykle do minuty”, timeout 60 s) jest nieznany (O4).
- `[ASSUMPTION]` P-A03 — Ręczne „Spróbuj ponownie” po błędzie modelu w symulacji zawsze kończy się sukcesem. Ux-shape nie określa wyniku drugiego wywołania; w produkcie może znów się nie udać.
- `[ASSUMPTION]` P-A04 — Komunikaty dla pustego linku („Wklej link do pull requesta.”) i pustego fragmentu („Wklej fragment kodu, który chcesz omówić.”) nie występują w ux-shape. To propozycja prototypu do potwierdzenia przy Etapie 1.
- `[ASSUMPTION]` P-A05 — Przy fragmencie kodu karta uwagi pokazuje „linia N” zamiast pliku (`file: null` w schemacie). To odczyt agenta.
- `[ASSUMPTION]` P-A06 — Treść wersji sprawdzonej (1 poprawiona, 1 potwierdzona, 1 odrzucona, 1 dodana uwaga) to fikcyjny przykład, który pokazuje wszystkie oznaczenia pochodzenia z ux-shape. Nie przedstawia oczekiwanego rozkładu decyzji mentora.
- `[ASSUMPTION]` P-A07 — Karta w J1 dla zgłoszenia bez uwag AI pokazuje „Bez uwag AI”. Ux-shape opisuje ten tekst tylko w kolejce mentora.
- `[ASSUMPTION]` P-A08 — W `?state=` stany ogólne (`loading`, `empty`, `error`, `success`) dotyczą ekranu z fragmentu adresu. J2 nie ma osobnych stanów `empty` i `error` (formularz jest zawsze dostępny). J3 `empty` nie dotyczy, bo zgłoszenie zawsze ma status. `success` w J3 nie jest dodany; jego odpowiedniki to `ai-done`, `waiting` i `verified`.

Potwierdzenie symulacji nie usuwa tych etykiet.

## Mapa ekranów i stanów

| Ekran / stan | Akcja | Następny stan | Reguły / założenia |
|---|---|---|---|
| J1 pusty | „Nowe zgłoszenie” | J2 | — |
| J1 lista | dotknięcie karty | J3 danego zgłoszenia | — |
| J1 `loading` → lista; `error` | „Spróbuj ponownie” | lista | P-A08 |
| J2 Link do PR | „Wyślij do review” bez linku / zły format | błąd pod polem, fokus na polu | P-A04, ux-shape J2 |
| J2 | pusty lub krótszy niż 10 znaków cel | błąd pod polem „Co chcesz osiągnąć?” | ux-shape J2 |
| J2 | wysłanie poprawnego linku | „Sprawdzam PR…” (zablokowany) → serwer | P-A02 |
| J2 serwer: prywatny PR / za duży diff / brak plików tekstowych | — | komunikat pod polem; link „Wklej fragment kodu” przełącza zakładkę, cel zostaje | P-A01 |
| J2 Fragment kodu | > 400 linii („Wstaw fragment 520 linii”) | „Fragment ma 520 linii, a limit to 400…” | P-A01 |
| J2 → J3 | serwer OK | J3 „Analizuję kod” (szkielet + tekst) | — |
| J3 Analizuję kod | model OK | decyzja kodu: „Czeka na mentora” / „Review AI” / „Czeka na mentora, AI bez uwag” | R09, R10, R12, R16 |
| J3 Analizuję kod | pierwsza próba nieudana | „Pierwsza próba się nie udała, próbuję jeszcze raz…” → sukces albo błąd | ux-shape 2 |
| J3 błąd (timeout / niepoprawna odpowiedź) | „Spróbuj ponownie” | Analizuję kod → sukces | P-A03 |
| J3 błąd | „Poproś mentora” | „Czeka na mentora” (bez review AI) | O2 |
| J3 Review AI | „Poproś mentora o sprawdzenie” → „Poproś mentora” / „Anuluj” | „Czeka na mentora” / bez zmian | R09 |
| J3 Czeka na mentora (każdy wariant) | panel testowy: „Symuluj: mentor zakończył review” | „Sprawdzone przez mentora 15 paź, 14:20.” z oznaczeniami pochodzenia i zwiniętą sekcją odrzuconych | D07, P-A06 |
| J3 `loading` / `error` | „Spróbuj ponownie” | review | P-A08 |
| nieznany fragment | „Wróć do moich zgłoszeń” | J1 | — |
| dowolny | „← Moje zgłoszenia”, wstecz/dalej przeglądarki | poprzedni ekran | — |
| dowolny | „Reset symulacji” | J1 pusty, czysty formularz | — |

Wartości `?state=` (z ux-shape, sekcja „Mockupy”): J1 `loading|empty|error|success`; J2 `invalid-url|private-pr|diff-too-large|loading|success`; J3 `analyzing|retrying|timeout|invalid-json|ai-done|waiting|waiting-no-remarks|verified|loading|error`. Przykład: `index.html?state=diff-too-large#j2`. Linki do wszystkich są w panelu testowym. Stany M2 i E1 dotyczą ekranów poza prototypem.

## Weryfikacja

### Przegląd statyczny — wykonany, zaliczony

- Wszystkie ekrany i stany z zakresu mają cel i oczekiwany wynik (mapa wyżej). Reguły, non-goals i decyzje są niezmienione.
- Brak zewnętrznych zasobów: jedyne adresy `https://github.com/...` to fikcyjne teksty (wartość przykładowego linku i przykład w komunikacie walidacji). Nie ma fetch, XHR, storage, cookies, `innerHTML`, importów, `src=` ani `action=`. Formularz ma `preventDefault`.
- Tekst wpisany przez użytkownika trafia do DOM wyłącznie przez `textContent` i węzły tekstowe.
- Semantyka: `lang="pl"`, nagłówek h1 na każdym ekranie z fokusem po nawigacji, etykiety pól, `aria-invalid` i `aria-describedby` przy błędach, region `aria-live`, zakładki z `role="tab"`, natywny `<dialog>` do potwierdzenia, widoczny obrys fokusu. Waga i status są zawsze tekstem.
- Składnia JS: `node --check` na wyodrębnionym skrypcie zwrócił OK.
- Ograniczenie: dostępności klawiaturą, kontrastu w praktyce i widoku na wąskim ekranie nie da się potwierdzić z samego kodu.

### Przejście w przeglądarce — nie wykonane

Brak deskryptora przeglądarki `.ai/browsers/playwright.md` (domyślny dostawca; brak `.ai/agentic.config.json`). Zgodnie z zasadami skilla nie użyto innego narzędzia ani nie instalowano oprogramowania. Nie ma zrzutów ekranu ani katalogu `evidence/`.

Lista do wykonania, gdy deskryptor będzie dostępny (np. po `om-prepare-test-env`):

1. Start: J1 pusty → „Nowe zgłoszenie” → J2, fokus na h1.
2. Wyślij pusty formularz → błędy linku i celu; popraw i wyślij ponownie.
3. Zły format linku → komunikat z przykładem.
4. Serwer: prywatny PR → komunikat → „Wklej fragment kodu” przełącza zakładkę, cel zostaje.
5. Serwer: za duży diff → komunikat 1 240 / 400.
6. Fragment 520 linii → komunikat o limicie.
7. Poprawne wysłanie → „Sprawdzam PR…” → J3 „Analizuję kod” → „Czeka na mentora” z 3 uwagami; J1 pokazuje nową kartę.
8. Model: timeout w obu próbach → baner ponowienia → błąd → „Spróbuj ponownie” → review; drugi raz → „Poproś mentora” → baner bez review AI.
9. Model: niepoprawna odpowiedź → komunikat o odpowiedzi, której nie można pokazać.
10. Decyzja „Bez mentora” → „Review AI” → „Poproś mentora o sprawdzenie” → Anuluj / Poproś mentora.
11. „AI bez uwag” → baner R10.
12. „Symuluj: mentor zakończył review” → wersja sprawdzona, rozwijanie „Pokaż pierwotną wersję AI” i sekcji odrzuconych.
13. Wstecz/dalej przeglądarki, `#nieznany` → odzyskanie, Reset → J1 pusty bez starych zgłoszeń.
14. Każdy link `?state=` z panelu testowego.
15. Nawigacja Tab/Shift+Tab, strzałki w zakładkach, widoczny fokus, szerokość 360 px.
