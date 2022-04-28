import { useState } from 'react';
import INSTRUMENT_RANGES from '../assets/INSTRUMENT_RANGES.json';

interface TrackMetaData {
    recordid: string;
    trackid: string;
    start: number;
    length: number;
    notes: Array<any>;
    hi: string;
    range: number;
}

const useInstruments = (track: any) => {
    const [data, setData] = useState<TrackMetaData>({
        recordid: track.recordid,
        trackid: track.id,
        start: 0,
        length: 40,
        notes: track?.notes,
        ...INSTRUMENT_RANGES[track.instrument as keyof typeof INSTRUMENT_RANGES]
    });

    const editTrackData = (data: any) => {
        // TODO: set track data as well
        setData(prev => ({ ...prev, ...data }));
    }

    return {
        data: data,
        editTrackData,
    }
}

export default useInstruments;

export type {
    TrackMetaData,
}
