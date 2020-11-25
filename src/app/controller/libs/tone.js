import * as Tone from 'tone';
import loadInstrument from './instrument-loader';
import EndOfItSample from '../../assets/end-of-it-friday-pilots-club.json';


let _isplaying = false;
let _isloaded = false;

const parts = {}, instrumentsList = {};

const loadSongInfo = (songInfo) => {
    Tone.Transport.bpm.value = songInfo.metadata?.bpm ?? 80;
    songInfo.tracks.forEach(track => {
        if(!track.instrument) return;
        if(!instrumentsList.hasOwnProperty(track.instrument)){
            instrumentsList[track.instrument] = loadInstrument(track.instrument);
        }
        let part = new Tone.Part(((time, note) => {
            instrumentsList[track.instrument].triggerAttackRelease(note[0], note[1], time);
        }), track.notes).start(0);
        parts[track.uuid] = part;
    });
    _isloaded = true;
}

/**
 * Methods to control time flow of the transport
 */
const start = () => {Tone.Transport.start()}
const stop = () => {Tone.Transport.stop()}

const toggle = () => {
    if(!_isloaded) return;
    _isplaying ? start() : stop();
    _isplaying = !_isplaying;
}

export {
    loadSongInfo as load,
    _isplaying,
    toggle,
    EndOfItSample,
}