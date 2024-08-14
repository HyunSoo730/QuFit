interface EmptyVideoProps {
    roomMax?: number;
}

const EmptyVideo = ({ roomMax }: EmptyVideoProps) => {
    let widthClass = '';

    switch (roomMax) {
        case 8:
            widthClass = 'w-1/4';
            break;
        case 6:
            widthClass = 'w-1/3';
            break;
        case 4:
            widthClass = 'w-1/2';
            break;
        case 2:
            widthClass = 'w-full';
            break;
        default:
            console.log('Invalid roomMax value');
            break;
    }

    return <div className={`${widthClass} bg-white aspect-video rounded-xl opacity-20`}></div>;
};

export default EmptyVideo;
