import { db } from '../dexie';
import { useCallback } from 'react';
import type { Record, RecordMetadata } from '../records.types';

type PartialProjectMetaData = Partial<RecordMetadata>;

const useRecords = () => {
    const createNewRecord = useCallback((recordMetaData: RecordMetadata) => {
        return db.records.add({ id: recordMetaData.id, meta: recordMetaData, tracks: [] });
    }, []);

    const createFromRecord = useCallback((record: Record) => {
        return db.records.add(record);
    }, []);

    const updateRecord = useCallback((record: Record) => {
        return db.records.update(record.id, record);
    }, []);

    const deleteRecord = useCallback((id: string) => {
        return db.records.delete(id);
    }, []);

    const getRecords = useCallback((max = 8) => {
        return db.records.orderBy('meta.date.edited').reverse().limit(max).toArray();
    }, []);

    const editMetaData = useCallback((id: string, meta: PartialProjectMetaData) => {
        return db.records.update(id, { meta });
    }, []);

    return {
        createNewRecord,
        createFromRecord,
        deleteRecord,
        editMetaData,
        updateRecord,
        getRecords,
    }
}


export default useRecords;
