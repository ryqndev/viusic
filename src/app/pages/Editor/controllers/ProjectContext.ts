import { createContext } from 'react';
import type { RecordData, RecordMetadata } from '../../../controllers/records.types';

interface Record extends RecordData, RecordMetadata {

}

const ProjectContext = createContext<Record | null>(null);

export default ProjectContext;
