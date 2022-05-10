import { useState, useEffect } from 'react';
import INSTRUMENTS from '../../../../../../../../assets/samples/samples.json';
import { Sampler, Part } from 'tone';
import { Instrument } from '../../../../../../../controllers/tracks.types';

const useSound = (instrument: Instrument, transportNotation: any, muted: boolean) => {
    const [volume, setVolume] = useState<string>('-10');
    const [synth] = useState(() =>
        new Sampler({
            urls: INSTRUMENTS[instrument as keyof typeof INSTRUMENTS],
            release: 1,
            baseUrl: `${process.env.PUBLIC_URL}/assets/samples/${instrument}/`,
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
        if(isNaN(parseInt(volume))) return;
        synth.volume.value = parseInt(volume);
    }, [volume, synth]);

    useEffect(() => {
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
        part.mute = muted;
    }, [part, muted]);

    return {
        synth,
        playNote,
        volume,
        setVolume,
    }
}

export default useSound;
