import {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import UserSoundMappingContext, {defaultSoundMapping} from './controller/contexts/UserSoundMappingContext';
import SongEditor from './Pages/SongEditor/SongEditor';
import './styles/main.scss';

const App = () => {
	const [userSoundMapping, setUserSoundMapping] = useState(defaultSoundMapping);

	return (
		<UserSoundMappingContext.Provider value={[userSoundMapping, setUserSoundMapping]}> 
			<Router basename={process.env.PUBLIC_URL}>
				<SongEditor />
			</Router>
		</UserSoundMappingContext.Provider> 

	);
}

export default App;
