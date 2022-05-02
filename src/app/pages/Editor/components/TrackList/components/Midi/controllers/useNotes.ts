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

    const cleanTransport = useCallback(() => {
        setNotes(notes.map((key: any) => 
            key.map((beat: any) => {
                if(Array.isArray(beat)) {
                    return beat;
                    // if(beat.every((v1: any) => v1 === 0 )){
                    //     return 0;
                    // }
                    // return beat.map(d3 => {
                    //     if(Array.isArray(d3)) {
                    //         if(d3.every( val => val === 0 )){
                    //             return 0;
                    //         }
                    //         return d3.map(d4 => {
                    //             if(Array.isArray(d4)) {
                    //                 if(d4.every((v4: any) => v4 === 0 )){
                    //                     return 0;
                    //                 }
                    //                 return d4;
                    //             }
                    //             return d4;
                    //         });
                    //     }
                    //     return d3;
                    // });
                }
                // return beat;
                return new Array(4).fill(0);
            })));
    }, [notes]);

    // useEffect(() => {
    //     cleanTransport();
    // }, [cleanTransport]);

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
        // TODO: ignore case where tie or legato for now
        transport.push([`${measure}:${offset}`, [key, length]]);
    }, []);

    const notesToTransport = useCallback((key: string, beats: Array<any>, transport: any[]) => {
        for (let measure = 0; measure < beats.length; measure++) {
            if (beats[measure] === 0) continue;
            noteToTransport(key, beats[measure], measure, 0, BEATS_PER_MEASURE, transport);
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
