import React, { ButtonHTMLAttributes } from 'react';
import './Button.scss';

export type ValueType = { cols: number; rows: number };

export type PropTypes = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: PropTypes): JSX.Element {
    const { className, ...rest } = props;

    return (
        <button
            className={`
                ${className}
                Button
            `}
            {...rest}
        />
    );
}
