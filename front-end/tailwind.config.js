import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            xs: { max: '767px' },
            sm: { min: '768px', max: '1023px' },
            md: { min: '1024px', max: '1279px' },
            lg: { min: '1280px', max: '1439px' },
            xl: '1920px',
        },
        colors: {
            white: '#fff',
            smokeWhite: '#EAE7EE',
            black: '#1D0430',
            darkBlack: '#340544',
            pink: '#F997EC',
            purple: '#CA63E3',
            lightPurple: {
                1: '#DBBEEA',
                2: '#EDB6F4',
                3: '#E7BEF1',
                4: '#F7D6FB',
                5: '#E5D1F9',
                6: '#FCB5F6',
                7: '#F3E9FF',
            },
            darkPurple: '#7B7183',
            gray: '#1F1F1F',
            transparent: 'transparent',
        },
        extend: {
            keyframes: {
                choice: {
                    from: { width: '100%' },
                    to: { width: '0' },
                },
            },
            animation: {
                choice: 'choice 6s',
            },
            backgroundImage: {
                mainPageBg: "url('@assets/png/mainPageBg.png')",
                bluePurple:
                    'linear-gradient(to bottom left,rgba(145, 202, 247, 1) 0%, rgba(218, 153, 226, 1) 88%,rgba(252, 132, 222, 1) 100%)',
                whitePink:
                    'linear-gradient(to bottom left,rgba(255, 231, 239, 1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
                hotPink:
                    'linear-gradient(to bottom left,rgba(249,151,236,1) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(249,151,236,1) 100%)',
                indyBlue:
                    'linear-gradient(to bottom left,rgba(167,162,229,1) 0%, rgba(255, 255, 255, 1) 50%, rgba(167,162,229,0) 100%)',
            },

            aspectRatio: {
                layout: '1.6 / 1',
                header: '13 / 1',
                video: '355/260',
                gameBg: '916/496',
            },

            fontFamily: {
                barlow: ['Barlow Condensed', 'sans-serif'],
            },

            transitionProperty: {
                width: 'width',
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
