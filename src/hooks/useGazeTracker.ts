import { RefObject, useEffect, useState } from 'react';
import webgazer from '../utils/webgazer';

export type GazeType = {
    col: number | null;
    row: number | null;
};

export default function useGazeTracker(
    containerRef: RefObject<HTMLElement>,
    grid: { cols: number; rows: number }
) {
    const [loading, setLoading] = useState(true);
    const [gaze, setGaze] = useState<GazeType>({ col: null, row: null });

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
                (grid.cols * (x - containerLeft)) / containerWidth
            );
            const row = Math.floor(
                (grid.rows * (y - containerTop)) / containerHeight
            );

            setGaze({
                col: col < 0 ? 0 : col,
                row: row < 0 ? 0 : row,
            });
            setLoading(false);
        });

        listener.begin();

        return () => listener.end();
    }, []);

    return {
        loading,
        gaze,
    };
}
