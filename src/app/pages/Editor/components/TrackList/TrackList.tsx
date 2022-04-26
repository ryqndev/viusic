import clsx from 'clsx';
import Swal from 'sweetalert2';
import type { ReactElement } from 'react';
import { memo } from 'react';
import { RecordData } from '../../../../controllers/records.types';
import { Track } from '../../../../controllers/tracks.types';
import useTracks from '../../controllers/useTracks';
import { Midi, Audio } from './components';
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
	const { createTrack, getTrack } = useTracks();

	const promptForCreateTrackType = async () => {
		const { value: instrument } = await Swal.fire({
			title: 'Create a new track',
			input: 'select',
			inputOptions: {
				MIDI: {
					'midi_piano': 'Piano',
					'midi_bass-electric': 'Electric Bass',
					'midi_harp': 'Harp',
					'midi_guitar-acoustic': 'Acoustic Guitar',
					'midi_saxophone': 'Saxophone',
				},
				Audio: {
					'audio_piano': 'Piano',
				},
			},
			inputPlaceholder: 'Select a track type',
			showCancelButton: true,
		});

		if (instrument) {
			const [type, sound] = instrument.split('_');
			createTrack(project.id, sound, type).then(idx => {
				getTrack(project.id, idx).then(setCurrent);
			});
		}
	};

	return (
		<div className={cn.container}>
			{project.tracks
				.slice(0)
				.reverse()
				.map(track => (
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
	switch (props.type) {
		case 'midi': 
			return <Midi {...props} />;
		case 'audio':
			return <Audio {...props} />;
		case 'drum-machine':
			return <Midi {...props} />;	
	}
});

export default TrackList;
export type { TrackItemProps };
