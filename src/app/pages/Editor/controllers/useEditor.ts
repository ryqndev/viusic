import useRecords from '../../../controllers/hooks/useRecords';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import * as Tone from 'tone';

const useEditor = () => {
    const { id } = useParams();
	const { getRecord, getMetaData } = useRecords();

	const metadata = useLiveQuery(() => getMetaData(id ?? ''));
	const project = useLiveQuery(() => getRecord(id ?? ''));

    useEffect(() => {
        Tone.Transport.bpm.value = 103;
    }, []);

    return {
        metadata,
        project,
    }
}

export default useEditor;