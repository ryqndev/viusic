import useRecords from '../../../controllers/hooks/useRecords';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';

const useEditor = () => {
    const { id } = useParams();
	const { getRecord, getMetaData } = useRecords();


	const metadata = useLiveQuery(() => getMetaData(id ?? ''));
	const project = useLiveQuery(() => getRecord(id ?? ''));

    return {
        metadata,
        project,
    }
}

export default useEditor;