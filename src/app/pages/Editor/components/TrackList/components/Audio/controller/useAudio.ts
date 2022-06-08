import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import useTracks from '../../../../../controllers/useTracks';
import type { Player } from 'tone';

const useAudio = (track: any, distortion: number, offset: number, audioURL: null | string) => {
    const [volume, setVolume] = useState<number>(track.baseVolume / 100 * 21 - 20);
    const [player, setPlayer] = useState<null | Player>(
        audioURL ? new Tone.Player(audioURL).toDestination() : null);

    const { editTrack } = useTracks();

    useEffect(() => {
        if (!audioURL) return;
        setPlayer(new Tone.Player(audioURL).toDestination());

    }, [audioURL]);

    useEffect(() => {
        if (!player) return;
        player.connect(new Tone.Distortion(distortion).toDestination());

        return () => {
            player.dispose();
        }
    }, [player, distortion]);

    useEffect(() => {
        if(!player) return;

        player.volume.value = volume;
    }, [volume, player]);

    useEffect(() => {
        if (!player) return;


        player.sync().start(0, offset);

        return () => {
            player.unsync();
        }

    }, [player, offset]);

    useEffect(() => {
        editTrack(track.recordid, track.id, { baseVolume: Math.round((volume + 20) / 21 * 100) });
    }, [volume, track.id, track.recordid, editTrack]);

    return {
        player,
        volume,
        setVolume,
    }
}

export default useAudio;