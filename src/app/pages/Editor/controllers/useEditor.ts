import useRecords from '../../../controllers/hooks/useRecords';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';

const useEditor = () => {
    const { id } = useParams();
	const { getRecord } = useRecords();

	const project = useLiveQuery(() => getRecord(id));

    return {
        project,
    }
}

export default useEditor;