import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: '../backend-tenner/public',
		emptyOutDir: true,
		chunkSizeWarningLimit: 1000,
	},
})
