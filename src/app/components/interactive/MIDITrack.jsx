import * as Tone from 'tone';

/**
 * 
 * @param {Object} trackData - needs to have:
 * @param {Number} hi
 * @param {Number} lo
 * @param {Array} notes
 */
const MIDITrack = ({trackData, time}) => {
    const totalTime = Tone.Time(time).toMilliseconds();
    const hiMIDI = Tone.Frequency(trackData.hi).toMidi();
    const loMIDI = Tone.Frequency(trackData.lo).toMidi();
    const range = hiMIDI - loMIDI;
    return (
        <div className="track--wrapper">
            <svg>
                {trackData.notes.map(note => (
                    <rect
                        key={note}
                        height={100/range + '%'}
                        width={Tone.Time(note[1][1]).toMilliseconds()/totalTime*100 + '%'}
                        x={Tone.TransportTime(note[0]).toMilliseconds()/totalTime*90 + '%'}
                        y={(Tone.Frequency(note[1][0]).toMidi() - hiMIDI)/range*-90 + '%'} 
                    />
                ))}
            </svg>
        </div>
    );
}

export default MIDITrack;