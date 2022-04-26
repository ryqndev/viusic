import clsx from 'clsx';
import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { TrackItemProps } from '../../TrackList';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import cn from './Midi.module.scss';
import { KeyboardReference, NoteSequencer } from './components';
import INSTRUMENTS from '../../../../../../../assets/samples/samples.json';

const sample = [["0:0:0", ["E3" , "8n"  ]],
["0:0:3", ["E3" , "16n" ]],
["0:1:0", ["E2" , "8n"  ]],
["0:1:2", ["F#2", "8n"  ]],
["0:2:0", ["G2",  "8n"  ]],
["0:3:0", ["D3",  "4n"  ]],
["1:0:0", ["C3",  "16n" ]],
["1:1:0", ["B2",  "16n" ]],
["1:1:3", ["B2",  "32n" ]],
["1:2:0", ["C3",  "32n" ]],
["1:2:1", ["B2",  "16n" ]],
["1:2:3", ["B2",  "16n" ]],
["1:3:0", ["C3",  "16n" ]],
["1:3:1", ["B2",  "16n" ]],
["1:3:2", ["A2",  "16n."]],
["2:0:0", ["B2",  "8n." ]],
["2:0:3", ["B2",  "16n" ]],
["2:1:0", ["E2" , "8n"  ]],
["2:1:2", ["F#2", "8n"  ]],
["2:2:0", ["G2",  "8n"  ]],
["2:3:0", ["D3",  "8n"  ]],
["2:3:2", ["C3",  "8n"  ]],
["3:0:0", ["B2",  "8n"  ]],
["3:1:0", ["A2",  "8n"  ]],
["3:2:0", ["B2",  "4n"  ]]];



const Midi = ({ setCurrent, ...props }: TrackItemProps) => {
	const [trackDomain, setTrackDomain] = useState({
		start: 0,
		length: 8,
		hi: 'c5',
		defaultBeats: 4,
		range: 32,
	});
	const [notes, setNotes] = useState<any>(() =>
		new Array(trackDomain.range)
			.fill(0)
			.map(_ => new Array(trackDomain.length * 4).fill(0))
	);
	const [synth, setSynth] = useState(() =>
		new Tone.Sampler({
			urls: INSTRUMENTS[props.instrument as keyof typeof INSTRUMENTS],
			release: 1,
			baseUrl: `${process.env.PUBLIC_URL}/assets/samples/${props.instrument}/`,
		}).toDestination()
	);
	// const [synth, setSynth] = useState(() =>
	// 	new Tone.PolySynth().toDestination()
	// );

	const [part, setPart] = useState(() => 
		new Tone.Part((time, note) => {
			synth.triggerAttackRelease(
				note[0],
				note[1],
				time
			);
		}, sample).start(0)
	);

	const [expanded, setExpanded] = useState(false);

	const select = () => {
		setExpanded(prev => !prev);
		setCurrent(props);
	};

	useEffect(() => {
		return () => {
			part.dispose();
		}
	}, [part]);

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
						<NoteSequencer notes={notes} setNotes={setNotes} range={trackDomain.range}/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Midi;
