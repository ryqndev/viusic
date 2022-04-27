import clsx from 'clsx';
import { useState, memo, useRef, useEffect } from 'react';
import { TrackItemProps } from '../../TrackList';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import cn from './Midi.module.scss';
import { KeyboardReference, NoteSequencer } from './components';
import useSound from './controllers/useSound';
import useNotes from './controllers/useNotes';

const Midi = ({
	setCurrent,
	setViewPosition,
	viewPosition,
	...track
}: TrackItemProps) => {
	const [trackDomain] = useState({
		recordid: track.recordid,
		trackid: track.id,
		start: 0,
		length: 4,
		hi: 'c5',
		defaultBeats: 6,
		range: 32,
		notes: track?.notes,
	});

	const trackRef = useRef<any>(null);
	const { notes, transportNotation, setNotes } = useNotes(trackDomain);
	const { synth } = useSound(track.instrument, transportNotation);

	const [expanded, setExpanded] = useState(false);

	const select = () => {
		setExpanded(prev => !prev);
		setCurrent(track);
	};

	useEffect(() => {
		if (!trackRef?.current) return;
		trackRef.current.scrollTo({ left: viewPosition });
	}, [viewPosition]);

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
						hi={trackDomain.hi}
						range={trackDomain.range}
					/>
					<div
						className={cn.map}
						ref={trackRef}
						onScroll={(e: any) => {
							setViewPosition(e.target.scrollLeft);
						}}
					>
						<NoteSequencer
							notes={notes}
							setNotes={setNotes}
							range={trackDomain.range}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(Midi);
