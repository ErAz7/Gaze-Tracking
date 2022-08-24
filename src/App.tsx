import React, { useRef } from 'react';

import { EXTERNALS } from './config';

import COMPUTER_VISION from './assets/computer-vision.png';
import GITHUB from './assets/github.svg';
import useGazeTracker from './hooks/useGazeTracker';

import './App.scss';

const GRID = { col: 4, row: 4 };

export default function App() {
    const gridContainerRef = useRef<HTMLDivElement>(null);

    const {
        row: gazeRow,
        col: gazeCol,
        detected: gazeDetected,
    } = useGazeTracker(gridContainerRef, GRID);

    return (
        <main className='container'>
            <div className='container__content'>
                <div
                    ref={gridContainerRef}
                    className='container__content-grid'
                    style={{
                        gridTemplate: `repeat(${GRID.row}, 1fr) / repeat(${GRID.col}, 1fr)`,
                    }}>
                    {Array.from(Array(GRID.row)).map((rowVal, rowIndex) =>
                        Array.from(Array(GRID.col)).map((colVal, colIndex) => (
                            <div
                                className={`
                                    container__content-grid-cell
                                    ${
                                        gazeDetected &&
                                        gazeRow === rowIndex &&
                                        gazeCol === colIndex
                                            ? 'container__content-grid-cell--gazed'
                                            : ''
                                    }
                                `}
                                key={`${colIndex}-${rowIndex}`}
                            />
                        ))
                    )}
                </div>
            </div>

            <label className='container__credits'>
                By{' '}
                <a
                    className='container__credits-link'
                    href={EXTERNALS.LINKEDIN}
                    target='_blank'
                    rel='noreferrer'>
                    ErAz7
                </a>
            </label>

            <a
                className={`
                    container__footer-link
                    container__footer-link--github
                `}
                href={EXTERNALS.GITHUB}
                target='_blank'
                rel='noreferrer'>
                <GITHUB className='container__footer-link-logo' /> Github Repo
            </a>

            <div className='container__title'>
                <img src={COMPUTER_VISION} className='container__title-logo' />
                Gaze Tracking
            </div>
        </main>
    );
}
