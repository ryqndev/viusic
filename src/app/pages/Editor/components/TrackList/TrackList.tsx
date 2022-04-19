import clsx from 'clsx';
import type { ReactElement } from 'react';
import React, { memo } from 'react';
import { RecordData } from '../../../../controllers/records.types';
import { Track } from '../../../../controllers/tracks.types';
import useTracks from '../../controllers/useTracks';
import { Midi } from './components';
import cn from './TrackList.module.scss';

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
	const { createTrack } = useTracks();

	const promptForCreateTrackType = () => {
		// TODO: prompt instrument type. currently just default piano
		createTrack(project.id, 'piano');
	};

	return (
		<div className={cn.container}>
			{project.tracks.map(track => (
				<TrackItem
					key={track.id}
					{...track}
					selected={current?.id === project.id}
					setCurrent={setCurrent}
				/>
			))}
			<div
				className={clsx(cn.track, cn.new)}
				onClick={promptForCreateTrackType}
			>
				Add Track [ + ]
			</div>
		</div>
	);
};

interface TrackItemProps extends Track {
	selected: boolean;
	setCurrent: (track: Track | null) => void;
}

const TrackItem = memo((props: TrackItemProps): ReactElement | null => {
	switch (props.instrument) {
		case 'piano':
			return <Midi {...props} />;
		case 'bassline-electric':
			return <Midi {...props} />;
	}
});

export default TrackList;
export type { TrackItemProps };
