import { ReactNode } from 'react';

interface MessageProps {
    valid: boolean;
    children: ReactNode;
}

const Message = ({ valid, children }: MessageProps) => {
    return <p className={`mt-1 text-xs ${valid ? 'text-white text-opacity-65' : 'text-white text-opacity-25'}`}>{children}</p>;
};

export default Message;
