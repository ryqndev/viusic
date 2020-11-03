import {RoundedCard} from '../../../components/basic/Card';
import {MIDITrack} from '../../../components/interactive';
import TrackEditor from '../TrackEditor/TrackEditor';
import './Sequencer.scss';

const Sequencer = ({selected, setSelected, songData, addTrack, setTrackData}) => {
    return (
        <RoundedCard className="sequencer--wrapper">
            {songData.tracks.map(track => {
                const isSelected = selected === track.uuid;
                return (
                    <div 
                        key={track.uuid}
                        className={`min-track--shape track--with-details ${isSelected ? 'selected' : ''}`}
                        onClick={() => {setSelected(track.uuid)}}
                    >
                        {   
                            isSelected 
                            ? <TrackEditor trackData={track} setTrackData={setTrackData}/>
                            : <MIDITrack trackData={track} time={songData.metadata.length} />
                        }
                    </div>
                );
            })}
            <div className="min-track--shape add-track" onClick={addTrack}>
                Add a new track
            </div>
        </RoundedCard>
    );
}

export default Sequencer;