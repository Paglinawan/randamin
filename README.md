![README](https://github.com/user-attachments/assets/504c3513-9c31-4e5a-ba5f-a6a60a058921)

## ❑ Resources

- [【GAS中級編】TSで書くLINE Botハンズオン！【BOT AWARDS 2024】](https://www.youtube.com/watch?v=y_OWTt5E_OE)
- [Messaging APIリファレンス](https://developers.line.biz/ja/reference/messaging-api/)
- [FLEX MESSAGE SIMULATOR](https://developers.line.biz/flex-simulator)

<br>

## ❑ Steps to Clone This Repository

1. [LINE Developers](https://developers.line.biz/console/)でチャンネルを作成
2. クローン
3. `yarn install` ※1
4. `yarn clasp login`
5. `yarn clasp create` > sheets を選択
6. `rm appsscript.json`
7. `code .clasp.json` もしくは`open .clasp.json`でファイルを開きコードを追加

```
{
  "scriptId":"xxxxxxxxxxxxx",
  "parentId": ["xxxxxxxxxxxxx"],
  "rootDir": "./dist" // 👈　追加
}
```

8. `yarn push`
9. `yarn open`
10. デプロイして[***ウェブアプリのURL***]を[LINE Developers](https://developers.line.biz/console/)で作成したチャンネルの[***Messaging API設定***]の `Webhook URL` を設定
11. 同チャネルの[***チャネルアクセストークン***]を発行
12. GASに戻ってサイドバー下の⚙️より[***スクリプト プロパティ***]を発行

```
プロパティ: CHANEL_ACCESS_TOKEN
　　　　値: [11.で発行したチャネルアクセストークン]
```

---

※1 `.pnp.cjs`と`.pnp.loader.mjs`があれば削除する

```
rm .pnp.cjs .pnp.loader.mjs
```
