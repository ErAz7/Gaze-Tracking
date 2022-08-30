import React from 'react';

import isTouchDevice from 'is-touch-device';
import packageInfo from '../../package.json';

export const WEBFONT_CONFIG = {
    google: {
        families: [
            'Montserrat:300',
            'Montserrat:400',
            'Montserrat:500',
            'Montserrat:600',
            'Montserrat:700',
            'Montserrat:800',
            'Montserrat:900',
        ],
    },
};

export const EXTERNALS = {
    LINKEDIN: 'https://www.linkedin.com/in/erfan-azary-a564b0187/',
    GITHUB: packageInfo.homepage,
};

export const TRAINER_GAZE_DURATION = 5;

export const IS_TOUCH_DEVICE = isTouchDevice();

export const TEXTS = {
    CALIBRATE: {
        MOUSE: 'Please stare at the red area while clicking on it, until the next red area is shown',
        TOUCH: 'Please stare at the red area while tapping on it, until the next red area is shown',
    },
    LOADING: 'Loading gaze detection...',
    CONFIG: 'Select the grid layout',
    DETECT: (
        <>
            Well done!
            <br />
            Now, enjoy computer vision!
        </>
    ),
};
