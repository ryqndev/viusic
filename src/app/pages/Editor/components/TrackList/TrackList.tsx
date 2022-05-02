import clsx from 'clsx';
import type { ReactElement } from 'react';
import { memo, useState } from 'react';
import { RecordData } from '../../../../controllers/records.types';
import { Track } from '../../../../controllers/tracks.types';
import { Midi, Audio } from './components';
import cn from './TrackList.module.scss';
import CreateTrackPrompt from './components/CreateTrackPrompt';

interface TrackListProps {
	project: RecordData;
	current: Track | null;
	setCurrent: (track: Track | null) => void;
}

const TrackList = ({
	project,
	current,
	setCurrent,
}: TrackListProps): ReactElement => {
	const [viewPosition, setViewPosition] = useState(0);

	return (
		<div className={cn.container}>
			{project.tracks.map(track => (
				<TrackItem
					viewPosition={viewPosition}
					setViewPosition={setViewPosition}
					key={track.id}
					selected={current?.id === project.id}
					recordid={project.id}
					setCurrent={setCurrent}
					{...track}
				/>
			))}
			<CreateTrackPrompt
				className={clsx(cn.new, cn.track)}
				recordid={project.id} 
				setCurrent={setCurrent} />
		</div>
	);
};

interface TrackItemProps extends Track {
	viewPosition: any;
	setViewPosition: (newViewPosition: any) => void;
	selected: boolean;
	recordid: string;
	setCurrent: (track: Track | null) => void;
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
