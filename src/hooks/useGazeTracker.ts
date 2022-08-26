import { RefObject, useEffect, useRef, useState } from 'react';
import webgazer from '../utils/webgazer';

export type GazeType = {
    col: number | null;
    row: number | null;
};

export default function useGazeTracker(
    containerRef: RefObject<HTMLElement>,
    config: { cols: number; rows: number }
) {
    const [loading, setLoading] = useState(true);
    const [gaze, setGaze] = useState<GazeType>({ col: null, row: null });
    const configRef = useRef(config);

    useEffect(() => {
        configRef.current = config;
    }, [config]);

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
                (configRef.current.cols * (x - containerLeft)) / containerWidth
            );
            const row = Math.floor(
                (configRef.current.rows * (y - containerTop)) / containerHeight
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
