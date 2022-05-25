import TrackController from '../../../../../TrackController';
import TrackTimeline from '../../../../../TrackTimeline';
import TrackList from '../../../../TrackList';
import { useState, memo } from 'react';
import type { ViewPositionType } from '../../../../../../Editor.types';
import cn from './TrackEditor.module.scss';
interface TrackEditorProps {
	className?: string;
	project: any;
	current: any;
	setCurrent: any;
	showCreateTrackPrompt: any;
	setShowCreateTrackPrompt: any;
	isPlaying: any;
	play: any;
}

const TrackEditor = ({
	className,
	project,
	current,
	setCurrent,
	showCreateTrackPrompt,
	setShowCreateTrackPrompt,
	isPlaying,
	play,
}: TrackEditorProps) => {
    const [viewPosition, setViewPosition] = useState<ViewPositionType>({
		x: 0,
		zoom: 1,
	});
	return (
		<div className={className}>
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
		</div>
	);
};

export default memo(TrackEditor);
