import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import useTracks from '../../../../../controllers/useTracks';

const useAudio = (track: any) => {
    const [volume, setVolume] = useState<number>(track.baseVolume / 100 * 21 - 20);
    const { editTrack } = useTracks();

    useEffect(() => {
        // synth.volume.value = volume;
        editTrack(track.recordid, track.id, { baseVolume: Math.round((volume + 20) / 21 * 100) });
    }, [volume, track.id, track.recordid, editTrack]);
    return {
        volume,
        setVolume,
    }
}

export default useAudio;