import Select from 'react-select';
import Sequencer from './Sequencer/Sequencer';
import './SongEditor.scss';

const SongEditor = ({selected, setSelected, songData, addTrack, selectedData, INSTRUMENTS}) => {
    return (
        <div className="song-editor--wrapper">
            <div className="navigation--wrapper">

            </div>
            <Sequencer 
                selected={selected}
                setSelected={setSelected}
                songData={songData}
                addTrack={addTrack}
            />
            <div className="side-options--wrapper">
                {
                    selected !== null 
                    ? (
                        <div>
                        {selectedData.name} 
                        <br />
                        <h3>Instrument: </h3>
                        <Select
                            defaultValue={INSTRUMENTS[selectedData.instrument]}
                            isSearchable
                            name="instruments"
                            options={INSTRUMENTS}
                        />
                        <br />
                        {selectedData.length}
                        </div>
                    )
                    : <div >No Track Selected</div>
                }
                
            </div>
        </div>
    )
}

export default SongEditor;