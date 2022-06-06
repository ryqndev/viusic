import { db } from '../dexie';
import { useCallback } from 'react';
import type { RecordData, RecordMetadata } from '../records.types';

type PartialProjectMetaData = Partial<RecordMetadata>;
type PartialProjectData = Partial<RecordData>;

const useRecords = () => {
    const createNewRecord = useCallback((recordMetaData: RecordMetadata) => {
        return db.transaction('rw', db.records, db.metadata, () => {
            db.metadata.add(recordMetaData);
            db.records.add({ id: recordMetaData.id, tracks: [] });
        });
    }, []);
    const copyExistingRecord = useCallback((recordMetaData: RecordMetadata, recordData: RecordData) => {
        return db.transaction('rw', db.records, db.metadata, () => {
            db.metadata.add(recordMetaData);
            db.records.add(recordData);
        });
    }, []);

    const updateRecord = useCallback((id: string, record: PartialProjectData) => {
        return db.transaction('rw', db.records, db.metadata, () => {
            db.metadata.update(id, { 'date.edited': Date.now() });
            db.records.update(id, record);
        });
    }, []);

    const deleteRecord = useCallback((id: string) => {
        return db.transaction('rw', db.records, db.metadata, () => {
            db.metadata.delete(id);
            db.records.delete(id);
        });
    }, []);

    const getRecords = useCallback((max = 8) => {
        return db.metadata.orderBy('date.edited').reverse().limit(max).toArray();
    }, []);
    const getMetaData = useCallback((id: string) => {
        return db.metadata.get(id);
    }, []);

    const getRecord = useCallback((id: string) => {
        return db.records.get(id);
    }, []);

    const editMetaData = useCallback((id: string, meta: PartialProjectMetaData) => {
        return db.metadata.update(id, { ...meta, 'date.edited': Date.now() });
    }, []);

    return {
        createNewRecord,
        copyExistingRecord,
        deleteRecord,
        editMetaData,
        updateRecord,
        getMetaData,
        getRecords,
        getRecord,
    }
}


export default useRecords;
