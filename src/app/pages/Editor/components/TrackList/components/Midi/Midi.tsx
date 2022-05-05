import clsx from 'clsx';
import { useState, memo, useRef, useEffect, WheelEvent } from 'react';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import { ReactComponent as MutedIcon } from '../../../../../../../assets/icons/muted.svg';
import { ReactComponent as VolumeUpIcon } from '../../../../../../../assets/icons/volume_up.svg';
import { ReactComponent as HeadsetIcon } from '../../../../../../../assets/icons/headset.svg';
import { ReactComponent as HeadsetOffIcon } from '../../../../../../../assets/icons/headset_off.svg';
import cn from './Midi.module.scss';
import { KeyboardReference, NoteSequencer } from './components';
import useSound from './controllers/useSound';
import useNotes from './controllers/useNotes';
import useInstruments from './controllers/useInstruments';
import type { TrackItemProps } from '../../TrackList';
import useTracks from '../../../../controllers/useTracks';

const Midi = ({
	setCurrent,
	setViewPosition,
	viewPosition,
	...track
}: TrackItemProps) => {
	const { data } = useInstruments(track);

	const { editTrack } = useTracks();

	const trackRef = useRef<HTMLDivElement>(null);
	const { notes, transportNotation, setNotes } = useNotes(data);
	const { playNote } = useSound(
		track.instrument,
		transportNotation,
		track.muted
	);

	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		if (!trackRef?.current || data.trackid === viewPosition[1]) return;
		trackRef.current.scrollLeft = viewPosition[0];
	}, [viewPosition, data.trackid]);

	return (
		<div
			className={clsx(cn.container, expanded && cn.expanded)}
			onClick={() => setCurrent(track)}
		>
			<h2>{track.label}</h2>
			<h2 className={cn.instrument}>[{track.instrument}]</h2>
			<div></div>
			<div
				className={clsx(cn['track-icon'], cn.sound)}
				onClick={() => editTrack(track.recordid, track.id, { monitored: !track.monitored })}
			>
				{track.monitored ? (
					<HeadsetIcon viewBox='0 0 48 48' fill='#FFD700' />
				) : (
					<HeadsetOffIcon viewBox='0 0 48 48' fill='red' />
				)}
			</div>
			<div
				className={clsx(cn['track-icon'], cn.sound)}
				onClick={() => editTrack(track.recordid, track.id, { muted: !track.muted })}
			>
				{track.muted ? (
					<MutedIcon viewBox='0 0 48 48' fill='red' />
				) : (
					<VolumeUpIcon viewBox='0 0 48 48' fill='#FFD700' />
				)}
			</div>
			<button
				className={clsx(cn.toggle, expanded && cn.expanded)}
				onClick={() => setExpanded(prev => !prev)}
			>
				<ExpandIcon />
			</button>
			{expanded && (
				<div className={cn.track}>
					<KeyboardReference hi={data.hi} range={data.range} />
					<div
						className={cn.map}
						ref={trackRef}
						onWheel={(e: WheelEvent<HTMLDivElement>) => {
							setViewPosition((prev: number) => {
								const newVPos = prev + e.deltaX;
								if(newVPos <= 0) return 0;
								// TODO: add max horizontal scrolling
								return newVPos;
							});
						}}
					>
						<NoteSequencer
							hi={data.hi}
							notes={notes}
							setNotes={setNotes}
							range={data.range}
							playNote={playNote}
							viewPosition={viewPosition}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(Midi);
