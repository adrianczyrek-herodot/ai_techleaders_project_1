# D07–D12 — Odpowiedzi właściciela na otwarte pytania briefu (Q01, Q02, Q04–Q06) i plan researchu
- Date, owner: 2026-10-15, Adrian Czyrek
- Źródło: wiadomość właściciela w sesji discovery 2026-10-15, zaczynająca się od „Decyzje (potwierdzam):”. Zapis wierny treści, po polsku.
- Context and the options weighed: brief z 2026-10-15 zawierał propozycje agenta D07 (co widzi junior przy eskalacji), D08 (priorytet nauki), R08 (brak uwag nie eskaluje) i otwarte pytania Q01, Q02, Q04–Q06.
- Decision and why (słowa właściciela, uporządkowane):
  1. Q02: „akceptuję D07. Junior od razu widzi review AI z etykietą »czeka na mentora«.” — D07 przechodzi z propozycji (rekomendacja agenta) w decyzję.
  2. Q04: „zamiast średniej: eskalacja, gdy którakolwiek uwaga >= major ma confidence < 0.7.” — warunek średniej `confidence` z R01 zostaje zastąpiony.
  3. Q05: „zmieniam R08. Zgłoszenie bez uwag ZAWSZE trafia do mentora (ryzyko przeoczenia).” — propozycja agenta R08 odrzucona; przyjęta alternatywa.
  4. Q06: „tak. 20% losowa próbka zgłoszeń bez eskalacji trafia do mentora (evals bez biasu).”
  5. Q01: „akceptuję D08, przy konflikcie wygrywa nauka.” Kryterium porzucenia: „po 30 eval cases i 3 iteracjach promptu precyzja (odsetek zatwierdzonych uwag) < 60% → rewizja koncepcji.”
  6. Research: „rozmowy odkładam. Zbiorę 10–15 próbek prawdziwego kodu jako golden set do kalibracji progu.”
- Consequences, and what would make us revisit it: próg 0.7, odsetek 20%, 60% i liczby 30 / 3 / 10–15 to cele i parametry wybrane przez właściciela bez pomiaru bazowego. Odłożenie rozmów oznacza, że problem juniorów i mentorów pozostaje niesprawdzony (zaakceptowane ryzyko, nie dowód). Rewizja: wynik kalibracji na golden secie lub spełnienie kryterium porzucenia.
- Status: active
