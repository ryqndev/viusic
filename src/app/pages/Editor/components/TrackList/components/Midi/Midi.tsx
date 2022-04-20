import clsx from 'clsx';
import { useState } from 'react';
import type { Track } from '../../../../../../controllers/tracks.types';
import { TrackItemProps } from '../../TrackList';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import cn from './Midi.module.scss';

const Midi = ({ setCurrent, ...props }: TrackItemProps) => {
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
            <h2>{props.instrument}</h2>
            <div></div>
			<button
				className={clsx(cn.toggle, expanded && cn.expanded)}
				onClick={select}
			>
				<ExpandIcon />
			</button>
			{/* 8 beat measures */}
			<></>
		</div>
	);
};

export default Midi;
