import {useContext} from 'react';
import UserSoundMappingContext from '../../controller/contexts/UserSoundMappingContext';

const MIDIKeyboard = () => {
    const [userSoundMapping] = useContext(UserSoundMappingContext);
    console.log(userSoundMapping);
    return (
        <div className="MIDIKeyboard--wrapper">
            <div className="grid">

            </div>
        </div>
    )
}

export default MIDIKeyboard;
