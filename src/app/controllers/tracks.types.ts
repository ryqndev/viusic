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
    sustain?: number;
}

type TrackType = 
    'midi' | 'drum-machine' | 'audio';

type Instrument =
    'bass-electric' | 'bell' | 'bassoon' | 'cello' | 'clarinet' | 'contrabass' | 'drum' | 'flute' | 'french-horn' | 'guitar-acoustic' | 'guitar-electric' |  'guitar-nylon' | 'harmonium' | 'harp' | 'organ' | 'piano' | 'saxophone' | 'trombone' | 'trumpet' | 'tuba' | 'violin' | 'xylophone';


interface MidiTrack extends Track {
    notes: [];
    sustain: number;
}

export type {
    Track,
    TrackType,
    Instrument,
}
