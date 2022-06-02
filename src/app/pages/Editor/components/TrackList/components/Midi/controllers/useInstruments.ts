import { useState } from 'react';
import { Track } from '../../../../../../../controllers/tracks.types';
import INSTRUMENT_RANGES from '../assets/INSTRUMENT_RANGES.json';

interface TrackMetaData {
    recordid: string;
    trackid: string;
    length: number;
    notes?: Array<any>;
    hi: string;
    range: number;
    baseVolume: number;
    muted: boolean;
    monitored: boolean;
    sustain: number;
}

interface UseInstrumentsProps extends Track {
    recordid: string;
}

const useInstruments = (track: UseInstrumentsProps) => {
    const [data, setData] = useState<TrackMetaData>({
        ...INSTRUMENT_RANGES[track.instrument as keyof typeof INSTRUMENT_RANGES],
        ...track,
        trackid: track.id,
        sustain: track.sustain ?? 1.5,
        
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
