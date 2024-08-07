import { ReactNode } from 'react';

interface MessageProps {
    valid: boolean;
    children: ReactNode;
}

const Message = ({ valid, children }: MessageProps) => {
    return <p className={`text-lg ${valid ? 'text-black' : 'text-pink'}`}>{children}</p>;
};

export default Message;
