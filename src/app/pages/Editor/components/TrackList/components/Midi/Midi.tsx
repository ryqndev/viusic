import clsx from 'clsx';
import { useState, useEffect, useCallback } from 'react';
import type { Track } from '../../../../../../controllers/tracks.types';
import * as Tone from 'tone';
import { TrackItemProps } from '../../TrackList';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import cn from './Midi.module.scss';

// let tracki = {
// 	name: 'bassline',
// 	uuid: '1679722d-a019-4f11-b45c-d04a6e52307d',
// 	instrument: 'bass-electric',
// 	length: '4m',
// 	hi: 'E3',
// 	lo: 'E2',
// 	notes: [
// 		['0:0:0', ['E3', '8n']],
// 		['0:0:3', ['E3', '16n']],
// 		['0:1:0', ['E2', '8n']],
// 		['0:1:2', ['F#2', '8n']],
// 		['0:2:0', ['G2', '8n']],
// 		['0:3:0', ['D3', '4n']],
// 		['1:0:0', ['C3', '16n']],
// 		['1:1:0', ['B2', '16n']],
// 		['1:1:3', ['B2', '32n']],
// 		['1:2:0', ['C3', '32n']],
// 		['1:2:1', ['B2', '16n']],
// 		['1:2:3', ['B2', '16n']],
// 		['1:3:0', ['C3', '16n']],
// 		['1:3:1', ['B2', '16n']],
// 		['1:3:2', ['A2', '16n.']],
// 		['2:0:0', ['B2', '8n.']],
// 		['2:0:3', ['B2', '16n']],
// 		['2:1:0', ['E2', '8n']],
// 		['2:1:2', ['F#2', '8n']],
// 		['2:2:0', ['G2', '8n']],
// 		['2:3:0', ['D3', '8n']],
// 		['2:3:2', ['C3', '8n']],
// 		['3:0:0', ['B2', '8n']],
// 		['3:1:0', ['A2', '8n']],
// 		['3:2:0', ['B2', '4n']],
// 	],
// };

const Midi = ({ setCurrent, ...props }: TrackItemProps) => {
	const [notes, setNotes] = useState([]);
	const [synth, setSynth] = useState(() => new Tone.PolySynth().toDestination());
	const [expanded, setExpanded] = useState(false);
	const [trackDomain, setTrackDomain] = useState({
		start: 0,
		length: 0,
		hi: 'e4',
		lo: 'e2',
	});
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
			<div>
			</div>
		</div>
	);
};

export default Midi;
