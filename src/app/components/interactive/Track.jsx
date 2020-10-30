import * as Tone from 'tone';

const Track = ({notes, time, hi, lo}) => {
    console.log(notes);
    const totalTime = Tone.Time(time).toMilliseconds();
    const hiMIDI = Tone.Frequency(hi).toMidi();
    const loMIDI = Tone.Frequency(lo).toMidi();
    const range = hiMIDI - loMIDI;
    return (
        <div className="track--wrapper">
            <svg>
                {notes.map(note => (
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

export default Track;