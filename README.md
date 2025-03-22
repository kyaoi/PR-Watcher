# 🚀 PR Watcher - GitHubのレビュー依頼を見逃さない Chrome 拡張

![badge](https://img.shields.io/badge/status-active-brightgreen)

GitHub 上で「自分にレビューが依頼されている Pull Request」をリアルタイムで監視できる Chrome 拡張です。  
**見逃しゼロの開発体験**をあなたに！

---

## 🔍 主な機能

- ⏰ 自分にレビュー依頼された PR を自動取得
- 📥 ポップアップでPR一覧をすっきり表示
- 🔔 拡張アイコンに件数バッジを表示（5分ごとに更新）
- 🌙 ダークモード対応
- 🔐 アクセストークンによる安全な認証（読み取り専用スコープのみ）

---

## 🧲 インストール手順（開発者モード）

1. このリポジトリをクローン：

   ```bash
   git clone git@github.com:kyaoi/PR-Watcher.git
   cd pr-watcher
   ```

2. パッケージをインストール（[pnpm](https://pnpm.io/) 推奨）：

   ```bash
   pnpm install
   ```

3. ビルド：

   ```bash
   pnpm run build
   ```

4. Chrome で拡張機能を読み込み：

   - `chrome://extensions` にアクセス
   - 「デベロッパーモード」をオン
   - 「パッケージ化されていない拡張機能を読み込む」 → `dist/` フォルダを指定

---

## 🔐 アクセストークンについて

この拡張機能は GitHub の **GraphQL API** を利用するため、  
最初に **Personal access tokens (classic)** を使って認証します。

### 必要なスコープ：

- `repo` にすべてチェックを入れる

👉 トークンの発行はこちら：  
[https://github.com/settings/tokens/new?type=classic](https://github.com/settings/tokens/new?type=classic)

---

## 💡 機能改善・コントリビュート大歓迎！

この拡張機能は OSS（オープンソースソフトウェア）として公開されています。  
バグ報告・アイデア提案・機能追加の Pull Request など、気軽にご参加ください！


---

## 📸 スクリーンショット

### Light mode
<p align="center"> <img src="https://github.com/user-attachments/assets/6baf8284-bd5d-4a76-a6f2-6acf844f26b9" width="350" /> <img src="https://github.com/user-attachments/assets/dc5063d6-3e67-484c-8801-82455b71fa41" width="350" style="margin-left: 16px;" /> </p>

### Dark mode
<p align="center">  <img src="https://github.com/user-attachments/assets/b77498a1-6ec2-402a-a38f-41bc89951d56" width="350" /> <img src="https://github.com/user-attachments/assets/f31a7dbe-7770-4449-88af-04d5d94cfb1f" width="350" style="margin-left: 16px;"  /></p>

---

## 📄 ライセンス

[MIT License](./LICENSE)

---

## 🙌 作成者

GitHub: [@kyaoi](https://github.com/kyaoi)

