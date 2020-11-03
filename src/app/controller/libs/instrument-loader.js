import * as Tone from 'tone';
import INSTRUMENTS_LIST from '../../assets/samples/samples.json';

const loadInstrument = (instrument) => {
    return new Tone.Sampler({
        urls: INSTRUMENTS_LIST[instrument],
        release: 1,
        baseUrl: `https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/${instrument}/`,
    }).toDestination();
}
export default loadInstrument;