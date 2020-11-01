import {useState} from 'react';
import {Link, Route} from 'react-router-dom';
import UserSoundMappingContext, {defaultSoundMapping} from './controller/contexts/UserSoundMappingContext';
import UserSongListContext, {defaultSongList} from './controller/contexts/UserSongsListContext';
import SongEditorContainer from './pages/SongEditor/SongEditorContainer';
import SongListDisplay from './pages/SongListDisplay';
import './styles/main.scss';

const App = () => {
	const [userSoundMapping, setUserSoundMapping] = useState(defaultSoundMapping);
	const [userSongList, setUserSongList] = useState(defaultSongList);

	return (
        <UserSongListContext.Provider value={userSongList}> 
            <UserSoundMappingContext.Provider value={[userSoundMapping, setUserSoundMapping]}> 
                <Route exact path='/'>
                    <Link to='/songs'>to songs</Link>
                    <Link to='/song/uniquesongid'>to uniquesongid</Link>
                </Route>
                <Route exact path='/songs'>
                    <SongListDisplay />
                </Route>
                <Route path='/song/:id'>
                    <SongEditorContainer />
                </Route>
            </UserSoundMappingContext.Provider> 
        </UserSongListContext.Provider> 
	);
}

export default App;
