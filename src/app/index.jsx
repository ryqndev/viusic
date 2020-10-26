import {useState} from 'react';
import UserSoundMappingContext, {defaultSoundMapping} from './controller/contexts/UserSoundMappingContext';
import MIDIKeyboard from './Pages/MIDIKeyboard/MIDIKeyboard';
import './styles/main.scss';

const App = () => {
	const [userSoundMapping, setUserSoundMapping] = useState(defaultSoundMapping);

	return (
		<UserSoundMappingContext.Provider value={[userSoundMapping, setUserSoundMapping]}> 
			<div className="app">
				<MIDIKeyboard />
			</div>
		</UserSoundMappingContext.Provider> 

	);
}

export default App;
