import { useEffect, useState } from 'react';
import { XIcon } from '@assets/svg/chat';
import { FilterIcon } from '@assets/svg/main';
import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';
import { Hobbies, Personalities } from '@dummy/Tags';
import useTagFilterStore from '@stores/video/tagFilterStore';

interface SideBarProps {
    isOpenSideBar: boolean;
    setIsOpenSideBar: (isOpen: boolean) => void;
}

const SideBar = ({ isOpenSideBar, setIsOpenSideBar }: SideBarProps) => {
    const [isOpen, setIsOpen] = useState(isOpenSideBar);
    const [tagState, setTagState] = useState('hobby');

    // 스토어
    const hobbyTagsId = useTagFilterStore((state) => state.hobbyTagsId);
    const setHobbyTagsId = useTagFilterStore((state) => state.setHobbyTagsId);

    const idealTypeTagsId = useTagFilterStore((state) => state.idealTypeTagsId);
    const setIdealTypeTagsId = useTagFilterStore((state) => state.setIdealTypeTagsId);

    const tags = useTagFilterStore((state) => state.tags);
    const setTags = useTagFilterStore((state) => state.setTags);

    const handleClose = () => {
        setIsOpen(false);

        setTimeout(() => {
            setIsOpenSideBar(false);
        }, 500);
    };

    const handleOnClickButton = (type: string, tagId: number, tag: string) => {
        if (type === 'hobby') {
            if (hobbyTagsId.includes(tagId)) {
                setHobbyTagsId(hobbyTagsId.filter((id) => id !== tagId));
            } else if (hobbyTagsId.length < 5) {
                setHobbyTagsId([...hobbyTagsId, tagId]);
            }

            if (tags.includes(tag)) {
                setTags(tags.filter((prop) => prop !== tag));
            } else if (tags.length < 10 && hobbyTagsId.length < 5) {
                setTags([...tags, tag]);
            }
        } else if (type === 'idealType') {
            if (idealTypeTagsId.includes(tagId)) {
                setIdealTypeTagsId(idealTypeTagsId.filter((id) => id !== tagId));
            } else if (idealTypeTagsId.length < 5) {
                setIdealTypeTagsId([...idealTypeTagsId, tagId]);
            }

            if (tags.includes(tag)) {
                setTags(tags.filter((prop) => prop !== tag));
            } else if (tags.length < 10 && idealTypeTagsId.length < 5) {
                setTags([...tags, tag]);
            }
        }
    };

    useEffect(() => {
        console.log(hobbyTagsId, idealTypeTagsId, tags);
    }, [hobbyTagsId, idealTypeTagsId, tags]);

    return (
        <div
            className={`h-full flex flex-col bg-smokeWhite rounded-l-3xl w-96 px-10 ${
                isOpen ? 'animate-fadeInRight' : 'animate-fadeOutRight'
            }`}
        >
            <div>
                <div className="flex items-center justify-between mt-8">
                    <div className="flex">
                        <FilterIcon className="w-5 stroke-black" />
                        <p className="ml-1 text-xl font-medium text-black pb-0.5">태그 필터</p>
                    </div>
                    <button onClick={handleClose}>
                        <XIcon className="w-10 pb-2 opacity-30 fill-black" />
                    </button>
                </div>
                <p className="font-medium text-sm whitespace-pre-wrap text-black text-opacity-60 mt-1.5">
                    선택한 태그가 포함된 방을 보여줘요.
                </p>
                <p className="mb-4 text-sm font-medium text-black whitespace-pre-wrap text-opacity-40">
                    (최대 5개씩 선택 가능)
                </p>
            </div>
            <RadioGroup value={tagState} name="tagState" onChange={(e) => setTagState(e.target.value)}>
                <Radio
                    value="hobby"
                    className="px-5 py-1 mr-3 rounded-full w-fit border border-black border-opacity-30 text-black has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                >
                    취미
                </Radio>
                <Radio
                    value="idealType"
                    className="px-5 py-1 mr-3 rounded-full w-fit border border-black border-opacity-30 text-black has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                >
                    이상형
                </Radio>
            </RadioGroup>
            <p className="mt-6 mb-1 ml-auto mr-2 text-xs font-medium text-black text-opacity-70">
                <span className="font-bold text-black">{tags.length}</span> / 10
            </p>
            <div className="flex flex-wrap w-full px-2 pt-2 bg-white rounded-lg bg-opacity-40">
                {tags.length === 0 && (
                    <p className="pb-2 my-1 ml-2 text-xs text-black opacity-30">태그를 선택해 보세요.</p>
                )}
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center mr-1.5 rounded-lg pl-2.5 pr-3.5 h-7 mb-2 bg-black bg-opacity-5"
                    >
                        <p className="text-sm font-medium text-left text-black truncate">
                            <span className="text-black opacity-40">#</span> {tag}
                        </p>
                    </div>
                ))}
            </div>

            {tagState === 'hobby' ? (
                <div className="flex flex-col w-full overflow-y-auto scrollbar-hide">
                    <div className="flex flex-col mt-4">
                        {Hobbies.map((hobby, index) => (
                            <div key={index}>
                                <p className="font-medium text-black mb-2.5">{hobby.category}</p>
                                <div className="flex flex-wrap mb-6">
                                    {hobby.tags.map((tag, tagIndex) => (
                                        <button
                                            key={tagIndex}
                                            onClick={() => handleOnClickButton('hobby', tag.tag_id, tag.tag_name)}
                                            className={`px-3 py-1 rounded-full text-sm  text-black mr-2.5 mb-2 ${
                                                hobbyTagsId.includes(tag.tag_id)
                                                    ? 'bg-pink bg-opacity-70 text-white'
                                                    : 'bg-black bg-opacity-5 text-opacity-80'
                                            }`}
                                        >
                                            {tag.tag_name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col w-full overflow-y-auto scrollbar-hide">
                    <div className="flex flex-col mt-4">
                        {Personalities.map((personality, index) => (
                            <div key={index}>
                                <p className="font-medium text-black mb-2.5">{personality.category}</p>
                                <div className="flex flex-wrap mb-6">
                                    {personality.tags.map((tag, tagIndex) => (
                                        <button
                                            key={tagIndex}
                                            onClick={() => handleOnClickButton('idealType', tag.tag_id, tag.tag_name)}
                                            className={`px-3 py-1 rounded-full text-sm text-black mr-2.5 mb-2 ${
                                                idealTypeTagsId.includes(tag.tag_id)
                                                    ? 'bg-pink bg-opacity-70 text-white'
                                                    : 'bg-black bg-opacity-5 text-opacity-80'
                                            }`}
                                        >
                                            {tag.tag_name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideBar;
