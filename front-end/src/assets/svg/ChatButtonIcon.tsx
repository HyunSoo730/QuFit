import type { SVGProps } from 'react';
const SvgChatButtonIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 45 45" {...props}>
        <g filter="url(#ChatButtonIcon_svg__a)">
            <rect width={44.166} height={43.998} x={0.332} y={0.248} fill="#fff" fillOpacity={0.1} rx={12.222} />
        </g>
        <rect width={42.166} height={41.998} x={1.332} y={1.248} stroke="#EDB6F4" strokeWidth={2} rx={11.222} />
        <path
            fill="#fff"
            d="M22.415 32.839c5.872 0 10.632-4.742 10.632-10.592s-4.76-10.592-10.632-10.592c-5.873 0-10.633 4.742-10.633 10.592 0 1.694.4 3.296 1.11 4.716.188.377.251.809.142 1.216l-.634 2.358c-.274 1.023.665 1.96 1.693 1.686l2.367-.631a1.74 1.74 0 0 1 1.22.142 10.6 10.6 0 0 0 4.735 1.105"
        />
        <path
            fill="#F997EC"
            d="M17.63 21.303c0 1.45 1.403 2.97 2.689 4.06.876.743 1.314 1.114 2.096 1.114s1.22-.371 2.096-1.114c1.286-1.09 2.689-2.61 2.689-4.06 0-2.836-2.632-3.894-4.785-1.704-2.153-2.19-4.785-1.132-4.785 1.704"
        />
        <defs>
            <filter
                id="ChatButtonIcon_svg__a"
                width={44.166}
                height={43.998}
                x={0.332}
                y={0.248}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation={5} />
                <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
                <feBlend in2="shape" result="effect1_innerShadow_477_4284" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation={15} />
                <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
                <feColorMatrix values="0 0 0 0 0.976471 0 0 0 0 0.592157 0 0 0 0 0.92549 0 0 0 1 0" />
                <feBlend in2="effect1_innerShadow_477_4284" result="effect2_innerShadow_477_4284" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation={5} />
                <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
                <feBlend in2="effect2_innerShadow_477_4284" result="effect3_innerShadow_477_4284" />
            </filter>
        </defs>
    </svg>
);
export default SvgChatButtonIcon;
