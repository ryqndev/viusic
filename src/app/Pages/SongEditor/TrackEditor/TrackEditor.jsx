import DrumMachine from './DrumMachine.jsx';
import './TrackEditor.scss';

const TrackEditor = ({trackData, setTrackData}) => {
    console.log(trackData);

    const getSpecificTrackEditor = (instrument) => {
        switch(instrument){
            case 'drum':
                return <DrumMachine data={trackData} setData={setTrackData} />;
            case 'bassline':
            default:
                return <DrumMachine data={trackData} setData={setTrackData} />;
        }
    }

    return (
        <div className="track-editor--wrapper">
            {getSpecificTrackEditor(trackData?.instrument)}
        </div>
    );
}

export default TrackEditor;
