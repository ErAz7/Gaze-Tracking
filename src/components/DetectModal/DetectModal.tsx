import React from 'react';
import Modal from '../Modal/Modal';
import { TEXTS } from '../../config/constants';
import './DetectModal.scss';

export type ValueType = { cols: number; rows: number };

export type PropTypes = {
    className?: string;
    show: boolean;
    onOkay: () => void;
};

export default function DetectModal(props: PropTypes): JSX.Element {
    const { className, show, onOkay } = props;

    return (
        <Modal
            className={`
                ${className}
                DetectModal
            `}
            show={show}
            buttons={[{ text: 'Alright!', onClick: onOkay }]}>
            <span className='DetectModal__text'>{TEXTS.DETECT}</span>
        </Modal>
    );
}
