import React from 'react';
import Modal from '../Modal/Modal';
import { IS_TOUCH_DEVICE, TEXTS } from '../../config/constants';
import './CalibrateModal.scss';

export type ValueType = { cols: number; rows: number };

export type PropTypes = {
    className?: string;
    show: boolean;
    onOkay: () => void;
    onSkip: () => void;
};

export default function CalibrateModal(props: PropTypes): JSX.Element {
    const { className, show, onOkay, onSkip } = props;

    const buttons = [
        { text: 'Ok', onClick: onOkay },
        { text: 'Skip Calibration', onClick: onSkip },
    ];

    return (
        <Modal
            className={`
                ${className}
                CalibrateModal
            `}
            show={show}
            buttons={buttons}>
            <span className='CalibrateModal__text'>
                {IS_TOUCH_DEVICE
                    ? TEXTS.CALIBRATE.TOUCH
                    : TEXTS.CALIBRATE.MOUSE}
            </span>
        </Modal>
    );
}
