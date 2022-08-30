import React, { useRef, useState } from 'react';

import { EXTERNALS } from './config/constants';

import useGazeTracker from './hooks/useGazeTracker';
import Grid from './components/Grid/Grid';
import Link from './components/Link/Link';
import ConfigModal from './components/ConfigModal/ConfigModal';
import CalibrateModal from './components/CalibrateModal/CalibrateModal';
import LoadingModal from './components/LoadingModal/LoadingModal';
import DetectModal from './components/DetectModal/DetectModal';

import COMPUTER_VISION from './assets/computer-vision.png';
import GITHUB from './assets/github.svg';
import './App.scss';

type ConfigType = { rows: number; cols: number };

enum STEPS {
    CONFIG = 'CONFIG',
    PRE_CALIBRATE = 'PRE_CALIBRATE',
    CALIBRATE = 'CALIBRATE',
    PRE_DETECT = 'PRE_DETECT',
    DETECT = 'DETECT',
}

export default function App() {
    const gridContainerRef = useRef(null);
    const [step, setStep] = useState(STEPS.CONFIG);
    const [config, setConfig] = useState<ConfigType>({
        rows: 0,
        cols: 0,
    });

    const { train, start, loading, gaze, trainer } = useGazeTracker(
        gridContainerRef,
        config
    );

    function handleConfigDone() {
        setStep(STEPS.PRE_CALIBRATE);
        start();
    }

    function handleCalibrateSkip() {
        setStep(STEPS.DETECT);
    }

    function handleCalibrateOkay() {
        setStep(STEPS.CALIBRATE);
        train(() => setStep(STEPS.PRE_DETECT));
    }

    function handleGridConfigChange(config: ConfigType) {
        setConfig(config);
    }

    function handleDetectionOkay() {
        setStep(STEPS.DETECT);
    }

    const showConfigModal = step === STEPS.CONFIG;
    const showLoadingModal = step === STEPS.PRE_CALIBRATE && loading;
    const showCalibrateModal = step === STEPS.PRE_CALIBRATE && !loading;
    const showDetectModal = step === STEPS.PRE_DETECT;

    return (
        <main className='container'>
            <ConfigModal
                show={showConfigModal}
                onDone={handleConfigDone}
                value={config}
                onChange={handleGridConfigChange}
            />

            <LoadingModal show={showLoadingModal} />
            <CalibrateModal
                show={showCalibrateModal}
                onOkay={handleCalibrateOkay}
                onSkip={handleCalibrateSkip}
            />
            <DetectModal show={showDetectModal} onOkay={handleDetectionOkay} />
            <div className='container__content'>
                <Grid
                    gaze={gaze}
                    trainer={trainer}
                    config={config}
                    gridContainerRef={gridContainerRef}
                />
            </div>
            <label className='container__credits'>
                By{' '}
                <Link
                    className='container__credits-link'
                    href={EXTERNALS.LINKEDIN}>
                    ErAz7
                </Link>
            </label>

            <Link
                className={`
                    container__footer-link
                    container__footer-link--github
                `}
                href={EXTERNALS.GITHUB}>
                <GITHUB className='container__footer-link-logo' /> Github Repo
            </Link>

            <div className='container__title'>
                <img src={COMPUTER_VISION} className='container__title-logo' />
                Gaze Tracking
            </div>
        </main>
    );
}
