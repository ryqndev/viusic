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
    notes?: any;
}

type TrackType = 
    'midi' | 'drum-machine' | 'audio';

type Instrument =
    'bass-electric' | 'bassoon' | 'cello' | 'clarinet' | 'contrabass' | 'drum' | 'flute' | 'french-horn' | 'guitar-acoustic' | 'guitar-electric' |  'guitar-nylon' | 'harmonium' | 'harp' | 'organ' | 'piano' | 'saxophone' | 'trombone' | 'trumpet' | 'tuba' | 'violin' | 'xylophone';


interface PianoTrack extends Track {
    notes: [];
}

export type {
    Track,
    TrackType,
    Instrument,
}