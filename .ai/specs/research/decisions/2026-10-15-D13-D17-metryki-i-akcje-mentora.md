# D13–D17 — Metryki evals, próbka kontrolna, uwagi dodane przez mentora (odpowiedzi na Q07–Q09)
- Date, owner: 2026-10-15, Adrian Czyrek
- Źródło: wiadomość właściciela w sesji discovery 2026-10-15, zaczynająca się od „Decyzje (potwierdzam):” i odpowiadająca na Q07, Q08, Q09. Zapis wierny treści.
- Context and the options weighed: brief po pierwszym refreshu zostawił otwarte: sposób liczenia precyzji w kryterium porzucenia (Q07), widok juniora przy zgłoszeniu z próbki kontrolnej (Q08) i brak akcji „dodaj uwagę” dla mentora (Q09).
- Decision and why (słowa właściciela, uporządkowane):
  1. Q07: „dwie metryki. Precyzja ścisła = zatwierdzone / ocenione; precyzja luźna = (zatwierdzone + poprawione) / ocenione. Próg 60% w kryterium porzucenia dotyczy precyzji luźnej. Metryki liczone osobno dla eskalacji i próbki; kryterium porzucenia liczone wyłącznie na losowej próbce, eskalacje są diagnostyczne.”
  2. Q08: „zgłoszenie z próbki ma tę samą etykietę »czeka na mentora«. Junior nie odróżnia próbki od eskalacji.”
  3. Q09: „tak. Mentor może dodać własną uwagę (kategoria, waga, linia, wyjaśnienie). Każda dodana uwaga = przeoczenie AI = osobny typ przypadku testowego (recall).”
  4. „Dodatkowe kryterium porzucenia: jeśli w próbce losowej mentor dodaje uwagę >= major w > 25% zgłoszeń → rewizja koncepcji.”
  5. „Golden set 10–15 próbek traktuję jako orientację; ponowna kalibracja progu po 30+ eval cases.”
- Consequences, and what would make us revisit it: progi 60% i 25% oraz liczba 30+ są wyborami właściciela bez pomiaru bazowego. Nie określono, ile zgłoszeń lub przypadków z samej próbki losowej musi się zebrać przed oceną kryteriów porzucenia ani jak liczyć recall jako metrykę.
- Status: active
