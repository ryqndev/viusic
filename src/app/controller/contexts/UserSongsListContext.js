import {createContext} from 'react';

const SAMPLE_SONG_DATA = {
    name: 'End of it (Cover)',
    creator: 'Ryan Yang',
    credit: 'Friday Pilot\'s Club',
    dateCreated: 'Tue, 27 Oct 2020 22:34:00 GMT',
    dateEdited: 'Tue, 27 Oct 2020 22:37:04 GMT',
    uid: 'uniquestuffbro',
    description: 'This is a song I created as an example for all to see',
}
const defaultSongList = [SAMPLE_SONG_DATA];

const UserSongsListContext = createContext();

/**
 * When released, should do something like this and update through firebase/etc.
 * const UserSongsListContext = createContext([]); 
 */

export default UserSongsListContext;
export {defaultSongList}
