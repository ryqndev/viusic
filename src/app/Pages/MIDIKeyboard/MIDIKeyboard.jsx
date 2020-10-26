import {useContext} from 'react';
import UserSoundMappingContext from '../../controller/contexts/UserSoundMappingContext';
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
                    // <div className="">
                        <button className="key" key={i} onTouchStart={e ?? unsetBinding}></button>
                    // </div>
                ))}
            </div>
        </div>
    )
}

export default MIDIKeyboard;
