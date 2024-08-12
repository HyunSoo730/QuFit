import { MemberInfoDTO } from '@apis/types/request';
import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';

import { GENDER, LOCATION } from '@components/mypage/SignupConstants';

import useForm from '@hooks/useForm';
import { SignUpProps } from '@pages/SignupPage';
import signupValidate from '@utils/signupValidate';
import { useEffect } from 'react';
import Select from 'react-select';

const GenderAndBirthAndLocation = ({ onNext, registData }: SignUpProps) => {
    const locations = LOCATION.map((location) => ({ label: location.name, value: location.code }));
    const years = Array.from({ length: 100 }, (_, idx) => ({ label: `${2022 - idx}년`, value: 2022 - idx }));
    const { values, messages, valids, handleChange, handleSubmit, handleSelectChange } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <div className="flex flex-col items-center gap-3">
            <RadioGroup label="성별" name="gender" onChange={handleChange} value={values.gender}>
                {GENDER.map((gender) => (
                    <Radio key={gender.param} value={gender.param} className="  has-[:checked]:bg-lightPurple-2 ">
                        {gender.text}
                    </Radio>
                ))}
            </RadioGroup>
            <Select
                options={years}
                onChange={(e) => handleSelectChange(e, 'birthYear')}
                className="w-full"
                placeholder="태어난 연도"
            />
            <Select
                options={locations}
                onChange={(e) => handleSelectChange(e, 'locationId')}
                placeholder="지역"
                className="w-full"
            />{' '}
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
