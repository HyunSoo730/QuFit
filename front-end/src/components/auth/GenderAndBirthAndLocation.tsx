import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';

import { GENDER, LOCATION } from '@components/mypage/SignupConstants';

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
const GenderAndBirthAndLocation = ({ onNext, registData }: SignUpProps) => {
    const locations = LOCATION.map((location) => ({ label: location.name, value: location.code }));
    const years = Array.from({ length: 100 }, (_, idx) => ({ label: `${2022 - idx}년`, value: 2022 - idx }));
    const { values, handleChange, handleSubmit, handleSelectChange } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });

    return (
        <div className="flex flex-col gap-5">
            <RadioGroup label="성별" name="gender" onChange={handleChange} value={values.gender}>
                {GENDER.map((gender) => (
                    <Radio key={gender.param} value={gender.param} className="mr-1 px-5 py-1 rounded-2xl border-2 border-black/30 has-[:checked]:text-pink has-[:checked]:border-pink has-[:checked]:bg-pink/10">
                        {gender.text}
                    </Radio>
                ))}
            </RadioGroup>
            <Select
                styles={customSelectStyles}
                options={years}
                onChange={(e) => handleSelectChange(e, 'birthYear')}
                className="w-full focus:border-pink"
                placeholder="태어난 연도"
            />
            <Select
                styles={customSelectStyles}
                options={locations}
                onChange={(e) => handleSelectChange(e, 'locationId')}
                placeholder="지역"
                className="w-full"
            />
            <div className="flex justify-end w-full">
                <button className="flex items-center text-white rounded-full min-w-20 max-w-28 h-9 px-9 bg-pink">
                    <p className="w-full" onClick={handleSubmit}>
                        다음
                    </p>
                </button>
            </div>
        </div>
    );
};

export default GenderAndBirthAndLocation;
