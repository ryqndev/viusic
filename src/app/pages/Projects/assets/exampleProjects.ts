import { RecordMetadata } from "../../../controllers/records.types";

const EXAMPLE_PROJECTS: RecordMetadata[] = [
    {
        "id": "sample-dream-on",
        "name": "Dream on",
        "artist": "Aerosmith",
        "date": {
            "created": 1654508979705,
            "edited": 1654515443245
        },
        "bpm": 80,
        "masterVolume": -10,
        "timeSignature": [
            4,
            4
        ]
    },
    {
        "id": "sample-playing-god",
        "name": "Playing God",
        "artist": "Polyphia",
        "date": {
            "created": 1654115927140,
            "edited": 1654511406757
        },
        "bpm": 137,
        "masterVolume": -10,
        "timeSignature": [
            4,
            4
        ]
    },
    {
        "id": "sample-fantaisie-impromptu",
        "name": "Fantaisie-Impromptu in C# Minor",
        "artist": "Frédéric François Chopin",
        "date": {
            "created": 1651365727009,
            "edited": 1654508941189
        },
        "bpm": 160,
        "masterVolume": -10,
        "timeSignature": [
            4,
            4
        ]
    }
];

export default EXAMPLE_PROJECTS;
