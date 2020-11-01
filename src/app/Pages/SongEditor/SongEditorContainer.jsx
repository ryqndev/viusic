import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

import {load, toggle, EndOfItSample, INSTRUMENTS} from '../../controller/libs/tone';
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
            instrument: "polysynth",
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
