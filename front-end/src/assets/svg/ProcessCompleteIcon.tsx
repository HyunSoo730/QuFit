import * as React from 'react';
import type { SVGProps } from 'react';
const SvgProcessCompleteIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" {...props}>
        <path
            fill="#F997EC"
            d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10"
            opacity={0.5}
        />
        <path
            fill="#fff"
            d="M14.742 6.258a.88.88 0 0 1 0 1.248L8.859 13.39a.88.88 0 0 1-1.248 0l-2.353-2.353a.882.882 0 1 1 1.248-1.248l1.73 1.729 2.628-2.63 2.63-2.629a.88.88 0 0 1 1.248 0"
        />
    </svg>
);
export default SvgProcessCompleteIcon;
