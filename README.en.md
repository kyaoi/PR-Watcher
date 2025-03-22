# 🚀 PR Watcher - A Chrome Extension to Track GitHub Review Requests

![badge](https://img.shields.io/badge/status-active-brightgreen)

PR Watcher is a Chrome extension that helps you keep track of Pull Requests where you have been requested to review on GitHub — in real-time.  
**Never miss a code review again!**

---

## 🔍 Key Features

- ⏰ Automatically fetches Pull Requests you're requested to review
- 📥 Clean and minimal popup UI to browse PRs
- 🔔 Badge on the extension icon with the number of pending PRs (updates every 5 minutes)
- 🌙 Dark mode support
- 🔐 Secure GitHub authentication using a Personal Access Token (read-only scope only)

---

## 🧲 Installation (Developer Mode)

1. Clone this repository:

   ```bash
   git clone git@github.com:kyaoi/PR-Watcher.git
   cd pr-watcher
   ```

2. Install packages (recommended: [pnpm](https://pnpm.io/)):

   ```bash
   pnpm install
   ```

3. Build:

   ```bash
   pnpm run build
   ```

4. Load the extension in Chrome:

   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist/` folder

---

## 🔐 About Access Token

This extension uses GitHub's **GraphQL API**, which requires a  
**Personal access token (classic)** for authentication.

### Required Scope:

- Check all under `repo`

👉 Generate your token here:  
[https://github.com/settings/tokens/new?type=classic](https://github.com/settings/tokens/new?type=classic)

---

## 💡 Contribute or Suggest Ideas!

PR Watcher is an open-source project.  
Bug reports, feature suggestions, and pull requests are very welcome!

---

## 📸 Screenshots

### Light mode
<p align="center">
  <img src="https://github.com/user-attachments/assets/6baf8284-bd5d-4a76-a6f2-6acf844f26b9" width="350" />
  <img src="https://github.com/user-attachments/assets/dc5063d6-3e67-484c-8801-82455b71fa41" width="350" style="margin-left: 16px;" />
</p>

### Dark mode
<p align="center">
  <img src="https://github.com/user-attachments/assets/b77498a1-6ec2-402a-a38f-41bc89951d56" width="350" />
  <img src="https://github.com/user-attachments/assets/f31a7dbe-7770-4449-88af-04d5d94cfb1f" width="350" style="margin-left: 16px;" />
</p>

---

## 📄 License

[MIT License](./LICENSE)

---

## 🙌 Author

GitHub: [@kyaoi](https://github.com/kyaoi)
