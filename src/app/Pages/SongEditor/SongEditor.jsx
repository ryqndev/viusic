import Select from 'react-select';
import Sequencer from './Sequencer/Sequencer';
import {RoundedCard} from '../../components/basic/Card';
import {toggle} from '../../controller/libs/tone';
import './SongEditor.scss';
import TrackDetails from './TrackDetails/TrackDetails';

const SongEditor = ({selected, setSelected, songData, addTrack, selectedData, INSTRUMENTS}) => {
    return (
        <div className="song-editor--wrapper">
            <div className="left-side--wrapper">
                {/* <button onMouseDown={toggle}>
                    big fat play button
                </button> */}
                <RoundedCard className="top"></RoundedCard>
                <RoundedCard className="bottom"></RoundedCard>
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