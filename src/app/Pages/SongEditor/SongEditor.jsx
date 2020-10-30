import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {load, toggle, EndOfItSample, INSTRUMENTS} from '../../controller/libs/tone';
import {v4 as uuidv4} from 'uuid';
import Track from '../../components/interactive/Track';
import Select from 'react-select';
import './SongEditor.scss';

const SongEditor = () => {
    const songid = useParams().id;
    const [songData, setSongData] = useState(EndOfItSample);
    const [selected, setSelected] = useState(songData?.tracks?.[0]?.uuid);

    useEffect(() => {load(songData)}, [songData]);

    const addTrack = () => {
        let newSongData = {...songData}
        let uuid = uuidv4();
        newSongData.trackmap[uuid] = newSongData.tracks.length;
        newSongData.tracks.push({
            name: "new track",
            uuid: uuid,
            instrument: "polysynth",
            length: "0",
            notes: []
        });
        setSongData(newSongData);
    }
    const selectedData = songData.tracks[songData.trackmap[selected]];
    return (
        <div className="song-editor--wrapper">
            <div className="navigation--wrapper">

            </div>
            <div className="workspace--wrapper">
                {songData.tracks.map(track => (
                    <div 
                        key={track.uuid}
                        className={`track--with-details ${selected === track.uuid ? 'selected' : ''}`}
                        onClick={() => {setSelected(track.uuid)}}
                    >
                        <Track notes={track.notes} length={songData.metadata.length}/>
                    </div>
                ))}
                <div className="add-track" onClick={addTrack}>
                    Add a new track
                </div>
            </div>
            <div className="side-options--wrapper">
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
        </div>
    )
}

export default SongEditor;