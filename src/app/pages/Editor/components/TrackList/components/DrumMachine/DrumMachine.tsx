import clsx from 'clsx';
import { useState } from 'react';
import { TrackItemProps } from '../../TrackList';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import cn from './DrumMachine.module.scss';

const DrumMachine = ({ setCurrent, ...props }: TrackItemProps) => {
	const [expanded, setExpanded] = useState(false);
	const [trackDomain, setTrackDomain] = useState({
		start: 0,
		length: 0,
		hi: 'e4',
		lo: 'e2',
	});
	const select = () => {
		setExpanded(prev => !prev);
		setCurrent(props.id);
	};

	return (
		<div
			className={clsx(cn.container, expanded && cn.expanded)}
			onClick={() => setCurrent(props.id)}
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
			{expanded && <>
                {}
            </>}
		</div>
	);
};

export default DrumMachine;
