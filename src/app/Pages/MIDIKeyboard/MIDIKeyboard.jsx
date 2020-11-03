import {useContext} from 'react';
import UserSoundMappingContext from '../../controller/contexts/UserSoundMappingContext';
import {MIDIKey} from '../../components/interactive';
import './MIDIKeyboard.scss';

/**
 * Using index as key here is ok since array should be constant. May look to change this feature if we 
 * consider expanding functionality
 */
const MIDIKeyboard = () => {
    const [userSoundMapping] = useContext(UserSoundMappingContext);
    
    console.log("Loading user sound mapping context: ", userSoundMapping);

    return (
        <div className="midi-keyboard--wrapper">
            <div className="grid">
                {userSoundMapping.map((e, i) => <MIDIKey e={e} i={i}/>)}
            </div>
        </div>
    );
}

export default MIDIKeyboard;
