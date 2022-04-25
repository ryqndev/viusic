import { useState } from 'react';
import type { Track } from '../../controllers/tracks.types';
import { TrackList, TrackDetails, ProjectOverview } from './components';
import useEditor from './controllers/useEditor';
import ProjectContext from './controllers/ProjectContext';
import cn from './Editor.module.scss';

const Editor = () => {
	const { project, metadata } = useEditor();
	const [current, setCurrent] = useState<Track | null>(null);

	if (!project || !metadata) return null;

	return (
		<ProjectContext.Provider value={{...project, ...metadata}}>
			<div className={cn.container}>
				<ProjectOverview />
				<div>
					<TrackList
						project={project}
						current={current}
						setCurrent={setCurrent}
					/>
				</div>
				<TrackDetails current={current} setCurrent={setCurrent} />
			</div>
		</ProjectContext.Provider>
	);
};

export default Editor;
