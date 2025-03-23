import { useEffect, useState } from 'react';

export const BackgroundToggle = () => {
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		chrome.storage.local.get(['enableBackgroundFetch'], (result) => {
			setIsActive(result.enableBackgroundFetch ?? true);
		});
	}, []);

	const toggleFetch = () => {
		setIsActive(!isActive);
		chrome.storage.local.set({
			enableBackgroundFetch: !isActive,
		});
	};

	return (
		<div className="mb-5 flex items-center justify-between">
			<h2 className="font-bold text-md">バックグラウンドでPRを取得する：</h2>
			<label className="inline-flex cursor-pointer items-center">
				<input
					type="checkbox"
					className="peer sr-only"
					onChange={toggleFetch}
					checked={isActive}
				/>
				<div className='peer rtl:peer-checked:after:-translate-x-full relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[""] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 dark:peer-checked:bg-blue-600' />
			</label>
		</div>
	);
};
