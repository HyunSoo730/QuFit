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
            yellow: '#FFB746',
            transparent: 'transparent',
        },
        extend: {
            keyframes: {
                choice: {
                    from: { width: '100%' },
                    to: { width: '0' },
                },
                private: {
                    from: { width: '100%' },
                    to: { width: '0' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(100%)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeOutRight: {
                    '0%': { opacity: '1', transform: 'translateX(0)' },
                    '100%': { opacity: '0', transform: 'translateX(100%)' },
                },
            },
            animation: {
                choice: 'choice 6s',
                private: 'private 1800s',
                fadeInRight: 'fadeInRight 0.5s ease-in-out forwards',
                fadeOutRight: 'fadeOutRight 0.5s ease-in-out forwards',
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
            
            height: {
                videoFixed: '480px',
                videoMin: '360px', // 최소 높이 설정
            },
            aspectRatio: {
                layout: '1.6 / 1',
                header: '13 / 1',
                video: '4/3',
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
