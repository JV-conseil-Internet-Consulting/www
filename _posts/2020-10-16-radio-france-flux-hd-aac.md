---
layout: post
title: Les nouveaux flux Hifi HD de Radio France 📻
image:
  path: /assets/posts/2020-10-16-radio-france-flux-hd-aac.jpg
description: >
  Les nouveaux flux web audio Hifi HD au format .aac des stations de Radio France 📻
# sitemap: false
---

- &nbsp;
{:toc .large-only}

<!-- markdownlint-disable MD033 -->

<!--

# Les nouveaux flux web audio Hifi HD au format .aac des stations de Radio France

![Les Stations de Radio France](https://cdn.radiofrance.fr/s3/cruiser-production/2016/12/0b21680a-3c67-4f2d-9e20-be16e67c3e91/600x337_7radios-1.jpg "Les Stations de Radio France")

-->

![Radio-France-Flux-HD-AAC-2](https://user-images.githubusercontent.com/8126807/67148713-d72a2d00-f2a2-11e9-8050-83de5ed8c15f.png)
![Radio-France-Flux-HD-AAC-1](https://user-images.githubusercontent.com/8126807/67148712-d72a2d00-f2a2-11e9-8e51-0155fc8b9b18.png)

```txt
Canaux : Stéréo
Fréquence d'échantillonnage : 48000 Hz
Bits par échantillon : 32
```

### France Musique

- <https://icecast.radiofrance.fr/francemusique-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/francemusiqueeasyclassique-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/francemusiqueclassiqueplus-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/francemusiqueconcertsradiofrance-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/francemusiquelajazz-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/francemusiquelacontemporaine-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/francemusiqueocoramonde-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/francemusiquelabo-hifi.aac?id=radiofrance>

### FiP

- <https://icecast.radiofrance.fr/fiprock-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/fipjazz-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/fipgroove-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/fipworld-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/fipnouveautes-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/fipreggae-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/fipelectro-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/fip-hifi.aac?id=radiofrance>

### France Culture, France Inter

- <https://icecast.radiofrance.fr/franceculture-hifi.aac?id=radiofrance>
- <https://icecast.radiofrance.fr/franceinter-hifi.aac?id=radiofrance>

### iTunes Playlist Import/Export in XML format

`Fichier > Bibliothèque > Exporter la playlist... > Format XML`

![itunes-export-playlist](https://user-images.githubusercontent.com/8126807/67147939-06886c00-f29a-11e9-85a9-1b902c30ef73.jpg)

#### Télécharger le fichier et retirer le suffixe `.txt` du nom du fichier avant importation

- [Radio France AAC.xml.TXT](https://github.com/JV-conseil-Internet-Consulting/Radio-France-Flux-HD-AAC/files/3746923/Radio.France.AAC.xml.TXT)
- [Radio France AAC.m3u8.TXT](https://github.com/JV-conseil-Internet-Consulting/Radio-France-Flux-HD-AAC/files/3746929/Radio.France.AAC.m3u8.TXT)

### Python Web Scraping

```py
# coding=utf8
# the above tag defines encoding for this document and is for Python 2.x compatibility

import re

regex = r"(?P<link>http[^\"]*?/(?P<title>[^\.]*?)\.aac\?id=radiofrance)"

test_str = ("<copy-paste here HTML source code from: https://www.francemusique.fr>")

subst = ""

# You can manually specify the number of replacements by changing the 4th argument
result = re.sub(regex, subst, test_str, 0)

if result:
    print (result)

# Note: for Python 2.7 compatibility, use ur"" to prefix the regex and u"" to prefix the test string and substitution.
```

*[France Musique .AAC link scraping on Regex101](https://regex101.com/r/QzFpaY/1)*
