import Dexie, { Table } from 'dexie';
import { Record } from './records.types';

class RecordsDatabase extends Dexie {

    records!: Table<Record>;

    constructor() {
        super('records');
        this.version(1).stores({
            records: 'id, meta.date.created, meta.date.edited, meta.name',
        });
    }
}

export const db = new RecordsDatabase();


