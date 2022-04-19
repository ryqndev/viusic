import { createContext } from 'react';
import type { RecordData } from '../../../controllers/records.types';

const ProjectContext = createContext<RecordData | null>(null);

export default ProjectContext;
