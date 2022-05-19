import { useState, memo } from 'react';
import type { Track } from '../../controllers/tracks.types';
import {
	TrackController,
	TrackDetails,
	TrackList,
	TrackTimeline,
	ProjectOverview,
} from './components';
import useEditor from './controllers/useEditor';
import usePlayback from './controllers/usePlayback';
import ProjectContext from './controllers/ProjectContext';
import { ViewPositionType } from './Editor.types';
import cn from './Editor.module.scss';
import TrackEditor from './components/TrackList/components/Midi/components/TrackEditor';

const Editor = () => {

	const {
		project,
		metadata,
		showCreateTrackPrompt,
		setShowCreateTrackPrompt,
	} = useEditor();
	const { isPlaying, play } = usePlayback();
	const [current, setCurrent] = useState<Track | null>(null);

	if (!project || !metadata) return null;

	return (
		<ProjectContext.Provider value={{ ...project, ...metadata }}>
			<div className={cn.container}>
				<ProjectOverview
					setShowCreateTrackPrompt={setShowCreateTrackPrompt}
				/>
				<TrackEditor
					className={cn.centerfold}
					project={project}
					current={current}
					setCurrent={setCurrent}
					showCreateTrackPrompt={showCreateTrackPrompt}
					setShowCreateTrackPrompt={setShowCreateTrackPrompt}
					isPlaying={isPlaying}
					play={play}
				/>
				{/* <div className={cn.centerfold}>
					<TrackTimeline
						viewPosition={viewPosition}
						setViewPosition={setViewPosition}
					/>
					<TrackList
						project={project}
						current={current}
						setCurrent={setCurrent}
						showCreateTrackPrompt={showCreateTrackPrompt}
						setShowCreateTrackPrompt={setShowCreateTrackPrompt}
						viewPosition={viewPosition}
						setViewPosition={setViewPosition}
					/>
					<TrackController isPlaying={isPlaying} play={play} />
				</div> */}
				<TrackDetails current={current} setCurrent={setCurrent} />
			</div>
		</ProjectContext.Provider>
	);
};

export default memo(Editor);
