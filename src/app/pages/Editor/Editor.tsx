import { useState, memo } from 'react';
import type { Track } from '../../controllers/tracks.types';
import { TrackController, TrackDetails, TrackList, ProjectOverview } from './components';
import useEditor from './controllers/useEditor';
import usePlayback from './controllers/usePlayback';
import ProjectContext from './controllers/ProjectContext';
import cn from './Editor.module.scss';

const Editor = () => {
	const { project, metadata } = useEditor();
	const { isPlaying, play } = usePlayback();
	const [current, setCurrent] = useState<Track | null>(null);

	if (!project || !metadata) return null;

	return (
		<ProjectContext.Provider value={{...project, ...metadata}}>
			<div className={cn.container}>
				<ProjectOverview />
				<div className={cn.centerfold}>
					<TrackList
						project={project}
						current={current}
						setCurrent={setCurrent}
					/>
					<TrackController isPlaying={isPlaying} play={play}/>
				</div>
				<TrackDetails current={current} setCurrent={setCurrent} />
			</div>
		</ProjectContext.Provider>
	);
};

export default memo(Editor);
