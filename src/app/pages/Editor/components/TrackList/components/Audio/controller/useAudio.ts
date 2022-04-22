
import * as Tone from 'tone';
import { useCallback, useState, useEffect } from 'react';

interface KeyMap {
    [key: string]: [string, boolean];
}

const keyMapping: KeyMap = {
    KeyZ: ['G3', false],
    KeyS: ['G#3', false],
    KeyX: ['A3', false],
    KeyD: ['A#3', false],
    KeyC: ['B3', false],
    KeyV: ['C4', false],
    KeyG: ['C#4', false],
    KeyB: ['D4', false],
    KeyH: ['D#4', false],
    KeyN: ['E4', false],
    KeyM: ['F4', false],
    KeyK: ['F#4', false],
    Comma: ['G4', false],
    KeyL: ['G#4', false],
    Period: ['A4', false],
    Semicolon: ['A#4', false],
    Slash: ['B4', false],
};

const useAudio = (expanded: boolean) => {
    const [keys, setKeys] = useState(keyMapping);
    const [synth] = useState(() => new Tone.PolySynth().toDestination());

    const pressed = useCallback(
        (event: any) => {
            if (!expanded || !keys?.[event.code as keyof KeyMap] || keys[event.code as keyof KeyMap][1]) return;
            // keyMapping[event.code as keyof KeyMap][1] = true;
            setKeys(prev => {
                prev[event.code as keyof KeyMap][1] = true;
                return { ...prev };
            });
            synth.triggerAttack(
                keys[event.code as keyof KeyMap][0],
            );
        },
        [expanded, synth, keys]
    );
    const released = useCallback(
        (event: any) => {
            if (!expanded || !keys?.[event.code as keyof KeyMap]) return;
            // keyMapping[event.code as keyof KeyMap][1] = false;
            setKeys(prev => {
                prev[event.code as keyof KeyMap][1] = false;
                return { ...prev };
            });
            synth.triggerRelease(
                keyMapping[event.code as keyof KeyMap][0],
            );
        },
        [expanded, synth, keys]
    );

    useEffect(() => {
        Tone.context.lookAhead = 0;
        window.addEventListener('keydown', pressed, false);
        window.addEventListener('keyup', released, false);

        return () => {
            window.removeEventListener('keydown', pressed, false);
            window.removeEventListener('keyup', released, false);
        }
    }, [pressed, released]);

    return {
        keyMapping,
    }
}

export default useAudio;