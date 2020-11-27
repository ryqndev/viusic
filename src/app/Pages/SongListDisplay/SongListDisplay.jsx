import {useContext} from 'react';
import {Link} from 'react-router-dom';
import { Card } from '../../components/basic';
import GeoPattern from 'geopattern';
import UserSongListContext from '../../controller/contexts/UserSongsListContext';
import './SongListDisplay.scss';

const SongListDisplay = () => {
    const songlist = useContext(UserSongListContext);
    return (
        <div className="song-list--wrapper">
            <div className="list--wrapper">
                <h3>Songs <span>({songlist.length})</span></h3>
                <div className="list">
                    <div className="list--item">
                        <Card className="icon create-new" key="@ryqndev/new"></Card>
                        <h4>Create New</h4>
                    </div>
                    {songlist.map(song => (
                        <Link to={`/song/${song.uid}`}>
                            <div className="list--item">
                                <Card className="icon" key={song.uid} style={{backgroundImage: GeoPattern.generate(song.name).toDataUrl()}}></Card>
                                <h4>{song.name}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SongListDisplay;

// {/* <div className="song-list--item">
// {song.name}
// {song.credit}
// <div className="date-information">
//     <span>Last Edited:</span>
//     <span>Created:</span>
//     <p>{new Date(song.dateEdited).toDateString()}</p>
//     <p>{new Date(song.dateCreated).toDateString()}</p>
// </div>
// </div> */}


// name: 'End of it (Cover)',
//     creator: 'Ryan Yang',
//     credit: 'Friday Pilot\'s Club',
//     dateCreated: 'Tue, 27 Oct 2020 22:34:00 GMT',
//     dateEdited: 'Tue, 27 Oct 2020 22:37:04 GMT',
//     uid: 'uniquestuffbro',
//     description: 'This is a song I created as an example for all to see',