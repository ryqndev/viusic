import type { Track } from './tracks.types';

interface RecordData {
    id: string;
    tracks: Track[];
}

interface RecordMetadata {
    id: string;
    name: string;
    artist: string;
    date: {
        created: number;
        edited: number;
    }
    bpm?: number | any[];
    timeSignature?: number | any[];
    masterVolume?: number | any[];
}

export type {
    RecordData, 
    RecordMetadata,
}

