import { useState, useEffect } from 'react';
import INSTRUMENTS from '../../../../../../../../assets/samples/samples.json';
import { Sampler, Part } from 'tone';
import { Instrument } from '../../../../../../../controllers/tracks.types';

const useSound = (instrument: Instrument, transportNotation: any) => {
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

    return {
        synth,
    }
}

export default useSound;
