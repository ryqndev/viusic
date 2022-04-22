interface Track {
    id: string;
    label: string;
    type: TrackType;
    instrument: Instrument;
    baseVolume: number;
    muted: boolean;
    monitored: boolean;
    length: number;
    repeat: [];
}

type TrackType = 
    'midi' | 'drum-machine' | 'audio';

type Instrument =
    'bassline-electric' | 'piano' | 'drums';


interface PianoTrack extends Track {
    notes: [];
}

export type {
    Track,
    TrackType,
    Instrument,
}