import Dexie, { Table } from 'dexie';
import { RecordData, RecordMetadata } from './records.types';

class RecordsDatabase extends Dexie {

    metadata!: Table<RecordMetadata>;
    records!: Table<RecordData>;

    constructor() {
        super('records');
        this.version(1).stores({
            metadata: 'id, date.created, date.edited, name',
            records: 'id',
        });
    }
}

export const db = new RecordsDatabase();


