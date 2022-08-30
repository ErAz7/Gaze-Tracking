import React, { Ref } from 'react';
import './Grid.scss';

type CellType = {
    row: number | null;
    col: number | null;
};

export type PropTypes = {
    className?: string;
    gaze: CellType;
    trainer: CellType;
    gridContainerRef: Ref<HTMLDivElement>;
    config: { rows: number; cols: number };
};

export default function Grid(props: PropTypes): JSX.Element {
    const { className, gaze, gridContainerRef, config, trainer } = props;

    return (
        <div
            className={`
                ${className}
                Grid
            `}>
            <div
                ref={gridContainerRef}
                className='Grid__grid'
                style={{
                    gridTemplate: `repeat(${config.rows}, 1fr) / repeat(${config.cols}, 1fr)`,
                }}>
                {Array.from(Array(config.rows)).map((rowVal, rowIndex) =>
                    Array.from(Array(config.cols)).map((colVal, colIndex) => {
                        const gazed =
                            gaze.row === rowIndex && gaze.col === colIndex;
                        const trained =
                            trainer.row === rowIndex &&
                            trainer.col === colIndex;

                        return (
                            <div
                                className={`
                                    Grid__grid-cell
                                    ${gazed ? 'Grid__grid-cell--primary' : ''}
                                    ${
                                        trained
                                            ? 'Grid__grid-cell--secondary'
                                            : ''
                                    }
                                `}
                                key={`${colIndex}-${rowIndex}`}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
