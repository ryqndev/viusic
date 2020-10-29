import {useState} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import UserSoundMappingContext, {defaultSoundMapping} from './controller/contexts/UserSoundMappingContext';
import UserSongListContext, {defaultSongList} from './controller/contexts/UserSongsListContext';
import SongEditor from './pages/SongEditor';
import SongListDisplay from './pages/SongListDisplay';
import './styles/main.scss';

const App = () => {
	const [userSoundMapping, setUserSoundMapping] = useState(defaultSoundMapping);
	const [userSongList, setUserSongList] = useState(defaultSongList);

	return (
        <Router basename={process.env.PUBLIC_URL}>
            <UserSongListContext.Provider value={userSongList}> 
                <UserSoundMappingContext.Provider value={[userSoundMapping, setUserSoundMapping]}> 
                    <Route exact path='/'>
                        <Link to='/songs'>to songs</Link>
                        <Link to='/song/uniquesongid'>to uniquesongid</Link>
                    </Route>
                    <Route exact path='/songs'>
                        <SongListDisplay />
                    </Route>
                    <Route exact path='/song/:id'>
                        <SongEditor />
                    </Route>
                </UserSoundMappingContext.Provider> 
            </UserSongListContext.Provider> 
        </Router>
	);
}

export default App;
