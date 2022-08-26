import React, { SelectHTMLAttributes } from 'react';
import './Select.scss';

export type ValueType = { cols: number; rows: number };

export type PropTypes = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: PropTypes): JSX.Element {
    const { className, ...rest } = props;

    return (
        <select
            className={`
                ${className}
                Select
            `}
            {...rest}
        />
    );
}
