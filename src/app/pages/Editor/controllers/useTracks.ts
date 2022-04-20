import { db } from '../../../controllers/dexie';
import { v4 as uuid } from 'uuid';
import { useCallback } from 'react';
import { RecordData } from '../../../controllers/records.types';
import { Instrument, Track } from '../../../controllers/tracks.types';

const useTracks = () => {
    const getTrack = useCallback(async(recordid:string, id: string) => {
        const track = await db.records.where('id').equals(recordid).first();
        return track?.tracks?.find(track => track.id === id) ?? null;
    }, []);

    const createTrack = useCallback(async(id: string, instrument: Instrument) => {
        const uid = uuid();
        await db.records.where('id').equals(id).modify((record: RecordData) => record.tracks.push({
            id: uid,
            label: 'new ' + instrument,
            instrument: instrument,
            baseVolume: 50,
            muted: false,
            monitored: true,
            length: 0,
            repeat: [],
        }));
        return uid;
    }, []);

    const deleteTrack = useCallback((recordid: string, trackid: string) => {
        db.records
            .where('id')
            .equals(recordid)
            .modify(({ tracks }: { tracks: Track[] }) => {
                tracks = tracks.splice(
                    tracks.findIndex(({ id }: { id: string }) =>
                        id === trackid
                    ), 
                1);
            });
    }, []);

    return {
        createTrack,
        deleteTrack,
        getTrack,
    }
}

export default useTracks;
