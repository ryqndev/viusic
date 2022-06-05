import { useState, MouseEvent, useEffect } from 'react';

const NOTES = ['b', 'a#', 'a', 'g#', 'g', 'f#', 'f', 'e', 'd#', 'd', 'c#', 'c'];

interface ContextMenuProps {
    x: number;
    y: number;
    value: number;
    changeNoteLength: (newLength: any) => void;
    generateSubdivision: (subdivision: number) => void;
}

const useMouseActions = (
    hi: string,
    range: number,
    notes: any,
    setNotes: any,
    playNote: (note: string) => void,
    keyHeight: number,
    measureWidth: number,
    viewPosition: number,
) => {
    const [showContextMenu, setShowContextMenu] = useState<null | ContextMenuProps>(null);

    useEffect(() => {
        const keyBindingListener = (e: KeyboardEvent) => {
            if (showContextMenu) {
                if (parseInt(e.key) > 1) {
                    e.preventDefault();
                    showContextMenu.generateSubdivision(parseInt(e.key));
                }
                else if(e.key === 'd') {
                    e.preventDefault();
                    showContextMenu.changeNoteLength((prev: any) => prev * 2);
                }
                else if(e.key === 'h') {
                    e.preventDefault();
                    showContextMenu.changeNoteLength((prev: any) => prev / 2);
                }
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
    const changeNoteLength = (event: MouseEvent) => (newLength: any) => {
        setNotes((prevNotes: any) =>
            getMappingLocationAndUse(
                prevNotes,
                event,
                newLength
            )
        );
        setShowContextMenu(null);
    }

    const rightClick = (event: MouseEvent) => {
        event.preventDefault();
        getMappingLocationAndUse(notes, event, (val) => {
            setShowContextMenu({
                x: event.clientX,
                y: event.clientY,
                value: val,
                changeNoteLength: changeNoteLength(event),
                generateSubdivision: generateSubdivision(event),
            });
            return val;
        });
    };

    const getMappingLocationAndUse = (
        prevNotes: any[],
        event: MouseEvent,
        action: (currentValue: number) => Array<any> | number
    ) => {
        // click [x,y] to note [i,j]
        let j = Math.floor((event.nativeEvent.offsetX + viewPosition) / measureWidth),
            i = Math.floor((event.nativeEvent.offsetY - 20) / keyHeight);
        if (i < 0 || j < 0 || i >= prevNotes.length || j >= prevNotes[i].length) return prevNotes;

        const newNotes = [...prevNotes];
        getMapping((event.nativeEvent.offsetX + viewPosition) % measureWidth, measureWidth, newNotes[i], j, action);

        return newNotes;
    }

    const getMapping = (
        offsetX: number,
        width: number,
        notes: any[],
        noteIdx: number,
        action: (currentValue: number) => Array<any> | number
    ) => {
        if(noteIdx < 0) return;
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
        let i = Math.floor((event.nativeEvent.offsetY - 20) / keyHeight);
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
