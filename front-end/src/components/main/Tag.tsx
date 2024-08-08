interface TagProps {
    tag: string;
    isList: boolean;
}

const Tag = ({ tag, isList }: TagProps) => {
    return (
        <div className="flex items-center justify-center mr-2.5 bg-white bg-opacity-30 rounded-full px-2.5 h-7 lg:px-4 lg:h-6 lg:mr-1.5">
            <span className="text-sm font-medium text-left text-white truncate">{isList ? `# ${tag}` : `${tag}`}</span>
        </div>
    );
};

export default Tag;
