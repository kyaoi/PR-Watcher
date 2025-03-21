import { useState } from 'react';
import { loginWithGitHub } from '../utils/auth';

export function LoginButton() {
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		setLoading(true);
		try {
			// @ts-ignore: まだ実装していない要素のため
			const token = await loginWithGitHub();
			alert('ログイン成功！トークンを取得しました');
		} catch (error) {
			console.error(error);
			alert('ログインに失敗しました');
		}
		setLoading(false);
	};

	return (
		<button
			type="button"
			className="bg-blue-500 text-white p-2 rounded"
			onClick={handleLogin}
			disabled={loading}
		>
			{loading ? 'ログイン中...' : 'GitHubでログイン'}
		</button>
	);
}
