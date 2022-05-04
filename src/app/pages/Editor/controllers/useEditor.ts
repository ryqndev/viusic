import useRecords from '../../../controllers/hooks/useRecords';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { Master, Transport } from 'tone';

const useEditor = () => {
    const [showCreateTrackPrompt, setShowCreateTrackPrompt] = useState(false);

    const { id } = useParams();
    const { getRecord, getMetaData } = useRecords();

    const metadata = useLiveQuery(() => getMetaData(id ?? ''));
    const project = useLiveQuery(() => getRecord(id ?? ''));

    useEffect(() => {
        if(!metadata) return;
        
        Transport.timeSignature = [4, 4];
        Master.volume.value = metadata.masterVolume ?? -10;
        Transport.bpm.value = metadata.bpm ?? 120;
    }, [metadata]);

    return {
        metadata,
        project,
        showCreateTrackPrompt,
        setShowCreateTrackPrompt,
    }
}

export default useEditor;
