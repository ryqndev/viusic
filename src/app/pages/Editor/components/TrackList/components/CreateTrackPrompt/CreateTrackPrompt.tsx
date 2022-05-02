import clsx from 'clsx';
import Swal from 'sweetalert2';
import useTracks from '../../../../controllers/useTracks';
import type { Track } from '../../../../../../controllers/tracks.types';
import cn from './CreateTrackPrompt.module.scss';

interface CreateTrackPromptProps {
	className?: string;
	recordid: string;
	setCurrent: (track: Track | null) => void;
}

const CreateTrackPrompt = ({
	className,
	recordid,
	setCurrent,
}: CreateTrackPromptProps) => {
	const { createTrack, getTrack } = useTracks();
	const promptForCreateTrackType = async () => {
		const { value: instrument } = await Swal.fire({
			title: 'Create a new track',
			input: 'select',
			inputOptions: {
				MIDI: {
					midi_piano: 'Piano',
					'midi_bass-electric': 'Electric Bass',
					midi_harp: 'Harp',
					'midi_guitar-acoustic': 'Acoustic Guitar',
					midi_saxophone: 'Saxophone',
				},
				Audio: {
					audio_piano: 'Piano',
				},
			},
			inputPlaceholder: 'Select a track type',
			showCancelButton: true,
		});

		if (instrument) {
			const [type, sound] = instrument.split('_');
			createTrack(recordid, sound, type).then((idx: string) => {
				getTrack(recordid, idx).then(setCurrent);
			});
		}
	};
	return (
		<div
			className={clsx(cn.container, className)}
			onClick={promptForCreateTrackType}
		>
			<div>Add Track [ + ]</div>
		</div>
	);
};

export default CreateTrackPrompt;
