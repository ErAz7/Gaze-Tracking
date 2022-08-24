import { RefObject, useEffect, useState } from 'react';
import webgazer from '../utils/webgazer';

export default function useGazeTracker(
    containerRef: RefObject<HTMLElement>,
    grid: { col: number; row: number }
) {
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

            const col = Math.floor(
                (grid.col * (x - containerLeft)) / containerWidth
            );
            const row = Math.floor(
                (grid.row * (y - containerTop)) / containerHeight
            );

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
