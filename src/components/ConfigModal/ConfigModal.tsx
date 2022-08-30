import React, { ChangeEvent, ChangeEventHandler } from 'react';
import Select from '../Select/Select';
import Modal from '../Modal/Modal';
import { TEXTS } from '../../config/constants';
import './ConfigModal.scss';

export type ValueType = { cols: number; rows: number };

export type PropTypes = {
    className?: string;
    show: boolean;
    onDone: () => void;
    value: ValueType;
    onChange: (value: ValueType) => void;
};

export default function ConfigModal(props: PropTypes): JSX.Element {
    const { className, value, show, onDone, onChange } = props;
    const { cols, rows } = value;

    function handleRowChange(isCols: boolean) {
        return (e: ChangeEvent<HTMLSelectElement>) => {
            const newAxisValue = e.currentTarget.value;
            const newValue = { ...value };

            if (isCols) {
                newValue.cols = parseInt(newAxisValue);
            } else {
                newValue.rows = parseInt(newAxisValue);
            }

            onChange(newValue);
        };
    }

    function renderSelect(
        selectedValue: number,
        label: string,
        changeHandler: ChangeEventHandler<HTMLSelectElement>
    ) {
        return (
            <Select
                className='ConfigModal__select-item'
                value={selectedValue}
                onChange={changeHandler}>
                <option disabled={true} value={0}>
                    {label}
                </option>
                {Array.from(Array(16)).map((_, index) => (
                    <option key={index} value={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </Select>
        );
    }

    const doneDisabled = !rows || !cols;

    const buttons = [{ text: 'Done', onClick: onDone, disabled: doneDisabled }];

    return (
        <Modal
            className={`
                ${className}
                ConfigModal
            `}
            show={show}
            buttons={buttons}>
            <span className='ConfigModal__text'>{TEXTS.CONFIG}</span>
            <div className='ConfigModal__select'>
                {renderSelect(cols, 'Columns', handleRowChange(true))}
                <span className='ConfigModal__select-separator'>X</span>
                {renderSelect(rows, 'Rows', handleRowChange(false))}
            </div>
        </Modal>
    );
}
