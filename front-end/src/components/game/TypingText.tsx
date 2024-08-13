import { useEffect, useRef, useState } from 'react';

interface TypingTextProps {
    text: string;
    frame: number;
    className: string;
    afterFunc?: () => void;
}

const TypingText = ({ text, frame, className, afterFunc }: TypingTextProps) => {
    const [typingText, setTypingText] = useState('');
    const textIndex = useRef(0);
    useEffect(() => {
        let timer = setInterval(() => {
            setTypingText((state) => {
                if (text.length <= textIndex.current) {
                    if (text.length === textIndex.current) {
                        {
                            afterFunc && afterFunc();
                            textIndex.current += 1;
                        }
                    }
                    return state;
                }
                const newState = text.slice(0, textIndex.current);
                textIndex.current += 1;
                return newState;
            });
        }, frame);
        return () => clearInterval(timer);
    }, [text]);
    return <p className={className}>{typingText}</p>;
};

export default TypingText;
