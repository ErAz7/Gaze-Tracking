import { RefObject, useEffect, useRef, useState } from 'react';
import webgazer, { SetGazeListenerType } from '../utils/webgazer';
import { TRAINER_GAZE_DURATION } from '../config/constants';

type CellType = {
    col: number;
    row: number;
};

type NullableCellType = {
    col: number | null;
    row: number | null;
};

export default function useGazeTracker(
    containerRef: RefObject<HTMLElement>,
    config: { cols: number; rows: number }
) {
    const [loading, setLoading] = useState(true);
    const [training, setTraining] = useState(false);
    const [trainerTrigger, setTrainerTrigger] = useState(false);
    const [lastCorrectGaze, setLastCorrectGaze] = useState<number>();
    const [gaze, setGaze] = useState<NullableCellType>({
        col: null,
        row: null,
    });
    const [trainer, setTrainer] = useState<NullableCellType>({
        col: null,
        row: null,
    });
    const configRef = useRef(config);
    const listenerRef = useRef<ReturnType<SetGazeListenerType> | null>(null);
    const intervalRef = useRef<number>();
    const trainerCallbackRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        configRef.current = config;
    }, [config]);

    useEffect(() => {
        if (!training) {
            return;
        }

        if (gaze.row === trainer.row && gaze.col === trainer.col) {
            if (!lastCorrectGaze) {
                setLastCorrectGaze(performance.now());

                return;
            }

            if (
                performance.now() - lastCorrectGaze >=
                TRAINER_GAZE_DURATION * 1000
            ) {
                const nextCell = getNextCell(trainer);

                if (!nextCell) {
                    return;
                }

                if (nextCell === true) {
                    if (trainerCallbackRef.current) {
                        trainerCallbackRef.current();
                    }

                    trainerCallbackRef.current = null;

                    clearInterval(intervalRef.current);

                    setTraining(false);
                    setTrainer({ col: null, row: null });
                    setLastCorrectGaze(undefined);

                    return;
                }

                setTrainer(nextCell);
            }
        } else {
            setLastCorrectGaze(undefined);
        }
    }, [trainerTrigger, training, trainer, gaze, lastCorrectGaze]);

    function start() {
        if (listenerRef.current) {
            listenerRef.current.end();
        }

        const listener = webgazer.setGazeListener((data) => {
            if (!data) {
                return;
            }

            setGaze(getGaze(data));
            setLoading(false);
        });

        listener.begin();

        listenerRef.current = listener;
    }

    function end() {
        if (!listenerRef.current) {
            return;
        }

        listenerRef.current.end();

        listenerRef.current = null;
    }

    function train(callback: () => void) {
        trainerCallbackRef.current = callback;

        setTraining(true);
        setTrainer({ col: 0, row: 0 });

        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(
            () => setTrainerTrigger(!trainerTrigger),
            500
        );
    }

    function getGaze(pos: { x: number; y: number }): NullableCellType {
        if (!containerRef.current) {
            return { col: null, row: null };
        }

        const {
            offsetHeight: containerHeight,
            offsetWidth: containerWidth,
            offsetTop: containerTop,
            offsetLeft: containerLeft,
        } = containerRef.current;
        const { x, y } = pos;
        const col = Math.floor(
            (configRef.current.cols * (x - containerLeft)) / containerWidth
        );
        const row = Math.floor(
            (configRef.current.rows * (y - containerTop)) / containerHeight
        );

        return {
            col: col < 0 ? 0 : col,
            row: row < 0 ? 0 : row,
        };
    }

    function getNextCell(cell: NullableCellType): CellType | boolean {
        const { col, row } = cell;

        if ((!col && col !== 0) || (!row && row !== 0) || !configRef.current) {
            return false;
        }

        const { cols, rows } = configRef.current;
        const goNextRow = col === cols - 1;

        if (goNextRow && row === rows - 1) {
            return true;
        }

        const nextCol = goNextRow ? 0 : col + 1;
        const nextRow = goNextRow ? row + 1 : row;

        return {
            row: nextRow,
            col: nextCol,
        };
    }

    return {
        start,
        train,
        end,
        loading,
        training,
        gaze,
        trainer,
    };
}
