import useRecords from '../../../controllers/hooks/useRecords';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { Master, Transport } from 'tone';

const useEditor = () => {
    const { id } = useParams();
    const { getRecord, getMetaData } = useRecords();

    const metadata = useLiveQuery(() => getMetaData(id ?? ''));
    const project = useLiveQuery(() => getRecord(id ?? ''));

    useEffect(() => {
        Transport.timeSignature = [4, 4];
        Master.volume.value = -10;
        Transport.bpm.value = 120;
    }, []);

    return {
        metadata,
        project,
    }
}

export default useEditor;
