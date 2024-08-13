import TextBio from '@components/auth/TextBio';
import { MBTI } from '@components/mypage/SignupConstants';
import useForm from '@hooks/useForm';
import { SignUpProps } from '@pages/SignupPage';
import signupValidate from '@utils/signupValidate';
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

const MBTIAndBio = ({ onNext, registData }: SignUpProps) => {
    const { values, handleChange, handleSubmit, handleSelectChange } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });
    const mbti = MBTI.map((mbti) => ({ value: mbti['tag_name'], label: mbti['tag_name'] }));
    return (
        <>
            <div className="flex flex-col justify-end w-full gap-5">
                <Select
                    styles={customSelectStyles}
                    options={mbti}
                    onChange={(e) => handleSelectChange(e, 'memberMBTITag')}
                    className="w-full"
                    placeholder="MBTI를 골라주세요"
                />
                <TextBio name="bio" label={'자기소개'} value={values.bio} onChange={handleChange} rows={10} />
                <div className="flex justify-end w-full">
                <button className="flex items-center text-white rounded-full min-w-20 max-w-28 h-9 px-9 bg-pink">
                    <p className="w-full" onClick={handleSubmit}>
                        다음
                    </p>
                </button>
                </div>
            </div>
        </>
    );
};

export default MBTIAndBio;
