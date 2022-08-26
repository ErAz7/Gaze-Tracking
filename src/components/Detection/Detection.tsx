import React, { Ref } from 'react';
import './Detection.scss';

export type PropTypes = {
    className?: string;
    gaze: {
        row: number | null;
        col: number | null;
    };
    gridContainerRef: Ref<HTMLDivElement>;
    config: { rows: number; cols: number };
};

export default function Detection(props: PropTypes): JSX.Element {
    const { className, gaze, gridContainerRef, config } = props;
    const { row: gazeRow, col: gazeCol } = gaze;

    return (
        <div
            className={`
                ${className}
                Detection
            `}>
            <div
                ref={gridContainerRef}
                className='Detection__grid'
                style={{
                    gridTemplate: `repeat(${config.rows}, 1fr) / repeat(${config.cols}, 1fr)`,
                }}>
                {Array.from(Array(config.rows)).map((rowVal, rowIndex) =>
                    Array.from(Array(config.cols)).map((colVal, colIndex) => (
                        <div
                            className={`
                                    Detection__grid-cell
                                    ${
                                        gazeRow === rowIndex &&
                                        gazeCol === colIndex
                                            ? 'Detection__grid-cell--gazed'
                                            : ''
                                    }
                                `}
                            key={`${colIndex}-${rowIndex}`}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
