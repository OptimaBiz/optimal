# PR-8 inventory: non-FSA coverage

## Ключевые разделы 1-го уровня
- `index.html`
- `uslugi.html`
- `licenzirovanie.html`
- `sertifikaciya.html`
- `attestaciya.html`
- `dop-uslugi.html`
- `about.html`
- `contacts.html`

## Важные дочерние service pages
- Лицензирование: `licenziya-mchs.html`, `licenziya-minkult.html`, `licenziya-medicinskaya-deyatelnost.html`, `medicinskaya-deyatelnost.html`
- Сертификация: `gost-r-iso-9001-2015.html`, `gost-r-iso-14001-2016.html`, `gost-r-45001-2020-ohsas.html`, `gost-r-54934-2012-ohsas.html`, `integrirovannaya-sistema-menedzhmenta-kachestva.html`
- Аттестация/НАКС: `attestaciya-naks.html`, `personal-naks.html`, `tehnologii-svarki-naks.html`, `promyshlennaya-bezopasnost.html`, `elektrobezopasnost.html`
- Смежные: `obuchenie-povyshenie-kvalifikacii.html`, `obuchenie-po-okhrane-truda.html`, `profperepodgotovka.html`, `okhrana-truda.html`, `pozharnaya-bezopasnost.html`

## Второстепенные/служебные
- `legal.html`, `oferta.html`, `privacy-policy.html`, `personal-data.html`, `requisites.html`
- служебные/персональные: `anton.html`, `dmitry.html`, `me.html`, `yandex_800911e997102328.html`

## Наблюдения до правок
- Часть non-FSA service pages была уже близка к стандарту FSA по структуре (hero, roadmap, финальная CTA-зона).
- Слабое место: несогласованность page-family контекста на уровне `<body>` для non-FSA страниц, что мешало системно применять единый визуальный стандарт.
- Слабое место: на `uslugi.html` OG/Twitter метаданные были смещены к лицензированию (не соответствовали странице-каталогу).
