import { useEffect, useState } from 'react';
import { GITHUB_GRAPHQL_API } from '../utils';

type PR = {
  node: {
    title: string;
    url: string;
    createdAt: string;
    repository: {
      nameWithOwner: string;
    };
    author: {
      login: string;
    };
  };
};

type Props = {
  token: string;
  onCountChange?: (count: number) => void;
};

export function PRList({ token, onCountChange }: Props) {
  const [prs, setPrs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);

  // biome-ignore lint:
  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const query = `
          query {
            search(query: "is:open is:pr review-requested:@me", type: ISSUE, first: 100) {
              edges {
                node {
                  ... on PullRequest {
                    title
                    url
                    createdAt
                    repository {
                      nameWithOwner
                    }
                    author {
                      login
                    }
                  }
                }
              }
            }
          }`;
        const res = await fetch(GITHUB_GRAPHQL_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });

        const data = await res.json();
        const prNodes = data?.data?.search?.edges || [];

        setPrs(prNodes);
        onCountChange?.(prNodes.length);

        // ✅ 件数と取得時間を chrome.storage に保存
        await chrome.storage.local.set({
          prCount: prNodes.length,
          timestamp: Date.now(),
        });
        await chrome.action.setBadgeText({
          text: prNodes.length > 0 ? `${prNodes.length}` : '',
        });
        await chrome.action.setBadgeBackgroundColor({ color: '#dc2626' });
      } catch (e) {
        console.error('PR取得失敗:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPRs();
  }, [token]);

  if (loading) return <p>⏳ PRを取得中...</p>;
  if (prs.length === 0) return <p>📭 レビュー待ちのPRはありません</p>;

  return (
    <div className="space-y-4">
      {prs.map(({ node }) => (
        <a
          key={node.url}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border bg-white p-4 text-sm shadow-sm transition hover:shadow-md dark:bg-zinc-800"
        >
          <div className="font-semibold text-gray-900 dark:text-white">
            {node.title}
          </div>
          <div className="mt-1 text-gray-600 dark:text-gray-300">
            <p className="rounded bg-gray-100 px-2 py-0.5 font-mono dark:bg-zinc-700">
              {node.repository.nameWithOwner}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              by {node.author.login}
            </p>
          </div>
          <div className="mt-1 text-gray-400 dark:text-gray-500">
            作成日: {new Date(node.createdAt).toLocaleDateString()}
          </div>
        </a>
      ))}
    </div>
  );
}
