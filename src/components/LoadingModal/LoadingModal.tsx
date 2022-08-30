import React from 'react';
import Modal from '../Modal/Modal';
import { TEXTS } from '../../config/constants';
import './LoadingModal.scss';

export type ValueType = { cols: number; rows: number };

export type PropTypes = {
    className?: string;
    show: boolean;
};

export default function LoadingModal(props: PropTypes): JSX.Element {
    const { className, show } = props;

    return (
        <Modal
            className={`
                ${className}
                LoadingModal
            `}
            show={show}>
            <span className='LoadingModal__text'>{TEXTS.LOADING}</span>
        </Modal>
    );
}
