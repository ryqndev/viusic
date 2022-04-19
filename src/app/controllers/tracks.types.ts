interface Track {
    id: string;
    label: string;
    instrument: Instrument;
    baseVolume: number;
    muted: boolean;
    monitored: boolean;
    length: number;
    repeat: [];
}

type Instrument =
    'bassline-electric' | 'piano';


interface PianoTrack extends Track {
    notes: [];
}

export type {
    Track,
    Instrument,
}