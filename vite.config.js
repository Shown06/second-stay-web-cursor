import { resolve } from 'path';
import { defineConfig } from 'vite';

// GitHub Pages ではサブパス公開のため base を設定（Actions で VITE_BASE_PATH を渡す）
export default defineConfig({
    base: process.env.VITE_BASE_PATH || '/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                admin: resolve(__dirname, 'admin.html'),
            },
        },
    },
});
