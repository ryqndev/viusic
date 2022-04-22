import clsx from 'clsx';
import { useState } from 'react';
import { TrackItemProps } from '../../TrackList';
import useAudio from './controller/useAudio';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import cn from './Audio.module.scss';

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

const Audio = ({ setCurrent, ...props }: TrackItemProps) => {
	const [expanded, setExpanded] = useState(false);

	const { keyMapping } = useAudio(expanded);

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
			<div style={{ position: 'relative' }}>
				{expanded && Object.keys(keyMapping).map((key, idx) =>
					keyMapping[key][0].length === 2 ? (
						<div
							style={{
								backgroundColor: 'white',
								position: 'absolute',
								height: '250px',
								width: '50px',
								left: 54 * idx + 'px',
							}}
							key={key}
						>
							{key}
						</div>
					) : (
						<div
							style={{
								backgroundColor: 'black',
								position: 'absolute',
								height: '250px',
								width: '50px',
								left: 54 * idx + 'px',
							}}
							key={key}
						>
							{key}
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default Audio;
