# 🍥 Imacikus – Portfolio & Blog

Die Website basiert auf dem Blog-Template [Fuwari](https://github.com/saicaca/fuwari) (Astro + Tailwind CSS).
Sie wird automatisch über **GitHub Actions** gebaut und auf **GitHub Pages** veröffentlicht.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/S6S41OURL2)

## ✨ Funktionen

- Blog mit Markdown-Artikeln, Tags & Kategorien
- Suche (Pagefind) & RSS-Feed & Sitemap
- Dunkler/Heller Modus, responsives Design
- Eigene Projekt-Seite und statische Info-Kurs-Seite

---

## 📝 Neuen Blog-Artikel hinzufügen

Am einfachsten: eine neue `.md`-Datei in `src/content/posts/` anlegen, per Push hochladen –
der Rest passiert automatisch (Build + Deployment).

Vorlage für eine neue Datei `mein-beitrag.md`:

```md
---
title: "Mein neuer Beitrag"
published: 2026-08-29
description: "Kurze Zusammenfassung für die Übersicht."
image: /Medien/mein-bild.jpg
tags: ["Technik", "OpenSource"]
category: "Technik & Datenschutz"
draft: false
---

Hier steht der Artikel in Markdown.
Bilder z. B. nach `public/Medien/` legen und mit `/Medien/...` einbinden.
```

- `published` – Datum im Format `JJJJ-MM-TT`
- `tags` / `category` – optional; Tags werden automatisch im Archiv gesammelt
- `image` – optionales Cover-Bild (Pfad relativ zu `public/`, beginnt mit `/`)
- `draft: true` – versteckt den Beitrag bis zur Veröffentlichung

Alternativ per Befehl eine Vorlage erzeugen lassen:

```bash
pnpm new-post mein-beitrag
```

> Tipp: Die VS-Code-Erweiterung **Front Matter** (.vscode/extensions.json) hilft beim Bearbeiten
> des Frontmatters, u. a. mit Datum und Tag-Vervollständigung.

---

## 💻 Lokal entwickeln

```bash
# Voraussetzung: Node.js 20+ und pnpm 9+
pnpm install        # Abhängigkeiten installieren
pnpm dev            # Lokale Vorschau unter http://localhost:4321
pnpm new-post foo   # Neues Post-Gerüst erzeugen
pnpm build          # Produktions-Build (inkl. Suche-Index)
pnpm preview        # Build lokal ansehen
pnpm astro check    # Typ-/Fehlerprüfung
```

## 🚀 Veröffentlichen (Deployment)

1. Änderungen committen und auf den `main`-Branch pushen:
   ```bash
   git add .
   git commit -m "Neuer Beitrag"
   git push
   ```
2. GitHub Actions baut die Seite automatisch und deployed sie nach GitHub Pages.
   Den Status siehst du unter **Repository → Actions**.

### Einmalige Einrichtung

Falls das Deployment noch nie über GitHub Actions gelaufen ist:

1. Repository → **Settings → Pages**
2. Bei **Build and deployment / Source** die Option **GitHub Actions** auswählen
3. Das Workflow-Artefakt (`.github/workflows/deploy.yml`) wird ab dem nächsten Push deployed

---

## 🗂️ Projektstruktur (wichtig für die Pflege)

| Pfad | Zweck |
| --- | --- |
| `src/content/posts/*.md` | Blog-Artikel (einfach neue Dateien hochladen) |
| `src/content/spec/about.md` | Inhalt der „Über mich“-Seite |
| `src/config.ts` | Name, Bio, Navigation, Farben, Profil-Links |
| `src/pages/projekte.astro` | Projekt-Seite (Borin AI, …) |
| `src/i18n/languages/de.ts` | Deutsche Texte der Oberfläche |
| `public/info-kurs/` | Statische Info-Kurs-Material-Seite |
| `public/Medien/` | Bilder & Medien (Cover `/Medien/...`) |
| `.github/workflows/deploy.yml` | Auto-Build + Deploy auf GitHub Pages |

## 🎨 Farben & Design

Das Theme (Türkis/Cyan) wird in `src/config.ts` über `themeColor.hue` gesteuert
(`188` = Cyan, `250` = Indigo). Ein neues Profilbild einfach als `public/avatar.svg`
ersetzen bzw. den Pfad unter `profileConfig.avatar` anpassen.

## 🔗 Links & Quellen

- Template: [saicaca/fuwari](https://github.com/saicaca/fuwari) (MIT-Lizenz)
- Dashboard: [Astro](https://astro.build) · [Tailwind CSS](https://tailwindcss.com)