/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_GITHUB_CLIENT_ID: string;
	readonly VITE_GITHUB_REDIRECT_URI: string;
	readonly VITE_GITHUB_CLIENT_SECRET: string;
	readonly VITE_SERVER_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
