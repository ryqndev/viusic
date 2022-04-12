import Dexie, { Table } from 'dexie';
import { RecordMetadata, Record } from './records.types';

class RecordsDatabase extends Dexie {

    records!: Table<Record, string>;

    constructor () {
        super("viusic");
        this.version(1).stores({
            records: 'id',
        });
    }
}



export {
}