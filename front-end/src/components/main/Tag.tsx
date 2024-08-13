interface TagProps {
    tag: string;
    isList: boolean;
    isMainTag?: boolean;
    idx?: number;
}

const Tag = ({ tag, isList, isMainTag, idx }: TagProps) => {
    return (
        <div
            className={`flex items-center justify-center mr-2.5 rounded-full px-2.5 h-7 ${
                isMainTag && idx === 0 ? 'bg-pink bg-opacity-70' : 'bg-white bg-opacity-30 '
            } lg:px-4 lg:h-6 lg:mr-1.5`}
        >
            <span className="text-sm font-medium text-left text-white truncate">{isList ? `# ${tag}` : `${tag}`}</span>
        </div>
    );
};

export default Tag;
