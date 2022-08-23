import { RefObject, useEffect, useState } from 'react';
import webgazer from '../utils/webgazer';

export default function useGazeTracker(containerRef: RefObject<HTMLElement>) {
    const [gaze, setGaze] = useState({ detected: false, col: 0, row: 0 });

    useEffect(() => {
        const listener = webgazer.setGazeListener((data) => {
            if (!data || !containerRef.current) {
                return;
            }

            const {
                offsetHeight: containerHeight,
                offsetWidth: containerWidth,
                offsetTop: containerTop,
                offsetLeft: containerLeft,
            } = containerRef.current;

            const { x, y } = data;

            const col = Math.floor((3 * (x - containerLeft)) / containerWidth);
            const row = Math.floor((3 * (y - containerTop)) / containerHeight);

            setGaze({
                col: col < 0 ? 0 : col,
                row: row < 0 ? 0 : row,
                detected: true,
            });
        });

        listener.begin();

        return () => listener.end();
    }, []);

    return gaze;
}
