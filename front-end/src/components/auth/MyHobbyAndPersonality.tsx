import { HOBBY, PERSONALITY } from '@components/mypage/SignupConstants';
import useForm from '@hooks/useForm';
import { SignUpProps } from '@pages/SignupPage';
import signupValidate from '@utils/signupValidate';
import { useEffect } from 'react';
import Select from 'react-select';
const customSelectStyles = {
    control: (baseStyles: any, state: { isFocused: any; }) => ({
        ...baseStyles,
        borderColor: state.isFocused ? '#F997EC' : 'lightgray',
        borderWidth: '2px',
        boxShadow: 'none',
        '&:hover': {
            borderColor: state.isFocused ? '#F997EC' : 'lightgray',
        },
    }),
    option: (baseStyles: any, state: { isFocused: any; isSelected: any; }) => ({
        ...baseStyles,
        backgroundColor: state.isFocused ? 'lightgray' : state.isSelected ? 'gray' : 'white',
        color: state.isSelected ? 'white' : 'black',
        ':active': {
            backgroundColor: 'inherit', 
            color: state.isSelected ? 'white' : 'black',
        },
    }),
};
const MyHobbyAndPersonality = ({ onNext, registData }: SignUpProps) => {
    const { values, handleSubmit, handleMultiValueChange } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });

    const hoobies = HOBBY.map((hobby) => ({ value: hobby['tag_name'], label: hobby['tag_name'] }));
    const personalities = PERSONALITY.map((personality) => ({
        value: personality['tag_name'],
        label: personality['tag_name'],
    }));
    useEffect(() => {
        console.log(values);
    }, [values]);
    return (
        <>
            <div className="flex justify-end w-full">
                <div className="flex flex-col w-full gap-4">
                    <Select 
                        styles={customSelectStyles}
                        isMulti={true}
                        options={hoobies}
                        onChange={(e) => handleMultiValueChange(e, 'memberHobbyTags')}
                        placeholder="취미를 골라주세요"
                        classNamePrefix="select"
                    />
                    <Select
                        styles={customSelectStyles}
                        isMulti={true}
                        options={personalities}
                        placeholder="성격을 골라주세요"
                        onChange={(e) => handleMultiValueChange(e, 'memberPersonalityTags')}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
            </div>
            <div className="flex justify-end w-full">
            <button className="flex items-center text-white rounded-full min-w-20 max-w-28 h-9 px-9 bg-pink">
                <p className="w-full" onClick={handleSubmit}>
                    다음
                </p>
            </button>
            </div>
        </>
    );
};

export default MyHobbyAndPersonality;
