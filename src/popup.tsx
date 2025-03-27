import { useEffect, useState } from 'react';
import { PRList, ThemeToggle, TokenInput } from './components';
import { BackgroundToggle } from './components/BackgroundToggle';

export default function Popup() {
  const [token, setToken] = useState<string | null>(null);
  const [prCount, setPrCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(['githubAccessToken'], (result) => {
      setToken(result.githubAccessToken || null);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    chrome.storage.local.remove('githubAccessToken', () => {
      setToken(null);
      setPrCount(0);
    });
  };

  if (loading) return <div className="p-6 text-lg">読み込み中...</div>;

  return (
    <div className="min-h-[500px] w-[380px] p-6 text-base dark:bg-zinc-900 dark:text-white">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="font-bold text-2xl">
          📥 Review PRs{prCount > 0 ? ` (${prCount})` : ''}
        </h1>
        <ThemeToggle />
      </div>
      {token ? (
        <>
          <BackgroundToggle />
          <PRList token={token} onCountChange={setPrCount} />
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 cursor-pointer text-red-500 text-sm underline"
          >
            ログアウト（トークン削除）
          </button>
        </>
      ) : (
        <TokenInput setToken={setToken} />
      )}
    </div>
  );
}
