import { useState, useEffect } from 'react';
import INSTRUMENTS from '../../../../../../../../assets/samples/samples.json';
import { Sampler, Part } from 'tone';
import { Instrument, Track } from '../../../../../../../controllers/tracks.types';
import useTracks from '../../../../../controllers/useTracks';
import { TrackMetaData } from './useInstruments';

interface useSoundProps extends Track {
    recordid: string;
}

const useSound = (track: useSoundProps, transportNotation: any) => {
    const { editTrack } = useTracks();
    const [volume, setVolume] = useState<number>(track.baseVolume / 100 * 21 - 20);
    const [synth] = useState(() =>
        new Sampler({
            urls: INSTRUMENTS[track.instrument as keyof typeof INSTRUMENTS],
            release: 1,
            baseUrl: `${process.env.PUBLIC_URL}/assets/samples/${track.instrument}/`,
        }).toDestination()
    );

    const [part, setPart] = useState(() =>
        new Part((time, note) => {
            synth.triggerAttackRelease(
                note[0],
                note[1],
                time
            );
        }, transportNotation).start(0)
    );

    const playNote = (note: string) => {
        synth.triggerAttackRelease(note, '4n');
    }

    useEffect(() => {
        synth.volume.value = volume;
        editTrack(track.recordid, track.id, { baseVolume: Math.round((volume + 20) / 21 * 100) });
    }, [volume, synth, track.id, track.recordid, editTrack]);

    useEffect(() => {
        console.log(synth)
        setPart(new Part((time, note) => {
            synth.triggerAttackRelease(
                note[0],
                note[1],
                time
            );
        }, transportNotation).start(0))
    }, [transportNotation, synth]);

    useEffect(() => (() => {
        part.dispose()
    }), [part]);

    useEffect(() => {
        part.mute = track.muted;
    }, [part, track.muted]);

    return {
        synth,
        playNote,
        volume,
        setVolume,
        part,
    }
}

export default useSound;
