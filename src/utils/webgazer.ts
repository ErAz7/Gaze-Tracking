export type WebgazerType = {
    setGazeListener: (callback: (data: { x: number; y: number }) => void) => {
        begin: () => void;
        end: () => void;
    };
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
