const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function loginWithGitHub() {
	return new Promise<string | null>(async (resolve, reject) => {
		try {
			const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`;

			const redirectUrl = await chrome.identity.launchWebAuthFlow({
				url: authUrl,
				interactive: true, // ユーザーが許可するUIを開く
			});

			if (!redirectUrl) {
				reject('認証に失敗しました');
				return;
			}

			// GitHubからのリダイレクトURLには ?code=xxxx が含まれる
			const urlParams = new URL(redirectUrl);
			const code = urlParams.searchParams.get('code');

			if (!code) {
				reject('認証コードの取得に失敗しました');
				return;
			}

			// バックエンドにcodeを渡してトークンを取得
			const response = await fetch(`${SERVER_URL}/api`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code }),
			});

			const data = await response.json();
			const accessToken = data.access_token;

			if (!accessToken) {
				reject('アクセストークンの取得に失敗しました');
				return;
			}

			// トークンを保存
			await chrome.storage.local.set({ githubAccessToken: accessToken });

			resolve(accessToken);
		} catch (error) {
			reject('認証エラー: ' + error);
		}
	});
}
