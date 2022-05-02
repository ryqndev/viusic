import { useCallback, useEffect, useState } from 'react';
import * as Tone from 'tone';

const usePlayback = () => {
    const [isPlaying, _setIsPlaying] = useState(false);

    const play = useCallback(() => {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
        isPlaying ? Tone.Transport.stop() : Tone.Transport.start("+0.1");
        _setIsPlaying(prev => !prev);
    }, [isPlaying]);

    useEffect(() => {
        const spacePress = (event: KeyboardEvent) => {
            if(event.key === ' ') {
                event.preventDefault();
                play();
            }
        }
        
        window.addEventListener('keydown', spacePress);

        return () => window.removeEventListener('keydown', spacePress);
    }, [play]);

    return {
        isPlaying,
        play,
    }
}

export default usePlayback;
