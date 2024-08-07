interface TagProps {
    tag: string;
}

const Tag = ({ tag }: TagProps) => {
    return (
        <div className="flex items-center justify-center mb-2 mr-3 border-2 rounded-full max-w-36 border-lightPurple-6 effect-hotPink px-7 h-7 lg:px-4 lg:h-6 lg:mr-1.5">
            <span className="z-10 font-medium text-left text-white truncate lg:text-sm"># {tag}</span>
            <div className="absolute z-0 w-full h-full rounded-full bg-hotPink opacity-40" />
        </div>
    );
};

export default Tag;
