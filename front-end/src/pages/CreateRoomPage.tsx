import { BackIcon, BoxIcon, FireWorkLeft, FireWorkRight } from '@assets/svg/main';
import { Hobbies, Personalities } from '@dummy/Tags';
import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';
import RoomCard from '@components/main/RoomCard';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoom from '@hooks/useRoom';
import { useSetRoomMaxStore } from '@stores/video/roomStore';

const CreateRoomPage = () => {
    const navigate = useNavigate();

    const { createRoom } = useRoom();
    const setRoomMax = useSetRoomMaxStore();

    const scrollRef = useRef<HTMLDivElement>(null);

    const [roomTitle, setRoomTitle] = useState('');

    const [roomSize, setRoomSize] = useState('');
    const [tagState, setTagState] = useState('');
    const [topPriorityTagState, setTopPriorityTagState] = useState('');

    const [hobbyTagsId, setHobbyTagsId] = useState<number[]>([]);
    const [hobbyTags, setHobbyTags] = useState<string[]>([]);

    const [idealTypeTagsId, setIdealTypeTagsId] = useState<number[]>([]);
    const [idealTypeTags, setIdealTypeTags] = useState<string[]>([]);

    const onChangeRoomTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 30) {
            e.target.value = e.target.value.slice(0, 30);
        }

        setRoomTitle(e.target.value);
    };

    const handleOnClickButton = (type: string, tagId: number, tag: string) => {
        if (type === 'hobby') {
            setHobbyTagsId((prev) => {
                if (prev.includes(tagId)) {
                    return prev.filter((id) => id !== tagId);
                } else if (prev.length < 5) {
                    return [...prev, tagId];
                } else {
                    return prev;
                }
            });
            setHobbyTags((prev) => {
                if (prev.includes(tag)) {
                    return prev.filter((prop) => prop !== tag);
                } else if (prev.length < 5) {
                    return [...prev, tag];
                } else {
                    return prev;
                }
            });
        } else if (type === 'idealType') {
            setIdealTypeTagsId((prev) => {
                if (prev.includes(tagId)) {
                    return prev.filter((id) => id !== tagId);
                } else if (prev.length < 5) {
                    return [...prev, tagId];
                } else {
                    return prev;
                }
            });
            setIdealTypeTags((prev) => {
                if (prev.includes(tag)) {
                    return prev.filter((prop) => prop !== tag);
                } else if (prev.length < 5) {
                    return [...prev, tag];
                } else {
                    return prev;
                }
            });
        }
    };

    // 방만들기 API 연결하기

    useEffect(() => {
        if (tagState === 'none') {
            setHobbyTagsId([]);
            setIdealTypeTagsId([]);
            setHobbyTags([]);
            setIdealTypeTags([]);
            setTopPriorityTagState('');
        } else if (tagState === 'hobby') {
            setIdealTypeTagsId([]);
            setIdealTypeTags([]);
            setTopPriorityTagState('');
        } else if (tagState === 'idealType') {
            setHobbyTagsId([]);
            setHobbyTags([]);
            setTopPriorityTagState('');
        }
    }, [tagState]);

    useEffect(() => {
        const tags = [...hobbyTags, ...idealTypeTags];

        if (tags.includes(topPriorityTagState)) {
            return;
        } else {
            setTopPriorityTagState('');
        }
    }, [hobbyTags, idealTypeTags]);

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        if (roomSize.length > 0 && tagState.length > 0) {
            scrollToBottom();
        }
    }, [roomSize, tagState]);

    useEffect(() => {
        console.log(
            '1순위:',
            topPriorityTagState,
            '취미:',
            hobbyTagsId,
            hobbyTags,
            '이상형:',
            idealTypeTagsId,
            idealTypeTags,
        );
    }, [topPriorityTagState, hobbyTagsId, idealTypeTagsId]);

    return (
        <div className="absolute flex flex-col w-full h-full px-16 py-12 ">
            {/* 이전으로 */}
            <button onClick={() => navigate(-1)} className="flex items-center mb-8">
                <BackIcon className="w-5 h-5 mr-2.5" />
                <span className="text-xl opacity-80 text-smokeWhite">이전으로</span>
            </button>

            <div className="w-full h-full overflow-y-auto scrollbar-hide">
                <div className="flex items-center mb-14">
                    <BoxIcon className="w-9 h-9 mr-2.5" />
                    <span className="text-4xl font-bold opacity-80 text-smokeWhite">방 만들기</span>
                </div>
                {/* 방 제목 입력 */}
                <div className="relative">
                    <input
                        type="text"
                        value={roomTitle}
                        onChange={onChangeRoomTitle}
                        maxLength={30}
                        placeholder="✏️  방 제목을 입력해 주세요. 입력하지 않으면 기본 설정이 적용됩니다."
                        className="w-full h-32 px-8 text-xl text-left bg-white outline-none bg-opacity-15 rounded-3xl text-smokeWhite placeholder:text-smokeWhite placeholder:text-opacity-70"
                    />
                    <p className="absolute text-xl font-medium text-black right-8 bottom-5 text-opacity-60">
                        <span className="font-bold text-black">{roomTitle.length}</span> / 30
                    </p>
                </div>

                {/* 인원수, 태그 선택 유무 */}
                <div className="flex flex-col w-full mt-10 bg-white py-11 px-9 h-80 rounded-3xl bg-opacity-15">
                    <div>
                        <div className="flex items-center mb-7">
                            <p className="text-2xl font-medium text-smokeWhite mr-3.5">
                                미팅 참여 인원을 선택해 주세요!
                            </p>
                            <span className="rounded-full bg-smokeWhite px-2.5 font-bold h-5 text-black text-sm items-center flex">
                                필수
                            </span>
                        </div>
                        <RadioGroup value={roomSize} name="roomSize" onChange={(e) => setRoomSize(e.target.value)}>
                            <Radio
                                value="2"
                                className="px-5 py-1.5 mr-3 rounded-full w-fit border border-smokeWhite border-opacity-30 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                            >
                                2 : 2
                            </Radio>
                            <Radio
                                value="3"
                                className="px-5 py-1.5 mr-3 rounded-full w-fit border border-smokeWhite border-opacity-30 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                            >
                                3 : 3
                            </Radio>
                            <Radio
                                value="4"
                                className="px-5 py-1.5 mr-3 rounded-full w-fit border border-smokeWhite border-opacity-30 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                            >
                                4 : 4
                            </Radio>
                        </RadioGroup>

                        <div className="w-full h-px mb-10 mt-7 bg-smokeWhite opacity-30" />
                    </div>
                    <div className="flex items-center mb-7">
                        <p className="text-2xl font-medium text-smokeWhite mr-3.5">태그 설정을 하시겠어요?</p>
                        <span className="rounded-full bg-smokeWhite px-2.5 font-bold h-5 text-black text-sm items-center flex">
                            필수
                        </span>
                    </div>
                    <RadioGroup value={tagState} name="tagState" onChange={(e) => setTagState(e.target.value)}>
                        <Radio
                            value="hobby"
                            className="px-5 py-1.5 mr-3 rounded-full w-fit border border-smokeWhite border-opacity-30 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                        >
                            취미만 고르기
                        </Radio>
                        <Radio
                            value="idealType"
                            className="px-5 py-1.5 mr-3 rounded-full w-fit border border-smokeWhite border-opacity-30 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                        >
                            이상형만 고르기
                        </Radio>
                        <Radio
                            value="both"
                            className="px-5 py-1.5 mr-3 rounded-full w-fit border border-smokeWhite border-opacity-30 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                        >
                            둘 다 고르기
                        </Radio>
                        <Radio
                            value="none"
                            className="px-5 py-1.5 mr-3 rounded-full w-fit border border-smokeWhite border-opacity-30 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                        >
                            안할래요
                        </Radio>
                    </RadioGroup>
                </div>

                <div ref={scrollRef} />

                {roomSize.length > 0 && tagState.length > 0 ? (
                    <>
                        {/* 취미 선택 */}
                        {tagState === 'hobby' || tagState === 'both' ? (
                            <div className="flex flex-col w-full pb-10 mt-10 bg-white pt-11 px-9 rounded-3xl bg-opacity-15">
                                <p className="text-2xl font-medium text-smokeWhite mr-3.5">
                                    어떤 취미를 가진 상대를 원하세요?
                                </p>
                                <p className="font-medium text-smokeWhite text-opacity-60 mt-1.5">
                                    원하는 태그를 골라주세요. (최대 5개)
                                </p>
                                <div className="flex flex-col mt-10">
                                    {Hobbies.map((hobby, index) => (
                                        <div key={index}>
                                            <p className="font-medium text-smokeWhite mb-2.5">{hobby.category}</p>
                                            <div className="flex flex-wrap mb-6">
                                                {hobby.tags.map((tag, tagIndex) => (
                                                    <button
                                                        key={tagIndex}
                                                        onClick={() =>
                                                            handleOnClickButton('hobby', tag.tag_id, tag.tag_name)
                                                        }
                                                        className={`px-3 py-1 rounded-full  text-smokeWhite mr-2.5 mb-2 ${
                                                            hobbyTagsId.includes(tag.tag_id)
                                                                ? 'bg-pink bg-opacity-70'
                                                                : 'bg-smokeWhite bg-opacity-20'
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
                            <></>
                        )}

                        {/* 이상형 선택 */}
                        {tagState === 'idealType' || tagState === 'both' ? (
                            <div className="flex flex-col w-full pb-10 mt-10 bg-white pt-11 px-9 rounded-3xl bg-opacity-15">
                                <p className="text-2xl font-medium text-smokeWhite mr-3.5">
                                    어떤 성격을 가진 상대가 이상형인가요?
                                </p>
                                <p className="font-medium text-smokeWhite text-opacity-60 mt-1.5 mb-10">
                                    원하는 태그를 골라주세요. (최대 5개)
                                </p>
                                <div className="flex flex-wrap">
                                    {Personalities.map((personality, index) => (
                                        <div key={index}>
                                            <p className="font-medium text-smokeWhite mb-2.5">{personality.category}</p>
                                            <div className="flex flex-wrap mb-6">
                                                {personality.tags.map((tag, tagIndex) => (
                                                    <button
                                                        key={tagIndex}
                                                        onClick={() =>
                                                            handleOnClickButton('idealType', tag.tag_id, tag.tag_name)
                                                        }
                                                        className={`px-3 py-1 rounded-full text-smokeWhite mr-2.5 mb-2 ${
                                                            idealTypeTagsId.includes(tag.tag_id)
                                                                ? 'bg-pink bg-opacity-70'
                                                                : 'bg-smokeWhite bg-opacity-20'
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
                            <></>
                        )}

                        {/* 1순위 태그 선택 */}
                        {tagState !== 'none' ? (
                            <div className="flex flex-col w-full mt-10 bg-white pb-9 pt-11 px-9 rounded-3xl bg-opacity-15">
                                <p className="text-2xl font-medium text-smokeWhite mr-3.5">
                                    1순위 태그를 선택해 주세요!
                                </p>
                                <p className="font-medium text-smokeWhite text-opacity-60 mt-1.5 mb-10">
                                    고른 태그중, 가장 중요하다 생각하는 태그를 1개 선택해 주세요 .
                                </p>
                                <RadioGroup
                                    value={topPriorityTagState}
                                    name="topPriorityTagState"
                                    onChange={(e) => setTopPriorityTagState(e.target.value)}
                                >
                                    <div className="flex flex-wrap">
                                        <Radio
                                            value=""
                                            className="px-5 py-1.5 mr-3 mb-4 rounded-full w-fit border border-smokeWhite border-opacity-30 bg-white bg-opacity-5 text-opacity-70 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                                        >
                                            선택 안함
                                        </Radio>
                                        <div className="w-px mr-3 bg-white rounded-full h-9 opacity-30" />
                                        {hobbyTags.map((tag, index) => (
                                            <Radio
                                                key={index}
                                                value={tag}
                                                className="px-5 py-1.5 mr-3 mb-4 rounded-full w-fit border border-smokeWhite border-opacity-30 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                                            >
                                                {tag}
                                            </Radio>
                                        ))}
                                        {idealTypeTags.map((tag, index) => (
                                            <Radio
                                                key={index}
                                                value={tag}
                                                className="px-5 py-1.5 mr-3 mb-4  rounded-full w-fit border border-smokeWhite border-opacity-30 text-smokeWhite has-[:checked]:text-pink has-[:checked]:bg-pink has-[:checked]:bg-opacity-5 has-[:checked]:border-pink"
                                            >
                                                {tag}
                                            </Radio>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        ) : (
                            <></>
                        )}

                        {/* 카드 미리보기 */}
                        <div className="flex flex-col items-center justify-center w-full mt-10 bg-white h-96 py-11 rounded-3xl bg-opacity-15">
                            <p className="text-2xl font-medium text-smokeWhite">이렇게 방이 만들어져요.</p>
                            <p className="font-medium text-smokeWhite opacity-60 mt-2.5 mb-10">
                                담기지 않은 태그는 상세정보에서 보일거니까 걱정말아요!
                            </p>
                            <div className="flex">
                                <FireWorkLeft className="w-40 mr-14" />
                                <div className="w-96">
                                    <RoomCard
                                        id={0}
                                        title={roomTitle.length === 0 ? '✨ 큐핏의 화살을 맞은 방' : roomTitle}
                                        hobbyTags={hobbyTags}
                                        personalityTags={idealTypeTags}
                                        mainTag={topPriorityTagState}
                                        maxParticipants={parseInt(roomSize)}
                                        curMCount={0}
                                        curWCount={0}
                                        isButton={false}
                                    />
                                </div>
                                <FireWorkRight className="w-40 ml-14" />
                            </div>
                        </div>

                        {/* 방 만들기 버튼 */}
                        <div className="flex w-full my-10">
                            <button
                                onClick={() => {
                                    setRoomMax(parseInt(roomSize));
                                    createRoom({
                                        videoRoomName: roomTitle,
                                        maxParticipants: parseInt(roomSize),
                                        mainTag: topPriorityTagState,
                                        videoRoomHobbies: hobbyTagsId,
                                        videoRoomPersonalities: idealTypeTagsId,
                                    });
                                }}
                                className="px-12 py-6 ml-auto text-2xl font-bold text-white bg-opacity-70 bg-pink rounded-xl"
                            >
                                방 만들기
                            </button>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default CreateRoomPage;
