import {createContext} from 'react';

const UserSoundMappingContext = createContext(); 

const TOTAL_KEYS = 16; // ideally a perfect square
const defaultSoundMapping = Array.from(new Array(TOTAL_KEYS), (e, i) => i);

export default UserSoundMappingContext;
export {defaultSoundMapping}