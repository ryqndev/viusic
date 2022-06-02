import clsx from 'clsx';
import type { ReactElement } from 'react';
import { memo } from 'react';
import { RecordData } from '../../../../controllers/records.types';
import { Track } from '../../../../controllers/tracks.types';
import { Midi, Audio } from './components';
import cn from './TrackList.module.scss';
import CreateTrackPrompt from './components/CreateTrackPrompt';
import { ViewPositionType } from '../../Editor.types';

interface TrackListProps {
	showCreateTrackPrompt: boolean;
	setShowCreateTrackPrompt: (prev: boolean) => void;
	project: RecordData;
	current: null | string;
	setCurrent: (trackid: null | string) => void;
	viewPosition: ViewPositionType;
	setViewPosition: (position: any) => void;
	play: () => void;
}

const TrackList = ({
	project,
	current,
	showCreateTrackPrompt,
	setCurrent,
	setShowCreateTrackPrompt,
	viewPosition,
	setViewPosition,
	play,
}: TrackListProps): ReactElement => {
	return (
		<div className={cn.container}>
			{project.tracks.map(track => (
				<TrackItem
					viewPosition={viewPosition}
					setViewPosition={setViewPosition}
					key={track.id}
					selected={current === project.id}
					recordid={project.id}
					setCurrent={setCurrent}
					{...track}
				/>
			))}
			{project.tracks.length === 0 && (
				<div className={cn.empty}>
					Hey! Looks like you don't have any tracks yet. Let's get
					started by adding a track by either clicking the [+ Add
					Track] button below or the [+] button on the tracklist on
					the left.
				</div>
			)}
			<button
				className={clsx(cn.new, cn.track)}
				onClick={() => setShowCreateTrackPrompt(true)}
			>
				<div>Add Track [ + ]</div>
			</button>

			<CreateTrackPrompt
				recordid={project.id}
				setCurrent={setCurrent}
				showCreateTrackPrompt={showCreateTrackPrompt}
				setShowCreateTrackPrompt={setShowCreateTrackPrompt}
			/>
		</div>
	);
};

interface TrackItemProps extends Track {
	viewPosition: ViewPositionType;
	setViewPosition: (newViewPosition: any) => void;
	selected: boolean;
	recordid: string;
	setCurrent: (track: null | string) => void;
}

const TrackItem = memo((props: TrackItemProps): ReactElement | null => {
	switch (props.type) {
		case 'midi':
			return <Midi {...props} />;
		case 'audio':
			return <Audio {...props} />;
		case 'drum-machine':
			return <Midi {...props} />;
	}
});

export default memo(TrackList);
export type { TrackItemProps };
