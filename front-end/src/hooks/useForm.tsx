import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';

export type Valids = { [key: string]: boolean };
export type Messages = { [key: string]: string };

interface FormProps<T> {
    initialValues: T;
    onSubmit: (values: T) => void;
    validate?: (values: T) => { valids: Valids; messages: Messages };
}

const useForm = <T,>({ initialValues, onSubmit, validate }: FormProps<T>) => {
    const [values, setValues] = useState(initialValues);
    const [messages, setMessages] = useState<Messages>({});
    const [valids, setValids] = useState<Valids>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setValues(initialValues);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const fieldset = event.target.closest('fieldset');
        const name = fieldset ? fieldset.getAttribute('name')! : event.target.name;
        const newValue =
            event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;

        setValues({ ...values, [name]: newValue });

        if (validate) {
            const result = validate({ ...values, [name]: newValue });
            setMessages(result.messages);
            setValids(result.valids);
        }
    };

    const handleSelectChange = (event: SingleValue<any>, name: string) => {
        const newValue = event.value;

        setValues({ ...values, [name]: newValue });

        if (validate) {
            const result = validate({ ...values, [name]: newValue });
            setMessages(result.messages);
            setValids(result.valids);
        }
    };
    const handleMultiValueChange = (event: MultiValue<any>, name: string) => {
        const newValue = event.map((value: { value: any }) => value.value);

        setValues({ ...values, [name]: newValue });

        if (validate) {
            const result = validate({ ...values, [name]: newValue });
            setMessages(result.messages);
            setValids(result.valids);
        }
    };

    const handleCheckboxGroupChange = (name: string, selectedValues: string[]) => {
        const newValues = { ...values, [name]: selectedValues };
        setValues(newValues);

        if (validate) {
            const result = validate(newValues);
            setMessages(result.messages);
            setValids(result.valids);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const curSubmitting = !submitting;
        setSubmitting(true);
        await new Promise((r) => setTimeout(r, 1000));
        if (curSubmitting) {
            onSubmit(values);
        }
    };

    useEffect(() => {
        if (submitting) {
            onSubmit(values);
        }
        setSubmitting(false);
    }, [values]);

    return {
        values,
        submitting,
        messages,
        valids,
        handleChange,
        handleSelectChange,
        handleCheckboxGroupChange,
        handleMultiValueChange,
        handleSubmit,
    };
};

export default useForm;
