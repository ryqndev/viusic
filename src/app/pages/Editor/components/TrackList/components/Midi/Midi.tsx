import clsx from 'clsx';
import { useState } from 'react';
import * as Tone from 'tone';
import { TrackItemProps } from '../../TrackList';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import cn from './Midi.module.scss';
import { KeyboardReference, NoteSequencer } from './components';
// []
/**
 * SHIFT + select should select multiple, offer the ability to merge cells - like its excel
 *
 */

const Midi = ({ setCurrent, ...props }: TrackItemProps) => {
	const [trackDomain, setTrackDomain] = useState({
		start: 0,
		length: 8,
		hi: 'c7',
		// lo: 'a0',
		range: 64,
	});
	const [notes, setNotes] = useState<any>(() =>
		new Array(trackDomain.range)
			.fill(0)
			.map(_ => new Array(trackDomain.length).fill(0))
	);
	const [synth, setSynth] = useState(() =>
		new Tone.PolySynth().toDestination()
	);
	const [expanded, setExpanded] = useState(false);

	const select = () => {
		setExpanded(prev => !prev);
		setCurrent(props);
	};

	return (
		<div
			className={clsx(cn.container, expanded && cn.expanded)}
			onClick={() => setCurrent(props)}
		>
			<h2>{props.label}</h2>
			<h2 className={cn.instrument}>[{props.instrument}]</h2>
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
					<div className={cn.map}>
						<NoteSequencer />
						{/* {notes.map((key: any, idx: number) => (
							<div key={idx} className={cn.key}> */}
								{/* {key.map((measure: any, idx: number) => (
									<div key={idx} className={cn.measure}></div>
								))} */}
							{/* </div>
						))} */}
					</div>
				</div>
			)}
		</div>
	);
};

export default Midi;
