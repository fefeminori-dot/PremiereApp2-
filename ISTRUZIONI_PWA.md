# PWA PREMIERE — file da caricare su GitHub Pages

## File in questa cartella
- `index.html` — la app vera e propria (già collegata al backend su Render)
- `manifest.json` — rende l'app installabile su iPhone
- `sw.js` — service worker, necessario per il comportamento da PWA

## Passaggi

1. Crea un nuovo repository su GitHub, **pubblico** (es. chiamalo `premiere-pwa`)
2. Carica questi 3 file nella **root** del repository (drag&drop, stesso procedimento già fatto per il backend)
3. Vai su quel repository → **Settings** → **Pages**
4. In "Source" scegli **"Deploy from a branch"**, branch **main**, cartella **/ (root)**
5. Salva e aspetta 1-2 minuti

GitHub ti mostrerà un link tipo:
```
https://TUO-USERNAME.github.io/premiere-pwa/
```

## Come "installare" l'app sull'iPhone (per te o per i clienti)

1. Apri quel link in **Safari** sull'iPhone (deve essere Safari, non Chrome — solo Safari supporta l'installazione su iOS)
2. Tocca il pulsante **Condividi** (l'icona con il quadrato e la freccia verso l'alto, in basso nella barra di Safari)
3. Scorri e tocca **"Aggiungi alla schermata Home"**
4. Conferma

Da quel momento, sulla schermata Home del telefono apparirà un'icona "PREMIERE" che apre l'app a schermo intero, senza barra del browser — visivamente identica a un'app vera.

## Aggiornamenti futuri

Quando vorrai modificare la grafica o aggiungere funzioni alla PWA, basta:
1. Modificare i file
2. Caricarli di nuovo su questo stesso repository (sovrascrivendo i vecchi)
3. GitHub Pages si aggiorna automaticamente in 1-2 minuti

I clienti che hanno già installato l'icona sulla Home **vedranno la versione aggiornata automaticamente** al prossimo avvio, senza dover reinstallare nulla.

## Nota importante

Il backend (su Render, piano gratuito) si "addormenta" dopo 15 minuti di inattività. La prima apertura della PWA dopo un periodo di inattività potrebbe richiedere qualche secondo in più per caricare i dati (il server si deve "risvegliare") — è normale, non è un errore.
