import {useContext} from 'react';
import UserSoundMappingContext from '../../../controller/contexts/UserSoundMappingContext';
import './MIDIKeyboard.scss';

/**
 * Using index as key here is ok since array should be constant. May look to change this feature if we 
 * consider expanding functionality
 */
const MIDIKeyboard = () => {
    const [userSoundMapping] = useContext(UserSoundMappingContext);
    
    console.log("Loading user sound mapping context: ", userSoundMapping);

    const unsetBinding = () => {
        console.log("Binding has not been set!");
    }

    return (
        <div className="midi-keyboard--wrapper">
            <div className="grid">
                {userSoundMapping.map((e, i) => (
                    <button
                        className="key"
                        key={i}
                        onMouseDown={e ?? unsetBinding}
                        onTouchStart={e ?? unsetBinding}
                        onTouchEnd={e => e.preventDefault()}
                    >
                    </button>
                ))}
            </div>
        </div>
    )
}

export default MIDIKeyboard;
