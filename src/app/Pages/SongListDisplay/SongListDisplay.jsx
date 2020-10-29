import {useContext} from 'react';
import { Card } from '../../components/basic';
import UserSongListContext from '../../controller/contexts/UserSongsListContext';
import './SongListDisplay.scss';

const SongListDisplay = () => {
    const songlist = useContext(UserSongListContext);
    return (
        <div className="song-list--wrapper">
            {songlist.map(song => (
                <Card key={song.uid}>
                    <div className="song-list--item">
                        {song.name}
                        {song.credit}
                        <div className="date-information">
                            <span>Last Edited:</span>
                            <span>Created:</span>
                            <p>{new Date(song.dateEdited).toDateString()}</p>
                            <p>{new Date(song.dateCreated).toDateString()}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default SongListDisplay;

// name: 'End of it (Cover)',
//     creator: 'Ryan Yang',
//     credit: 'Friday Pilot\'s Club',
//     dateCreated: 'Tue, 27 Oct 2020 22:34:00 GMT',
//     dateEdited: 'Tue, 27 Oct 2020 22:37:04 GMT',
//     uid: 'uniquestuffbro',
//     description: 'This is a song I created as an example for all to see',