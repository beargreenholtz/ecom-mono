import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 80,
		open: true,
	},
	plugins: [svgr(), react(), eslintPlugin()],
	resolve: {
		alias: {
			'@/interfaces': '/src/interfaces',
			'@/ui': '/src/components/ui',
			'@/containers': '/src/components/containers',
			'@/layout': '/src/components/layout',
			'@/data': '/src/data',
			'@/utils': '/src/utils',
			'@/store': '/src/store',
			'@/images': '/src/assets/images',
			'@/assets': '/src/assets',
			'@/hooks': '/src/hooks',
			'@/models': '/src/models',
			'@/styles': '/src/styles',
			'@/types': '/src/types',
		},
	},
	css: {
		modules: {
			localsConvention: 'camelCase',
			generateScopedName: '[local]_[hash:base64:2]',
		},
	},
});
