import clsx from 'clsx';
import { useEffect, useState } from 'react';
import useTracks from '../../../../controllers/useTracks';
import type {
	Instrument,
	Track,
	TrackType,
} from '../../../../../../controllers/tracks.types';
import { ReactComponent as CloseIcon } from '../../../../../../../assets/icons/close.svg';
import TRACK_TYPES from './assets/track-types.json';
import cn from './CreateTrackPrompt.module.scss';

interface CreateTrackPromptProps {
	recordid: string;
	showCreateTrackPrompt: boolean;
	setCurrent: (trackid: null | string) => void;
	setShowCreateTrackPrompt: (show: boolean) => void;
}

const CreateTrackPrompt = ({
	recordid,
	setCurrent,
	showCreateTrackPrompt,
	setShowCreateTrackPrompt,
}: CreateTrackPromptProps) => {
	const [trackType, setTrackType] = useState<number>(0);
	const [soundType, setSoundType] = useState<number>(0);

	const selected = TRACK_TYPES[trackType];

	const { createTrack, getTrack } = useTracks();
	const createNewTrack = async () => {
		if (!selected.options || !selected.type) return;
		createTrack(
			recordid,
			selected.options[soundType].value as Instrument,
			selected.type as TrackType
		).then((idx: string) => {
			getTrack(recordid, idx).then(() => setCurrent(idx));
			setShowCreateTrackPrompt(false);
		});
	};

	// useEffect(() => {
	// 	setSoundType(0);
	// }, [trackType]);

	return (
		<div
			className={clsx(cn.backdrop, showCreateTrackPrompt && cn.show)}
			onClick={() => setShowCreateTrackPrompt(false)}
		>
			<div className={cn.container} onClick={e => e.stopPropagation()}>
				<button
					className={cn.close}
					onClick={() => setShowCreateTrackPrompt(false)}
				>
					<CloseIcon viewBox='0 0 48 48'/>
				</button>
				<h1>Create a New Track</h1>
				<span>
					There are different ways of creating music. Each of the
					track types below create sound in a different way - you just
					have to pick which one you want. If you're new to this,
					you'll probably want to create a MIDI track first!
				</span>
				<h2>Select Track Type <span>[{selected.label}]</span></h2>
				<div className={cn.type}>
					{TRACK_TYPES.map(
						({ type, label, description }, idx: number) => (
							<div
								key={type}
								className={clsx(
									cn.card,
									selected.type === type && cn.selected
								)}
								onClick={() => {
									setSoundType(0);
									setTrackType(idx);
								}}
							>
								<h3>{label}</h3>
								<p>{description}</p>
							</div>
						)
					)}
				</div>
				<h2>Select Instrument Type <span>[{selected.options[soundType].label}]</span></h2>
				<div className={cn.type}>
					{selected.options.map(
						({ label, value, description }, idx: number) => (
							<div
								key={value}
								className={clsx(
									cn.card,
									cn.long,
									selected.options[soundType].value ===
										value && cn.selected
								)}
								onClick={() => setSoundType(idx)}
							>
								<h3>{label}</h3>
								{/* <p>{description}</p> */}
							</div>
						)
					)}
				</div>
				<div className={cn.actions}>
					<button
						className={cn.cancel}
						onClick={() => setShowCreateTrackPrompt(false)}
					>
						close
					</button>
					<button className={cn.create} onClick={createNewTrack}>
						create
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateTrackPrompt;
