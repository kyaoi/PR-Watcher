import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type Props = {
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export function TokenInput({ setToken }: Props) {
	const [tokenInput, setTokenInput] = useState('');
	const [saving, setSaving] = useState(false);
	const [showToken, setShowToken] = useState(false);

	const handleSave = async () => {
		setSaving(true);
		try {
			await chrome.storage.local.set({ githubAccessToken: tokenInput });
			setToken(tokenInput);
		} catch (err) {
			alert('保存に失敗しました');
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="space-y-3">
			<p className="text-base text-gray-700 dark:text-gray-200">
				アクセストークンを入力してください：
			</p>
			<div className="relative">
				<input
					type={showToken ? 'text' : 'password'}
					className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-base dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
					value={tokenInput}
					onChange={(e) => setTokenInput(e.target.value)}
					placeholder="ghp_xxx..."
				/>
				<button
					type="button"
					className="absolute top-3 right-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					onClick={() => setShowToken(!showToken)}
				>
					{showToken ? <Eye size={18} /> : <EyeOff size={18} />}
				</button>
			</div>
			<button
				type="button"
				className="w-full cursor-pointer rounded-lg bg-blue-500 px-4 py-2 font-semibold text-base text-white hover:bg-blue-600"
				onClick={handleSave}
				disabled={saving || !tokenInput}
			>
				{saving ? '保存中...' : 'トークンを保存'}
			</button>
			<div className="mt-4">
				<a
					href="https://github.com/settings/tokens/new?type=classic"
					target="_blank"
					rel="noopener noreferrer"
					className="block text-center text-blue-600 text-sm underline dark:text-blue-400"
				>
					GitHubでトークンを発行する
				</a>
			</div>
			<div className="mt-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800 leading-relaxed dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-100">
				<p className="mb-2 font-semibold">🔐 トークン作成時の注意</p>
				<p className="mb-2">
					この拡張機能では GitHub の
					<strong className="font-semibold">GraphQL API</strong>
					を使用して、あなたに割り当てられたレビュー依頼中の Pull Request
					を取得します。
				</p>
				<p className="mb-2">
					トークン作成時には
					<span className="mx-1 inline-block rounded bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-zinc-800">
						Personal access tokens (classic)
					</span>
					を選択し、
					<strong className="font-semibold">「repo」スコープ</strong>
					にのみチェックを入れてください。
					<br />※ 必要以上に権限をつけるのはおすすめしません。
				</p>
				<ul className="mb-2 ml-2 list-inside list-disc">
					<li>
						<code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-zinc-800">
							repo
						</code>{' '}
						– リポジトリの読み取り権限が含まれ、PRの取得に必要です
					</li>
				</ul>
				<a
					href="https://github.com/settings/tokens/new?type=classic"
					target="_blank"
					rel="noopener noreferrer"
					className="mt-2 inline-block text-blue-600 underline dark:text-blue-400"
				>
					🔗 Personal access tokens (classic) を作成する
				</a>
			</div>
		</div>
	);
}
