import { resolve } from 'path';
import { defineConfig } from 'vite';

// GitHub Pages ではサブパス公開のため base を設定（Actions で VITE_BASE_PATH を渡す）
export default defineConfig({
    base: process.env.VITE_BASE_PATH || '/',
    build: {
        rollupOptions: {
            input: {
                main:       resolve(__dirname, 'index.html'),
                facilities: resolve(__dirname, 'facilities/index.html'),
                blog:       resolve(__dirname, 'blog/index.html'),
                company:    resolve(__dirname, 'company/index.html'),
                contact:    resolve(__dirname, 'contact/index.html'),
                access:     resolve(__dirname, 'access/index.html'),
            },
        },
    },
});
