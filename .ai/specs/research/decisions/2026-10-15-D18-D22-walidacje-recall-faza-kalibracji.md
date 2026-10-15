# D18–D22 — Walidacja uwag mentora, recall, okna kryteriów, faza kalibracji (odpowiedzi na Q10–Q12) i zamknięcie discovery
- Date, owner: 2026-10-15, Adrian Czyrek
- Źródło: wiadomość właściciela w sesji discovery 2026-10-15, zaczynająca się od „Decyzje (potwierdzam):” i odpowiadająca na Q10, Q11, Q12. Zapis wierny treści.
- Context and the options weighed: po drugim refreshu otwarte były Q10 (okna oceny kryteriów porzucenia), Q11 (zasady dla uwagi mentora) i Q12 (metryka recall); brief wskazywał też, że próbka 20% rośnie powoli.
- Decision and why (słowa właściciela, uporządkowane):
  1. Q11: „uwaga mentora ma te same pola i zasady co uwaga AI. »Dlaczego« wymagane (twarda walidacja, min. 20 znaków). Gotowy kod = ostrzeżenie, nie blokada.”
  2. Q12: „tak, recall w widoku evals. Wzór: trafne uwagi AI (zatwierdzone + poprawione) / (trafne uwagi AI + uwagi dodane przez mentora), liczony tylko na próbce. Zawsze z n; przy n < 10 pokazujemy tylko liczbę przeoczeń. Oznaczony jako szacunkowy.”
  3. Q10: „uwagi mentora są eval cases typu »przeoczenie«, ale nie wliczają się do progu 30 (próg 30 = ocenione uwagi AI). Kryterium 25% oceniane po min. 10 zgłoszeniach z próbki; wcześniej widok pokazuje »za mało danych«.”
  4. „Ograniczenie wielkości próbki: faza kalibracji. Pierwsze 50 zgłoszeń trafia do mentora w 100%, potem próbka 20%.”
  5. Polecenie: „Zaktualizuj brief (--refresh) i zamknij discovery. Kolejne pytania, które nie blokują Etapu 1, zapisz jako otwarte i nie zadawaj ich teraz.”
- Consequences, and what would make us revisit it: liczby 20 znaków, n < 10, 10 zgłoszeń i 50 zgłoszeń są wyborami właściciela bez pomiaru. Discovery zamknięte; pozostałe pytania nieblokujące Etapu 1 zostają w briefie jako otwarte.
- Status: active
