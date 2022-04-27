import { useState, useEffect, useCallback } from 'react';
import useTracks from '../../../../../controllers/useTracks';

interface useNotesProps {
    range: number;
    defaultBeats: number;
    recordid: string;
    trackid: string;
    length: number;
    hi: string;
    notes?: any;
}
const NOTE_ORDER = ['b', 'a#', 'a', 'g#', 'g', 'f#', 'f', 'e', 'd#', 'd', 'c#', 'c'];

const useNotes = (trackDomain: useNotesProps) => {
    const [transportNotation, setTransportNotation] = useState<Array<any>>([]);
    const { editTrack } = useTracks();

    const idxToNoteMapping = useCallback(() => {

        let octave = parseInt(trackDomain.hi.replace(/\D/g, ''));
        let note = trackDomain.hi.replace(/[0-9]/g, '');
        const startIdx = NOTE_ORDER.indexOf(note);

        const mapping: any = [];

        for (let idx = 0; idx < trackDomain.range; idx++) {
            mapping.push(NOTE_ORDER[(startIdx + idx) % 12] + octave);

            if ((startIdx + idx) % 12 === 11) octave -= 1;

        }
        return mapping;
    }, [trackDomain.hi, trackDomain.range]);

    const [notes, setNotes] = useState<any>(() => {
        if (!trackDomain?.notes)
            return new Array(trackDomain.range)
                .fill(0)
                .map(_ => new Array(trackDomain.length * trackDomain.defaultBeats).fill(0))

        return trackDomain.notes;
    }
    );


    useEffect(() => {
        editTrack(trackDomain.recordid, trackDomain.trackid, { notes: notes });

        const newTransportNotation: Array<any> = [];
        const mapping = idxToNoteMapping();
        notes.forEach((key: any, idx: number) => {
            const noteIdx = mapping[idx];

            for (let i = 0; i < key.length; i++) {
                if (key[i] === 0) continue;

                if (key[i] === 1) newTransportNotation.push(
                    [`${Math.floor(i / 6)}:${Math.floor((i % 6) / 2)}:${(i % 2) * 2}`
                        , [noteIdx, "4n"]]);
            }
        });
        setTransportNotation(newTransportNotation);
    }, [notes, idxToNoteMapping, trackDomain.defaultBeats]);

    const getTransportNote = (note: Array<any> | number,) => {

    }

    return {
        notes,
        transportNotation,
        setNotes,
    }
}

export default useNotes;
