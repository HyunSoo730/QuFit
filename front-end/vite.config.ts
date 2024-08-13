import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
    server: {
        port: 3000,
    },
    resolve: {
        alias: [
            { find: '@', replacement: '/src' },
            { find: '@apis', replacement: '/src/apis' },
            { find: '@assets', replacement: '/src/assets' },
            { find: '@components', replacement: '/src/components' },
            { find: '@dummy', replacement: '/src/dummy' },
            { find: '@hooks', replacement: '/src/hooks' },
            { find: '@modals', replacement: '/src/modals' },
            { find: '@pages', replacement: '/src/pages' },
            { find: '@queries', replacement: '/src/queries' },
            { find: '@routers', replacement: '/src/routers' },
            { find: '@stores', replacement: '/src/stores' },
            { find: '@utils', replacement: '/src/utils' },
        ],
    },
});
