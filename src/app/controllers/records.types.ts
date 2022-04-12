interface Record {
    metadata: RecordMetadata;
    tracks: [];
}

interface RecordMetadata {
    name: string;
    artist: string;
    id: string;
    date: {
        created: number;
        edited: number;
    }
}


interface Track {
    instrument: Instrument;
}

type Instrument =
    'bassline-electric' | 'piano';

export type {
    Record, 
    RecordMetadata,
    Track,
    Instrument,
}

