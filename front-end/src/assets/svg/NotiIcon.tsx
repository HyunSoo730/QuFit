import type { SVGProps } from 'react';
const SvgNotiIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 45" {...props}>
        <rect width={43.998} height={43.998} y={0.247} fill="#fff" fillOpacity={0.4} rx={12.222} />
        <g clipPath="url(#NotiIcon_svg__a)">
            <path
                fill="#fff"
                d="M12.269 32.577h19.458c1.166 0 1.854-.752 1.854-1.857 0-1.534-1.24-2.916-2.308-4.281-.81-1.06-1.032-3.238-1.117-5.003-.099-5.892-1.339-9.959-4.616-11.432-.455-1.995-1.731-3.59-3.536-3.59-1.817 0-3.081 1.595-3.548 3.59-3.265 1.473-4.517 5.54-4.603 11.432-.098 1.765-.307 3.944-1.13 5.003-1.056 1.365-2.308 2.747-2.308 4.281 0 1.105.7 1.857 1.854 1.857m5.99 2.087c.148 2.24 1.658 4.112 3.745 4.112 2.075 0 3.585-1.872 3.744-4.112z"
            />
        </g>
        <defs>
            <clipPath id="NotiIcon_svg__a">
                <path fill="#fff" d="M7.332 7.635h29.332v29.221H7.332z" />
            </clipPath>
        </defs>
    </svg>
);
export default SvgNotiIcon;
