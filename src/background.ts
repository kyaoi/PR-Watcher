import { GITHUB_GRAPHQL_API } from './utils';

chrome.runtime.onInstalled.addListener(() => {
	chrome.alarms.create('fetchPRs', { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
	const { githubAccessToken } = await chrome.storage.local.get([
		'githubAccessToken',
	]);

	if (!githubAccessToken) {
		return;
	}

	const { enableBackgroundFetch } = await chrome.storage.local.get(['enableBackgroundFetch']);
	if (!enableBackgroundFetch) {
		return;
	}

	if (alarm.name === 'fetchPRs') {
		const { prCount, timestamp } = await chrome.storage.local.get([
			'prCount',
			'timestamp',
		]);

		const now = Date.now();
		const isRecent = timestamp && now - timestamp < 1000 * 60 * 5;

		if (isRecent) {
			console.log('🔁 使用: 保存されたPR件数');
			chrome.action.setBadgeText({ text: prCount > 0 ? `${prCount}` : '' });
			chrome.action.setBadgeBackgroundColor({ color: '#dc2626' });
		} else {
			console.log('🌐 再取得: PR件数');
			await checkPRs(githubAccessToken);
		}
	}
});

async function checkPRs(token: string) {
	const query = `
    query {
      search(query: "is:open is:pr review-requested:@me", type: ISSUE, first: 100) {
        issueCount
      }
    }
  `;

	try {
		const res = await fetch(GITHUB_GRAPHQL_API, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query }),
		});

		const data = await res.json();
		const count: number = data?.data?.search?.issueCount || 0;

		chrome.action.setBadgeText({ text: count > 0 ? `${count}` : '' });
		chrome.action.setBadgeBackgroundColor({ color: '#dc2626' });
	} catch (e) {
		console.error('❌ PR取得失敗:', e);
		chrome.action.setBadgeText({ text: '!' });
	}
}
