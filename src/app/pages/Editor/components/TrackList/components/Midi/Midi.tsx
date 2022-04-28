import clsx from 'clsx';
import { useState, memo, useRef, useEffect } from 'react';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import cn from './Midi.module.scss';
import { KeyboardReference, NoteSequencer } from './components';
import useSound from './controllers/useSound';
import useNotes from './controllers/useNotes';
import useInstruments from './controllers/useInstruments';
import type { TrackItemProps } from '../../TrackList';

const Midi = ({
	setCurrent,
	setViewPosition,
	viewPosition,
	...track
}: TrackItemProps) => {
	const { data } = useInstruments(track);

	const trackRef = useRef<any>(null);
	const { notes, transportNotation, setNotes } = useNotes(data);
	const { synth } = useSound(track.instrument, transportNotation);

	const [expanded, setExpanded] = useState(false);

	const select = () => {
		setExpanded(prev => !prev);
		setCurrent(track);
	};

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
			<button
				className={clsx(cn.toggle, expanded && cn.expanded)}
				onClick={select}
			>
				<ExpandIcon />
			</button>
			{expanded && (
				<div className={cn.track}>
					<KeyboardReference
						hi={data.hi}
						range={data.range}
					/>
					<div
						className={cn.map}
						ref={trackRef}
						onScroll={(e: any) => {
							setViewPosition([e.target.scrollLeft, data.trackid]);
						}}
					>
						<NoteSequencer
							notes={notes}
							setNotes={setNotes}
							range={data.range}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(Midi);
