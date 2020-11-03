import {useState} from 'react';
import './TrackEditor.scss';

const TrackEditor = ({trackData, setTrackData}) => {
    const [trackMetadata, setTrackMetadata] = useState({});

    console.log(trackData);
    return (
        <div className="track-editor--wrapper">
            {/* //make 2d array */}
        </div>
    );
}

export default TrackEditor;
