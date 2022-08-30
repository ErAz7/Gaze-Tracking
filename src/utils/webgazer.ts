export type SetGazeListenerType = (
    callback: (data: { x: number; y: number }) => void
) => {
    begin: () => void;
    end: () => void;
};

export type WebgazerType = {
    setGazeListener: SetGazeListenerType;
    params: object;
};

declare global {
    interface Window {
        webgazer: WebgazerType;
    }
}

const webgazer = window.webgazer;

webgazer.params = {
    ...webgazer.params,
    showGazeDot: false,
    showVideo: false,
    showVideoPreview: false,
};

export default webgazer;
