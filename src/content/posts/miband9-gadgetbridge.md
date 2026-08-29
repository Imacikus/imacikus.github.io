---
title: "MI Band 9 mit Gadgetbridge verbinden – Schritt-für-Schritt"
published: 2025-11-05
description: "Mit dieser Anleitung kannst du dein Mi Band 9 lokal, datenschutzfreundlich und ohne Cloud nutzen."
image: /Medien/MiBand_9.jpeg
tags: ["Gadgetbridge", "Mi Band", "Datenschutz", "F-Droid", "OpenSource"]
category: "Technik & Datenschutz"
draft: false
---

Mit dieser Anleitung kannst du dein Mi Band 9 lokal, datenschutzfreundlich und ohne Cloud nutzen.

1. **Xiaomi-App installieren:** Mi Fitness / Mi Health / Xiaomi Wear
2. **Mi Band koppeln:** dadurch wird ein Key erstellt
3. **Computer vorbereiten:** adb (Android Debugging Bridge) installieren
4. **USB-Debugging aktivieren:** auf dem Smartphone einschalten
5. **Smartphone verbinden:** per USB mit dem Computer
6. **Key auslesen:**

```shell
adb shell
grep -Eo '(encryptKey|token|authKey|huamiAuthKey)[":= ]+[[:xdigit:]]{32}' \
/sdcard/Android/data/{com.xiaomi.wearable,com.mi.health}/files/log/*.log \
| grep -oE '[[:xdigit:]]{32}' | sort | uniq
```

Den langen Code kopieren und später in Gadgetbridge einfügen.

7. Bluetooth aus → Xiaomi-App deinstallieren → Bluetooth wieder einschalten
8. Gadgetbridge starten, Gerät verbinden und Key eingeben
9. Fertig: Das Mi Band funktioniert lokal und datenschutzfreundlich 🎉

> **Tipp:** Für Outdoor-Sport den GPS-Timeout erhöhen und externe Apps wie OpenTracks einbinden, um genauere Aufzeichnungen zu bekommen.

[Gadgetbridge auf F-Droid herunterladen](https://f-droid.org/packages/nodomain.freeyourgadget.gadgetbridge/)