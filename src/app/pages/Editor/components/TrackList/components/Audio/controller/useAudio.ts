import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import useTracks from '../../../../../controllers/useTracks';
import type { Player } from 'tone';

const useAudio = (track: any, audioURL: null | string) => {
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

        const eventId = Tone.Transport.schedule((time) => {
            player.start(0, +0.2);
        }, 0);

        return () => { Tone.Transport.clear(eventId) };
    }, [player]);

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