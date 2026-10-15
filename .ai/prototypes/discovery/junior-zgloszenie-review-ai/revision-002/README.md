# Prototyp discovery: junior zgłasza kod i dostaje review AI

- Rewizja: `revision-002`, 2026-10-15; poprzednia rewizja: [`revision-001`](../revision-001/README.md) (bez zmian, bez ręcznych dopisków — sumy SHA-256 zgodne z jej `prototype.json`)
- Cel odświeżenia: przejście w przeglądarce, którego w `revision-001` nie wykonano (brak deskryptora), i poprawa znalezionych błędów. Brief i ux-shape nie zmieniły się od `revision-001`, więc reguły, decyzje i założenia P-A01–P-A08 przechodzą bez zmian.
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

## Zmiany względem revision-001

- **Fokus na starcie.** W `revision-001` przy otwarciu bez fragmentu skrypt ustawiał `#j1` przez `location.hash`, a fokus na nagłówku zależał od tego, czy zdarzenie `hashchange` zdążyło się wykonać. W powtórzonych przebiegach (`--repeat-each`) wynik był niestabilny: raz fokus był na „Moje zgłoszenia”, raz nigdzie. Teraz start ustawia `#j1` przez `history.replaceState`, bez `hashchange`. Fokus zostaje na dokumencie, a pierwszy Tab trafia w „Nowe zgłoszenie” (Chromium zaczyna nawigację od celu fragmentu). Shift+Tab prowadzi do nawigacji i „Reset symulacji”. Przenoszenie fokusu na nagłówek po każdej nawigacji, wstecz/dalej i Reset działa jak wcześniej.
- Poza tym kod, teksty, stany i dane są identyczne z `revision-001`. Nowych decyzji ani założeń nie ma.

## Weryfikacja

### Przegląd statyczny — zaliczony

Wynik z `revision-001` nadal obowiązuje (jedyna zmiana kodu to start opisany wyżej). `check-prototype.mjs` (offline, blokada sieci) przy 360×740 i 1280×800: `RESULT=pass`, bez zablokowanych żądań, błędów konsoli i brakujących zasobów — [`evidence/index-360x740.png`](evidence/index-360x740.png), [`evidence/index-1280x800.png`](evidence/index-1280x800.png).

### Przejście w przeglądarce — zaliczone

Dostawca: `.ai/browsers/playwright.md` (`@playwright/test` 1.64.1, Chrome Headless Shell 156.0.8078.4, doctor `ok`). Spec jednorazowy `.ai/qa/specs/walk.spec.ts` (gitignored) otwiera `index.html` przez `file://` w kontekście offline, z blokadą każdego żądania spoza `file:`/`data:`/`blob:`. Po każdym teście sprawdza brak błędów strony i konsoli oraz brak poziomego przewijania. Te same 12 scenariuszy uruchomiono przy **360×740** i **1280×800**: `24 passed`. Testy fokusu powtórzono 5× (`--repeat-each 5`, 4 procesy): `40 passed`. Zrzuty: `evidence/<szerokość>-<krok>.png`.

| # | Krok z listy revision-001 | Oczekiwany wynik | Wynik | Dowód |
|---|---|---|---|---|
| 1 | J1 pusty → „Nowe zgłoszenie” | J2, fokus na h1 | ✅ | `01-j1-empty`, `02-…` |
| 2 | Pusty formularz → popraw → wyślij | błędy linku i celu, `aria-invalid`, fokus na linku; po poprawie J3 | ✅ | `02-j2-empty-errors` |
| 3 | Zły format linku | komunikat z przykładem, błąd celu znika | ✅ | `03-j2-invalid-url` |
| 4 | Serwer: prywatny PR | „Sprawdzam PR…” zablokowany → komunikat; „Wklej fragment kodu” przełącza zakładkę, fokus w polu, cel zostaje | ✅ | `04-j2-private-pr` |
| 5 | Serwer: za duży diff | „1 240 linii, a limit to 400” | ✅ | `05-j2-diff-too-large` |
| 6 | Fragment 520 linii → poprawa | komunikat o limicie; po poprawie J3 z „Fragment kodu” i „linia 42” (P-A05) | ✅ | `06-j2-fragment-too-long` |
| 7 | Poprawne wysłanie | „Analizuję kod” → „Czeka na mentora”, „3 uwagi: 1 istotna, 2 drobne” w kolejności wag; karta w J1 | ✅ | `07a`, `07b`, `07c` |
| 8 | Timeout w obu próbach | baner ponowienia → błąd → „Spróbuj ponownie” → review; drugie zgłoszenie → „Poproś mentora” → baner bez review AI | ✅ | `08a`, `08b`, `08c` |
| 9 | Niepoprawna odpowiedź | komunikat o odpowiedzi, której nie można pokazać | ✅ | `09-j3-invalid-json` |
| 10 | „Bez mentora” → poproś mentora | dialog z fokusem na „Poproś mentora”; Anuluj i Escape wracają fokusem do przycisku; potwierdzenie → „Czeka na mentora”, fokus na h1 | ✅ | `10a`, `10b-dialog` |
| 11 | AI bez uwag | baner R10; w J1 „Bez uwag AI” | ✅ | `11-j3-waiting-no-remarks` |
| 12 | Mentor zakończył review | „Sprawdzone przez mentora 15 paź, 14:20.”, „3 uwagi: 2 istotne, 1 drobna”, trzy oznaczenia pochodzenia, rozwijana wersja AI i sekcja odrzuconych; przycisk symulacji wyłączony | ✅ | `12-j3-verified` |
| 13 | Wstecz/dalej, `#nieznany`, Reset | historia J1↔J2↔J3 z fokusem na h1; ekran odzyskania → J1; Reset czyści listę, formularz i panel testowy, ogłasza reset; Reset w trakcie analizy nie zostawia wyniku | ✅ | `13a-unknown`, `13b-after-reset` |
| 14 | Wszystkie 19 linków `?state=` | każdy pokazuje swój stan; `loading` kończy się danymi, `error` → „Spróbuj ponownie” → dane; Reset po `?state=` i przeładowanie dają czysty start | ✅ | `360-14-state-*` (tylko 360 px) |
| 15 | Klawiatura | Tab/Shift+Tab po pasku, nawigacji, formularzu i kartach; strzałki w zakładkach; Enter wysyła i otwiera kartę; obrys fokusu ≥ 2 px na każdym elemencie | ✅ (po poprawce startu) | `15a-focus-visible`, `15b-keyboard-review` |

Szerokość 360 px: brak poziomego przewijania na wszystkich ekranach i w dialogu; bloki kodu przewijają się w ramce (`overflow-x: auto`).

Ograniczenia: Chromium headless, bez innych przeglądarek ani czytnika ekranu. Ogłoszenia `aria-live` sprawdzono tylko jako tekst regionu `status`, nie jako mowę. Kontrastu nie mierzono narzędziem (paleta czarno-szara). Na pełnostronicowych zrzutach przyklejony nagłówek review widać w połowie strony — to efekt przechwytywania zrzutu, nie układu.

Przejście sprawdza tylko zachowanie symulacji. Nie potwierdza założeń P-A01–P-A08, nie jest dowodem badawczym i nie spełnia Definition of Ready.

### Jak powtórzyć

```sh
cd .ai/qa && npm ci
node scripts/check-prototype.mjs ../prototypes/discovery/junior-zgloszenie-review-ai/revision-002/index.html --viewport 360x740
npx playwright test specs/walk.spec.ts   # spec jest lokalny (gitignored); kroki jak w tabeli
```
