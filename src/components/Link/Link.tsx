import React, { AnchorHTMLAttributes } from 'react';
import './Link.scss';

export type ValueType = { cols: number; rows: number };

export type PropTypes = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link(props: PropTypes): JSX.Element {
    const { className, ...rest } = props;

    return (
        <a
            className={`
                ${className}
                Link
            `}
            target='_blank'
            rel='noreferrer'
            {...rest}
        />
    );
}
