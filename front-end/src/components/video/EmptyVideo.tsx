interface EmptyVideoProps {
    roomMax?: number;
}

const EmptyVideo = ({ roomMax }: EmptyVideoProps) => {
    return <div className={`w-full bg-white aspect-video rounded-xl opacity-20`}></div>;
};

export default EmptyVideo;
