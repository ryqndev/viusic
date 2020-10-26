import {createContext} from 'react';

import * as Tone from 'tone';

const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const UserSoundMappingContext = createContext(); 

const TOTAL_KEYS = 16; // ideally a perfect square
// const defaultSoundMapping = new Array(TOTAL_KEYS).fill(null);
const defaultSoundMapping = [
    () => { synth.triggerAttackRelease("C3", "8n") },
    () => { synth.triggerAttackRelease("D3", "8n") },
    () => { synth.triggerAttackRelease("E3", "8n") },
    () => { synth.triggerAttackRelease("F3", "8n") },
    () => { synth.triggerAttackRelease("G3", "8n") },
    () => { synth.triggerAttackRelease("A3", "8n") },
    () => { synth.triggerAttackRelease("B3", "8n") },
    () => { synth.triggerAttackRelease("C4", "8n") },
    () => { synth.triggerAttackRelease("D4", "8n") },
    () => { synth.triggerAttackRelease("E4", "8n") },
    () => { synth.triggerAttackRelease("F4", "8n") },
    () => { synth.triggerAttackRelease("G4", "8n") },
    () => { synth.triggerAttackRelease("A4", "8n") },
    () => { synth.triggerAttackRelease("B4", "8n") },
    () => { synth.triggerAttackRelease("C5", "8n") },
    () => { synth.triggerAttackRelease("D5", "8n") },
];

export default UserSoundMappingContext;
export {defaultSoundMapping}