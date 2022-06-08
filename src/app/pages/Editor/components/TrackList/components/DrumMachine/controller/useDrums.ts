import useTracks from "../../../../../controllers/useTracks";
import { useState, useEffect } from "react";
import * as Tone from 'tone';
import DrumOneSound from '../assets/sounds_drums_one.mp3';
import DrumTwoSound from '../assets/sounds_drums_two.mp3';
import DrumThreeSound from '../assets/sounds_drums_three.mp3';
import DrumFourSound from '../assets/sounds_drums_four.mp3';

const useDrums = (track: any) => {
    const { editTrack } = useTracks();
    // const [loop, setLoop] = useState(new Tone.Loop().start(0));
    const [volume, setVolume] = useState<number>(track.baseVolume / 100 * 21 - 20);
    const [synth] = useState(() =>
        new Tone.Sampler({
            urls: {
                // "F4": "sounds_drums_one.mp3",
                "C4": "hihatclosed.mp3",
                "F3": "snare.wav",
                "F2": "kick.wav",
            },
            release: 1,
            baseUrl: `${process.env.PUBLIC_URL}/assets/samples/rock-kit/`,
        }).toDestination()
    );
//     const [synth] = useState(() =>
//     new Tone.Sampler({
//         urls: {
//             "F4": "C5.wav",
//         },
//         release: 1,
//         baseUrl: `${process.env.PUBLIC_URL}/assets/samples/bell/`,
//     }).toDestination()
// );
    // const [synth] = useState(() =>
    //     new Tone.MembraneSynth().toDestination()
    // );


    const [part, setPart] = useState(() =>
        new Tone.Part((time, note) => {
            synth.triggerAttackRelease(
                note[0],
                note[1],
                time
            );
        }, [
            ["0:0", ["C4", "8n"]],
            ["0:0", ["F2", "8n"]],
            ["0:0.5", ["C4", "8n"]],
            ["0:1", ["C4", "8n"]],
            ["0:1", ["F3", "8n"]],
            ["0:1.5", ["C4", "8n"]],
            ["0:1.5", ["F2", "8n"]],
            ["0:2", ["C4", "8n"]],
            ["0:2", ["F2", "8n"]],
            ["0:2.5", ["C4", "8n"]],
            ["0:3", ["C4", "8n"]],
            ["0:3", ["F3", "8n"]],
            ["0:3.5", ["C4", "8n"]],
        ]).start(0)
    );

    useEffect(() => {
        synth.volume.value = volume;
        editTrack(track.recordid, track.id, { baseVolume: Math.round((volume + 20) / 21 * 100) });
    }, [volume, synth, track.id, track.recordid, editTrack]);

    useEffect(() => {
        part.loop = 16;

        return () => { part.dispose() } 
    }, [part]);

    useEffect(() => {
        part.mute = track.muted;
    }, [part, track.muted]);

    return {
        synth,
        volume,
        setVolume,
        part,
    }
}

export default useDrums;
