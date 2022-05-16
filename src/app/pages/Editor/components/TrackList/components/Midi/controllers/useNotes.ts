import { useState, useEffect, useCallback } from 'react';
import type { TrackMetaData } from './useInstruments';
import useTracks from '../../../../../controllers/useTracks';

const NOTE_ORDER = ['b', 'a#', 'a', 'g#', 'g', 'f#', 'f', 'e', 'd#', 'd', 'c#', 'c'];
const BEATS_PER_MEASURE = 4;
const SUBDIVISIONS = 4;

const useNotes = (track: TrackMetaData) => {
    const [transportNotation, setTransportNotation] = useState<Array<any>>([]);
    const { editTrack } = useTracks();

    const idxToNoteMapping = useCallback(() => {
        let octave = parseInt(track.hi.replace(/\D/g, ''));
        let note = track.hi.replace(/[0-9]/g, '');
        const startIdx = NOTE_ORDER.indexOf(note);

        const mapping: any = [];

        for (let idx = 0; idx < track.range; idx++) {
            mapping.push(NOTE_ORDER[(startIdx + idx) % 12] + octave);

            if ((startIdx + idx) % 12 === 11) octave -= 1;

        }
        return mapping;
    }, [track.hi, track.range]);

    const [notes, setNotes] = useState<any>(() => {
        if (!track?.notes)
            return new Array(track.range)
                .fill(0)
                .map(_ => new Array(track.length)
                    .fill(0)
                    .map(_ => new Array(SUBDIVISIONS).fill(0)));

        return track.notes;
    });

    const noteToTransport = useCallback((
        key: string,
        note: any[] | number,
        measure: number,
        offset: number,
        length: number,
        transport: any[]
    ) => {
        if (Array.isArray(note)) {
            return note.forEach((subdivisions: any, idx: number) => {
                const noteLength = length / note.length;
                noteToTransport(
                    key,
                    subdivisions,
                    measure,
                    noteLength * idx + offset,
                    noteLength,
                    transport
                );
            });
        }
        if (note === 0) return;
        // if (note === 1) return transport.push([`${measure}:${offset}`, [key, length / SUBDIVISIONS * track.sustain]]);

        transport.push([`${measure}:${offset}`, [key, length / SUBDIVISIONS * (track.sustain + 0.5) * note ]]);
        // TODO: ignore case where tie or legato for now
        
    }, [track.sustain]);

    const notesToTransport = useCallback((key: string, noteTrack: Array<any>, transport: any[]) => {
        for (let measure = 0; measure < noteTrack.length; measure++) {
            if (noteTrack[measure] === 0) continue;
            noteToTransport(key, noteTrack[measure], measure, 0, BEATS_PER_MEASURE, transport);
        }
    }, [noteToTransport]);
 
    useEffect(() => {
        editTrack(track.recordid, track.trackid, { notes: notes });

        const transport: Array<any> = [];
        const mapping = idxToNoteMapping();

        notes.forEach((beats: any, idx: number) => {
            notesToTransport(
                mapping[idx],
                beats,
                transport,
            );
        });
        setTransportNotation(transport);
    }, [editTrack, notesToTransport, notes, idxToNoteMapping, track.recordid, track.trackid]);

    return {
        notes,
        transportNotation,
        setNotes,
    }
}

export default useNotes;
