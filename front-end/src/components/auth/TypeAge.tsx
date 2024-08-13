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
            backgroundColor: 'inherit', // 클릭 시 기본 배경색으로 설정
            color: state.isSelected ? 'white' : 'black',
        },
    }),
};

const TypeAge = ({ onNext, registData} : SignUpProps) => {
    const { handleSubmit, handleSelectChange } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });


    const age = Array.from({ length: 100 }, (_, idx) => ({ label: idx, value: idx }));
    return (
        <>
            <div className="flex justify-end w-full">
                <div className="flex flex-col w-full gap-4">
                    <Select
                        styles={customSelectStyles}
                        options={age}
                        onChange={(e) => handleSelectChange(e, 'typeAgeMax')}
                        className="w-full"
                        placeholder="몇살 위까지 원하나요?"
                    />
                    <Select
                     styles={customSelectStyles}
                        options={age}
                        onChange={(e) => handleSelectChange(e, 'typeAgeMin')}
                        className="w-full"
                        placeholder="몇살 아래까지 원하나요?"
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

export default TypeAge;