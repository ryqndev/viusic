import {createContext} from 'react';

const SAMPLE_SONG_DATA = {
    name: 'End of it (Cover)',
    creator: 'Ryan Yang',
    credit: 'Friday Pilot\'s Club',
    dateCreated: 'Tue, 27 Oct 2020 22:34:00 GMT',
    dateEdited: 'Tue, 27 Oct 2020 22:37:04 GMT',
    uid: 'uniquestuffbro',
}

const UserSongsListContext = createContext([SAMPLE_SONG_DATA]); 

export default UserSongsListContext;
