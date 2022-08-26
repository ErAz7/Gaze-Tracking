import React, { ChangeEvent, ChangeEventHandler } from 'react';
import Button from '../Button/Button';
import Select from '../Select/Select';
import './Config.scss';

export type ValueType = { cols: number; rows: number };

export type PropTypes = {
    className?: string;
    show: boolean;
    onHide: () => void;
    value: ValueType;
    onChange: (value: ValueType) => void;
};

export default function Config(props: PropTypes): JSX.Element {
    const { className, value, show, onHide, onChange } = props;
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
                className='Config__select-item'
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

    return (
        <div
            className={`
                ${className}
                Config
                ${show ? 'Config--show' : ''}
            `}>
            <span className='Config__text'>Select the grid layout</span>
            <div className='Config__select'>
                {renderSelect(cols, 'Columns', handleRowChange(true))}
                <span className='Config__select-separator'>X</span>
                {renderSelect(rows, 'Rows', handleRowChange(false))}
            </div>
            <Button className='Config__button' onClick={onHide}>
                Done
            </Button>
        </div>
    );
}
