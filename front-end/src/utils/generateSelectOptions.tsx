const generateSelectOptions = (start: number, end: number) => {
    const options = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return options.map((option) => ({
        value: option.toString(),
        label: option.toString(),
    }));
};

export default generateSelectOptions;
