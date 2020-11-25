import {toggle} from '../../controller/libs/tone';

const MediaControls = () => {
    return (
        <div className="media-controls--wrapper">
            <button className="play-button" onClick={toggle}></button>
        </div>
    )
}

export default MediaControls;