interface GenderAndBirthAndLocationProps {
    count: number;
}
import { MemberInfoDTO } from '@apis/types/request';
import Radio from '@components/common/radio/Radio';
import RadioGroup from '@components/common/radio/RadioGroup';

import { GENDER, LOCATION } from '@components/mypage/SignupConstants';
import SingleTag from '@components/mypage/SingleTag';
import SingleTagGroup from '@components/mypage/SingleTagGroup';
import useForm from '@hooks/useForm';
import signupValidate from '@utils/signupValidate';
import Select from 'react-select';

interface GenderAndBirthAndLocationProps {
    onNext: (data: any) => void;
    registData: MemberInfoDTO;
}

const GenderAndBirthAndLocation = ({ onNext, registData }: GenderAndBirthAndLocationProps) => {
    const locations = LOCATION.map((location) => ({ label: location.name, value: location.code }));
    const years = Array.from({ length: 100 }, (_, idx) => ({ label: `${2022 - idx}년`, value: 2022 - idx }));
    const { values, messages, valids, handleChange, handleSubmit } = useForm({
        initialValues: registData,
        onSubmit: onNext,
        validate: signupValidate,
    });

    return (
        <div className="flex flex-col items-center gap-3">
            <RadioGroup label="성별" name="gender" onChange={handleChange} value={values.gender}>
                {GENDER.map((gender) => (
                    <Radio key={gender.param} value={gender.param} className="  has-[:checked]:bg-lightPurple-2 ">
                        {gender.text}
                    </Radio>
                ))}
            </RadioGroup>

            <Select options={years} className="w-full" placeholder="태어난 연도" />
            <Select options={locations} placeholder="지역" className="w-full" />
        </div>
    );
};

export default GenderAndBirthAndLocation;
