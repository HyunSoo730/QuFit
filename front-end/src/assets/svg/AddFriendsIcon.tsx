import type { SVGProps } from 'react';
const SvgAddFriendsIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 900 900" {...props}>
        <g filter="url(#AddFriendsIcon_svg__a)" shapeRendering="crispEdges">
            <rect
                width={500}
                height={500}
                x={250}
                y={150}
                fill="url(#AddFriendsIcon_svg__b)"
                fillOpacity={0.3}
                rx={250}
            />
            <rect
                width={494}
                height={494}
                x={253}
                y={153}
                stroke="url(#AddFriendsIcon_svg__c)"
                strokeWidth={6}
                rx={247}
            />
        </g>
        <path
            stroke="#fff"
            strokeWidth={4}
            d="m568.947 450.823-1.227 1.579 1.227-1.579C549.081 435.376 524.735 427 499.686 427s-49.394 8.376-69.261 23.823c-16.144 12.553-28.597 29.205-36.173 48.154-3.149 7.876 1.014 16.99 8.537 19.032 63.789 17.321 130.005 17.321 193.794 0 7.525-2.042 11.686-11.157 8.537-19.032l-1.857.743 1.857-.743c-7.576-18.947-20.029-35.601-36.173-48.154ZM562.396 338c0 33.06-27.951 60-62.605 60s-62.605-26.94-62.605-60 27.951-60 62.605-60 62.605 26.94 62.605 60ZM645.67 431.632l-1.257-1.555 1.257 1.555c1.142-.922 2.335-1.864 3.559-2.831 5.354-4.227 11.306-8.926 16.178-14.55 6.054-6.988 10.593-15.554 10.593-26.755 0-11.314-6.244-21.105-15.23-25.315-8.688-4.071-19.559-2.765-29.27 6.623-9.711-9.388-20.582-10.694-29.27-6.623-8.986 4.21-15.23 14.001-15.23 25.315 0 11.201 4.539 19.767 10.593 26.755 4.872 5.624 10.824 10.323 16.178 14.55 1.224.967 2.417 1.909 3.559 2.831 2.188 1.768 4.461 3.59 6.747 4.959 2.284 1.368 4.778 2.409 7.423 2.409s5.139-1.041 7.423-2.409c2.286-1.369 4.559-3.191 6.747-4.959Z"
        />
        <defs>
            <linearGradient
                id="AddFriendsIcon_svg__b"
                x1={750}
                x2={250}
                y1={150}
                y2={650}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#E7FBFF" />
                <stop offset={0.496} stopColor="#fff" />
                <stop offset={1} stopColor="#DBFBFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient
                id="AddFriendsIcon_svg__c"
                x1={250}
                x2={750}
                y1={150}
                y2={650}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#00F0FF" stopOpacity={0.2} />
                <stop offset={0.072} stopColor="#00F0FF" stopOpacity={0.03} />
                <stop offset={0.461} stopColor="#fff" stopOpacity={0.3} />
                <stop offset={0.539} stopColor="#fff" stopOpacity={0.03} />
                <stop offset={0.89} stopColor="#97E5FE" stopOpacity={0} />
                <stop offset={0.974} stopColor="#00D1FF" stopOpacity={0.3} />
            </linearGradient>
            <filter
                id="AddFriendsIcon_svg__a"
                width={900}
                height={900}
                x={0}
                y={0}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation={15} />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_940_1725" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx={-50} dy={50} />
                <feGaussianBlur stdDeviation={100} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0.380784 0 0 0 0 0.00392157 0 0 0 0 0.611765 0 0 0 0.15 0" />
                <feBlend in2="effect1_backgroundBlur_940_1725" result="effect2_dropShadow_940_1725" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_940_1725" result="shape" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx={-5} dy={-5} />
                <feGaussianBlur stdDeviation={10} />
                <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
                <feBlend in2="shape" result="effect3_innerShadow_940_1725" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy={4} />
                <feGaussianBlur stdDeviation={100} />
                <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
                <feColorMatrix values="0 0 0 0 0.38 0 0 0 0 0 0 0 0 0 1 0 0 0 0.2 0" />
                <feBlend in2="effect3_innerShadow_940_1725" result="effect4_innerShadow_940_1725" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy={10} />
                <feGaussianBlur stdDeviation={25} />
                <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                <feBlend in2="effect4_innerShadow_940_1725" result="effect5_innerShadow_940_1725" />
            </filter>
        </defs>
    </svg>
);
export default SvgAddFriendsIcon;
