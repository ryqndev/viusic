import { useState, MouseEvent, useEffect } from 'react';
import { Time } from 'tone/build/esm/core/type/Units';

const NOTES = ['b', 'a#', 'a', 'g#', 'g', 'f#', 'f', 'e', 'd#', 'd', 'c#', 'c'];
const KEY_HEIGHT = 16;
const MEASURE_WIDTH = 360;

interface ContextMenuProps {
    x: number;
    y: number;
    value: number | Time;
    generateSubdivision: (subdivision: number) => void;
}

const useMouseActions = (hi: string, range: number, notes: any, setNotes: any, playNote: (note: string) => void, viewPosition: number) => {
    const [showContextMenu, setShowContextMenu] = useState<null | ContextMenuProps>(null);

    useEffect(() => {
        const keyBindingListener = (e: KeyboardEvent) => {
            if (showContextMenu) {
                if (e.key === '2') showContextMenu.generateSubdivision(2);
                if (e.key === '3') showContextMenu.generateSubdivision(3);
                if (e.key === '4') showContextMenu.generateSubdivision(4);
                if (e.key === '5') showContextMenu.generateSubdivision(5);
            }
        }
        window.addEventListener('keydown', keyBindingListener);

        return () => window.removeEventListener('keydown', keyBindingListener);

    }, [showContextMenu]);

    const generateSubdivision = (event: MouseEvent) => (subdivision: number) => {
        setNotes((prevNotes: any) =>
            getMappingLocationAndUse(
                prevNotes,
                event,
                () => new Array(subdivision).fill(0)
            )
        );
        setShowContextMenu(null);
    }

    const rightClick = (event: MouseEvent) => {
        event.preventDefault();
        getMappingLocationAndUse(notes, event, (val) => {
            setShowContextMenu({ x: event.clientX, y: event.clientY, value: val, generateSubdivision: generateSubdivision(event) });
            return val;
        });
    };

    const getMappingLocationAndUse = (
        prevNotes: any[],
        event: MouseEvent,
        action: (currentValue: number) => Array<any> | number
    ) => {
        // click [x,y] to note [i,j]
        let j = Math.floor((event.nativeEvent.offsetX + viewPosition) / MEASURE_WIDTH),
            i = Math.floor(event.nativeEvent.offsetY / KEY_HEIGHT);

        // out of bounds somehow?
        if (i >= prevNotes.length || j >= prevNotes[i].length) return prevNotes;

        const newNotes = [...prevNotes];

        getMapping((event.nativeEvent.offsetX + viewPosition) % MEASURE_WIDTH, MEASURE_WIDTH, newNotes[i], j, action);

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
        if (showContextMenu) return setShowContextMenu(null);
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
                    if (note === 0) playNote(clicked);
                    return ++note % 2;
                }
            )
        );
    };

    return {
        leftClick,
        rightClick,
        showContextMenu,
        closeContextMenu: () => setShowContextMenu(null),
    }
}

export default useMouseActions;
