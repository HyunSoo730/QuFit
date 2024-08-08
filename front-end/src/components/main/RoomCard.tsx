import Tag from './Tag';
import { FemaleIcon, MaleIcon } from '@assets/svg/main';

interface RoomCardProps {
    id: string;
    title: string;
    tags: string[];
}

const RoomCard = ({ title, tags }: RoomCardProps) => {
    return (
        <button className="relative flex items-center w-full h-52 rounded-3xl effect-pureWhite hover:effect-pink lg:h-52 lg:rounded-2xl">
            <div className="absolute z-10 flex flex-col justify-between w-full h-full px-6 pt-4 pb-6 lg:px-4 lg:py-5">
                <div>
                    <h1 className="h-16 pt-1 text-xl font-medium text-left text-white line-clamp-2 text-ellipsis lg:text-base lg:h-12">
                        {title}
                    </h1>
                    <div className="w-[calc(100%+0.625rem)] flex flex-wrap mt-3.5 overflow-hidden max-h-7 lg:max-h-6 lg:w-[calc(100%+0.375rem)]">
                        {tags.length > 0 ? (
                            tags.map((tag, index) => <Tag key={index} tag={tag} isList={true} />)
                        ) : (
                            <Tag tag="누구든 좋아 🩷" isList={false} />
                        )}
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="flex mr-10 lg:mr-8">
                        <div className="flex items-center justify-center rounded-full w-7 h-7 bg-smokeWhite lg:w-6 lg:h-6">
                            <MaleIcon className="h-5 lg:h-4" />
                        </div>
                        <p className="ml-4 text-xl font-medium text-smokeWhite lg:text-base lg:ml-2.5">3 / 4</p>
                    </div>
                    <div className="flex">
                        <div className="flex items-center justify-center rounded-full w-7 h-7 bg-smokeWhite lg:w-6 lg:h-6">
                            <FemaleIcon className="h-5 lg:h-4" />
                        </div>
                        <p className="ml-4 text-xl font-medium text-smokeWhite lg:text-base lg:ml-2.5">1 / 4</p>
                    </div>
                </div>
            </div>
            <div className="z-0 w-full h-52 rounded-3xl bg-whitePink opacity-30 hover:opacity-10 lg:h-52 lg:rounded-2xl" />
        </button>
    );
};

export default RoomCard;
