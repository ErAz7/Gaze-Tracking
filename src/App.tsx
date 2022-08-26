import React, { useRef, useState } from 'react';

import { EXTERNALS } from './config';

import useGazeTracker from './hooks/useGazeTracker';
import Detection from './components/Detection/Detection';
import Config from './components/Config/Config';

import COMPUTER_VISION from './assets/computer-vision.png';
import GITHUB from './assets/github.svg';
import './App.scss';

type ConfigType = { rows: number; cols: number };

export default function App() {
    const gridContainerRef = useRef(null);
    const [showConfig, setShowConfig] = useState(true);
    const [step, setStep] = useState(0);
    const [config, setConfig] = useState<ConfigType>({
        rows: 0,
        cols: 0,
    });

    const {
        gaze: { row: gazeRow, col: gazeCol },
        loading: gazeLoading,
    } = useGazeTracker(gridContainerRef, config);

    function handleNextStep() {
        setStep(step + 1);
    }

    function handleGridConfigChange(config: ConfigType) {
        setConfig(config);
    }

    function handleConfigHide() {
        setShowConfig(false);
    }

    function renderContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <Detection
                        gaze={{
                            row: gazeRow,
                            col: gazeCol,
                        }}
                        config={config}
                        gridContainerRef={gridContainerRef}
                    />
                );
        }
    }

    return (
        <main className='container'>
            <Config
                show={showConfig}
                onHide={handleConfigHide}
                value={config}
                onChange={handleGridConfigChange}
            />
            <div className='container__content'>{renderContent(step)}</div>
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
