import { useState, useEffect } from 'react';
import INSTRUMENTS from '../../../../../../../../assets/samples/samples.json';
import { Sampler, Part, Transport } from 'tone';
import { Instrument } from '../../../../../../../controllers/tracks.types';

Transport.timeSignature = [6, 8];

const sample = [
    ["0:0:0", ["F3", "4n"]],
    ["0:0:2", ["G#3", "4n"]],
    ["0:1:0", ["C#4", "4n"]],
    ["0:1:2", ["F4", "4n"]],
    ["0:2:0", ["C#4", "4n"]],
    ["0:2:2", ["G#3", "4n"]],
    ["1:0:0", ["F3", "4n"]],
    ["1:0:2", ["G#3", "4n"]],
    ["1:1:0", ["C#4", "4n"]],
    ["1:1:2", ["F4", "4n"]],
    ["1:2:0", ["C#4", "4n"]],
    ["1:2:2", ["G#3", "4n"]],
    ["2:0:0", ["F3", "4n"]],
    ["2:0:2", ["G#3", "4n"]],
    ["2:1:0", ["C#4", "4n"]],
    ["2:1:2", ["F4", "4n"]],
    ["2:2:0", ["G#4", "4n"]],
    ["2:2:2", ["C#5", "4n"]],
    ["3:0:0", ["F5", "4n"]]];

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
