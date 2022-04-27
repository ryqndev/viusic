import { useState } from 'react';

const useMouseActions = (canvasRef: any, setNotes: any) => {
    const [showContextMenu, setShowContextMenu] = useState(false);

    const getBox = (event: any) => {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        return [Math.floor(x / 72), Math.floor(y / 16)];
    }

    const rightClick = (event: any) => {
        event.preventDefault();
        // const [i, j] = getBox(event);
    };

    const leftClick = (event: any) => {
        // save current state in track db
        // play the sound
        const canvas = canvasRef.current as HTMLCanvasElement | null;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const [i, j] = getBox(event);
        setNotes((prevNotes: any) => {
            let newNotes = [...prevNotes];
            if(j >= newNotes.length || i >= newNotes[j].length) return prevNotes;

            newNotes[j][i] = (newNotes[j][i] + 1) % 2;
            return newNotes;
        });
    };

    return {
        leftClick,
        rightClick,
        showContextMenu,
    }
}

export default useMouseActions;
