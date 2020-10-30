import * as Tone from 'tone';
import EndOfItSample from '../../assets/end-of-it-friday-pilots-club.json';

const INSTRUMENTS = [{value: 'polysynth', label: 'Polysynth'}];

let synth = new Tone.PolySynth().toDestination();
let _isplaying = false;
const parts = {};

const loadSongInfo = (songInfo) => {
    Tone.Transport.bpm.value = songInfo.metadata?.bpm ?? 80;
    songInfo.tracks.forEach(track => {
        let part = new Tone.Part(((time, note) => {
            synth.triggerAttackRelease(note[0], note[1], time);
        }), track.notes).start(0);
        parts[track.uuid] = part;
    });
}

/**
 * Methods to control time flow of the transport
 */
const start = () => {Tone.Transport.start()}
const stop = () => {Tone.Transport.stop()}

const toggle = () => {
    _isplaying ? start() : stop();
    _isplaying = !_isplaying;
}

export {
    loadSongInfo as load,
    _isplaying,
    toggle,
    EndOfItSample,
    INSTRUMENTS
}