import { useState } from 'react';
import type { Track } from '../../controllers/tracks.types';
import { TrackList, TrackDetails } from './components';
import useEditor from './controllers/useEditor';
import ProjectContext from './controllers/ProjectContext';
import cn from './Editor.module.scss';

const Editor = () => {
	const { project } = useEditor();
	const [current, setCurrent] = useState<Track | null>(null);

	if (!project) return null;

	return (
		<ProjectContext.Provider value={project}>
			<div className={cn.container}>
				<div className={cn.overview}></div>
				<TrackList
					project={project}
					current={current}
					setCurrent={setCurrent}
				/>
				<TrackDetails current={current} setCurrent={setCurrent}/>
			</div>
		</ProjectContext.Provider>
	);
};

export default Editor;
