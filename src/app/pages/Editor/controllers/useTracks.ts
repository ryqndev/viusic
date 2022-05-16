import { db } from '../../../controllers/dexie';
import { v4 as uuid } from 'uuid';
import { useCallback } from 'react';
import { RecordData } from '../../../controllers/records.types';
import { Instrument, Track, TrackType } from '../../../controllers/tracks.types';
import useRecords from '../../../controllers/hooks/useRecords';

interface PartialTrack extends Partial<Track> {}

const useTracks = () => {
    const { editMetaData } = useRecords();

    const getTrack = useCallback(async (recordid: string, id: string) => {
        editMetaData(recordid, {});
        const track = await db.records.get(recordid);
        return track?.tracks?.find(track => track.id === id) ?? null;
    }, [editMetaData]);

    const createTrack = useCallback(async (recordid: string, instrument: Instrument, type: TrackType) => {
        const uid = uuid();
        editMetaData(recordid, {});
        await db.records.where('id').equals(recordid).modify((record: RecordData) => record.tracks.push({
            id: uid,
            label: 'new ' + instrument,
            type: type,
            instrument: instrument,
            baseVolume: 50,
            muted: false,
            monitored: true,
            length: 60,
            repeat: [],
            sustain: 1.5,
        }));
        return uid;
    }, [editMetaData]);

    const editTrack = useCallback((recordid: string, trackid: string, data: PartialTrack) => {
        editMetaData(recordid, {});
        return db.records.where('id').equals(recordid).modify((record: RecordData) => {
            let track:number = record.tracks.findIndex(track => track.id === trackid);
            record.tracks[track] = { ...record.tracks[track], ...data};
        });

    }, [editMetaData]);

    const deleteTrack = useCallback((recordid: string, trackid: string) => {
        editMetaData(recordid, {});
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
    }, [editMetaData]);

    return {
        createTrack,
        deleteTrack,
        editTrack,
        getTrack,
    }
}

export default useTracks;
