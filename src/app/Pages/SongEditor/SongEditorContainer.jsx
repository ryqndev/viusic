import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

import {load, EndOfItSample} from '../../controller/libs/tone';
import INSTRUMENTS_LIST from '../../assets/instruments.json';
import SongEditor from './SongEditor';

const SongEditorContainer = () => {
    const songid = useParams().id;
    const [songData, setSongData] = useState(EndOfItSample);
    const [selected, setSelected] = useState(null);

    useEffect(() => {load(songData)}, [songData]);

    const addTrack = () => {
        let newSongData = {...songData}
        let uuid = uuidv4();
        newSongData.trackmap[uuid] = newSongData.tracks.length;
        newSongData.tracks.push({
            name: "new track",
            uuid: uuid,
            length: "0",
            notes: []
        });
        setSongData(newSongData);
        setSelected(uuid);
    }
    const setTrackData = (data) => {
        let newSongData = {...songData}
        newSongData[newSongData.trackmap[selected]] = data;
        setSongData(newSongData);
    }

    const INSTRUMENTS = Object.keys(INSTRUMENTS_LIST).map(key => ({value: key, label: INSTRUMENTS_LIST[key]}));

    const selectedData = songData.tracks[songData.trackmap[selected]];

    return (
        <SongEditor
            selected={selected}
            setSelected={setSelected}
            INSTRUMENTS={INSTRUMENTS}
            songData={songData}
            songid={songid}
            addTrack={addTrack}
            selectedData={selectedData}   
            setTrackData={setTrackData}
        />
    );
}

export default SongEditorContainer;
