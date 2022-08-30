import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import Button from '../Button/Button';
import './Modal.scss';

export type PropTypes = {
    className?: string;
    children: ReactNode;
    show: boolean;
    buttons?: ({ text: string } & ButtonHTMLAttributes<HTMLButtonElement>)[];
};

export default function Modal(props: PropTypes): JSX.Element | null {
    const { className, children, show, buttons, ...rest } = props;

    if (!show) {
        return null;
    }

    return (
        <div
            className={`
                ${className}
                Modal
            `}
            {...rest}>
            <div className='Modal__overlay' />
            <div className='Modal__content'>
                <div className='Modal__content-body'>{children}</div>

                {buttons && (
                    <div className='Modal__content-buttons'>
                        {buttons.map(({ text, ...restOfButton }, index) => (
                            <Button
                                key={index}
                                className='Modal__content-buttons-item'
                                {...restOfButton}>
                                {text}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
