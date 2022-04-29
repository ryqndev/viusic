import { useState, MouseEvent } from 'react';

const NOTES = ['b', 'a#', 'a', 'g#', 'g', 'f#', 'f', 'e', 'd#', 'd', 'c#', 'c'];
const KEY_HEIGHT = 16;
const MEASURE_WIDTH = 360;

const useMouseActions = (hi: string, range: number, setNotes: any, playNote: (note: string) => void) => {
    const [showContextMenu, setShowContextMenu] = useState(false);

    const rightClick = (event: MouseEvent) => {
        event.preventDefault();
        setNotes((prevNotes: any) =>
            getMappingLocationAndUse(
                prevNotes,
                event,
                () => new Array(2).fill(0)
            )
        );
    };

    const getMappingLocationAndUse = (
        prevNotes: any[],
        event: MouseEvent,
        action: (currentValue: number) => Array<any> | number
    ) => {
        // click [x,y] to note [i,j]
        let j = Math.floor(event.nativeEvent.offsetX / MEASURE_WIDTH),
            i = Math.floor(event.nativeEvent.offsetY / KEY_HEIGHT);

        // out of bounds somehow?
        if (i >= prevNotes.length || j >= prevNotes[i].length) return prevNotes;

        const newNotes = [...prevNotes];

        getMapping(event.nativeEvent.offsetX % MEASURE_WIDTH, MEASURE_WIDTH, newNotes[i], j, action);

        return newNotes;
    }

    const getMapping = (
        offsetX: number,
        width: number,
        notes: any[],
        noteIdx: number,
        action: (currentValue: number) => Array<any> | number
    ) => {
        if (!isNaN(notes[noteIdx])) {
            notes[noteIdx] = action(notes[noteIdx]);
            return;
        }
        const subdivisionWidth = width / notes[noteIdx].length;

        getMapping(
            offsetX % subdivisionWidth,
            subdivisionWidth,
            notes[noteIdx],
            Math.floor(offsetX / subdivisionWidth),
            action,
        );
    }


    const leftClick = (event: MouseEvent) => {
        // save current state in track db
        let i = Math.floor(event.nativeEvent.offsetY / KEY_HEIGHT);
        let octave = parseInt(hi.replace(/\D/g, ''));
        let idx = NOTES.indexOf(hi.replace(/[0-9]/g, '')) + i;

        const clicked = NOTES[idx % 12] + Math.ceil(octave - idx / 12);

        setNotes((prevNotes: any) =>
            getMappingLocationAndUse(
                prevNotes,
                event,
                note => {
                    if(note === 0) playNote(clicked);
                    return ++note % 2;
                }
            )
        );
    };

    return {
        leftClick,
        rightClick,
        showContextMenu,
        closeContextMenu: () => setShowContextMenu(false),
    }
}

export default useMouseActions;
