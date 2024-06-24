# Randamin

![Header](https://github.com/Paglinawan/randamin/assets/32391651/e03b5074-072d-4b79-9500-74d28cca9387)


## ❶ Problems

- 学習が続かない
- ブックマークしても見返さない

<br>

## ❷ Solutions

LINEの[Messaging API↗︎](https://developers.line.biz/ja/reference/messaging-api/)を使って、定期的にGoogleスプレッドシートの内容をランダムで取得して通知する

<br>

## ❸ Spec

### `Languages`

- originalとtranslationの内容をランダムで6件通知
- frequencyの数値で出現頻度を調整
- `Archive` : Languagesのdoneにチェックを入れると指定のシートにアーカイブする

### `Words`

- label、concept、exampleの内容をランダムで6件通知
- frequencyの数値で出現頻度を調整
- urlに入力があればボタンを表示

<br>

## ❹ Resources

- [Googleスプレッドシートのテンプレート](https://docs.google.com/spreadsheets/d/1gvkHueOvBdrJow6jNVe9d_tPnGZdXAA_4n2brbUnKko/edit?usp=sharing)
  - 表示形式 > テーマでカラーテーマを変更できます
- [Messaging APIリファレンス](https://developers.line.biz/ja/reference/messaging-api/)
- [FLEX MESSAGE SIMULATOR](https://developers.line.biz/flex-simulator)
- 【GAS中級編】TSで書くLINE Botハンズオン！【BOT AWARDS 2024】
  - [YouTube](https://www.youtube.com/watch?v=y_OWTt5E_OE)
  - [Notion](https://minakoph.notion.site/GAS-TS-LINE-Bot-BOT-AWARDS-2024-653b26d50a33430f9283a66839d27704)
- [Node.jsで学ぶWebシステムとソフトウェア開発基礎！Node.js完全入門ガイド | Udemy](https://www.udemy.com/share/107wK1/)
