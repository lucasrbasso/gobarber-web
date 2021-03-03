import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProp extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProp> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const { isFocused, setIsFocused } = useState(false);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container>
            {Icon && <Icon size={20} />}
            <input
                onFocus={setIsOnFocus(true)}
                onBlur={setIsOnFocus(false)}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
        </Container>
    );
};

export default Input;
