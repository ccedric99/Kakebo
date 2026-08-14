# Kakebo-Planer

Haushaltsbuch nach dem Kakebo-Prinzip mit Töpfen, Tagesbudget und Monatsabschluss.
Läuft vollständig im Browser: kein Backend, kein Login, keine Cloud. Alle Daten
bleiben auf dem Gerät.

## Dateien

```
index.html                 die gesamte App (Struktur, Gestaltung, Logik)
manifest.json              Name, Farben, Icons für die Installation
sw.js                      Service Worker für den Offline-Betrieb
icon-192.png               Startbildschirm-Icon
icon-512.png               Icon in hoher Auflösung
icon-maskable-512.png      Icon mit Rand für Androids Maskenformen
apple-touch-icon.png       Icon für iOS
```

Alle sieben Dateien gehören in dasselbe Verzeichnis. Alle Pfade sind relativ —
das Wurzelverzeichnis des Repos funktioniert genauso wie ein Unterordner.

## Auf GitHub Pages veröffentlichen

1. Dateien ins Repository legen, entweder nach `/` oder z. B. nach `/kakebo/`.
2. Im Repository: **Settings → Pages**, unter *Source* den Branch wählen
   (meist `main`) und als Ordner `/ (root)` — dann speichern.
3. Nach ein bis zwei Minuten ist die App erreichbar unter
   `https://BENUTZERNAME.github.io/` bzw. `https://BENUTZERNAME.github.io/kakebo/`.

GitHub Pages liefert automatisch über HTTPS aus. Das ist die Voraussetzung
dafür, dass Service Worker und Installation funktionieren.

## Auf dem Handy installieren

**Android (Chrome)** — Seite öffnen, Menü ⋮ → *App installieren* bzw.
*Zum Startbildschirm hinzufügen*.

**iPhone/iPad (Safari)** — Seite in **Safari** öffnen, Teilen-Symbol antippen →
*Zum Home-Bildschirm*. Über Chrome auf iOS geht es nicht.

Danach startet die App im Vollbild ohne Adressleiste und funktioniert offline.

## Nach dem ersten Update

Der Service Worker liefert die zwischengespeicherte Fassung zuerst aus und holt
die neue im Hintergrund. Eine Änderung ist also beim übernächsten Start sichtbar.
Wer sie sofort sehen will: `VERSION` in `sw.js` hochzählen (`kakebo-v2`) und die
App zweimal öffnen.

## Sicherung

Die Daten liegen im `localStorage` dieses einen Browsers. Sie überstehen
Neustarts, aber nicht das Löschen der Browserdaten — und iOS räumt den Speicher
von Web-Apps, die viele Wochen ungenutzt bleiben.

Deshalb: **Einstellungen ⚙ → Sicherung speichern (JSON)**, gelegentlich, und die
Datei irgendwo ablegen, wo sie bleibt. Über *Sicherung einlesen* kommt alles
zurück, auch auf einem anderen Gerät.

Die CSV-Exporte beim Monatsabschluss sind ergänzend gedacht (für Excel), nicht
als vollständige Sicherung — sie enthalten kein Archiv und keinen Spartopf.
