import Sequencer from './Sequencer/Sequencer';
import {RoundedCard} from '../../components/basic/Card';
import './SongEditor.scss';
import TrackDetails from './TrackDetails/TrackDetails';
import MediaControls from '../../components/interactive/MediaControls';

const SongEditor = ({selected, setSelected, songData, addTrack, selectedData, INSTRUMENTS}) => {
    return (
        <div className="song-editor--wrapper">
            <div className="left-side--wrapper">
                <RoundedCard className="top">
                    
                </RoundedCard>
                <RoundedCard className="bottom">
                    <MediaControls />
                </RoundedCard>
            </div>
            <Sequencer 
                selected={selected}
                setSelected={setSelected}
                songData={songData}
                addTrack={addTrack}
            />
            <RoundedCard className="right-side--wrapper">
                <TrackDetails INSTRUMENTS={INSTRUMENTS} selectedData={selectedData} />
            </RoundedCard>
        </div>
    )
}

export default SongEditor;