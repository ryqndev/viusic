import { useEffect, useState } from 'react';
import * as Tone from 'tone';

const usePlayback = () => {
    const [isPlaying, _setIsPlaying] = useState(false);

    const play = () => {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
        isPlaying ? Tone.Transport.stop() : Tone.Transport.start();
        _setIsPlaying(prev => !prev);
    }

    return {
        isPlaying,
        play,
    }
}

export default usePlayback;
