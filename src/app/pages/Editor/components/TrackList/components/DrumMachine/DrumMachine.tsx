import clsx from 'clsx';
import { useState } from 'react';
import { TrackItemProps } from '../../TrackList';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import cn from './DrumMachine.module.scss';
import useDrums from './controller/useDrums';
import MonitorButton from '../../../MonitorButton';
import MuteButton from '../../../MuteButton';

const DrumMachine = ({ setCurrent, ...track }: TrackItemProps) => {
	const [expanded, setExpanded] = useState(false);
	// const [trackDomain, setTrackDomain] = useState({
	// 	start: 0,
	// 	length: 0,
	// 	hi: 'e4',
	// 	lo: 'e2',
	// });
	const [beat, setBeat] = useState([
		[1, 1, 1, 1, 1, 1, 1, 1,], // hi hat
		[0, 0, 1, 0, 0, 0, 1, 0,], // snare
		[1, 0, 0, 1, 1, 0, 0, 0,], // bass
	]);
	const {volume, setVolume} = useDrums({...track, beat: beat});

	const select = () => {
		setExpanded(prev => !prev);
		setCurrent(track.id);
	};

	return (
		<div
			className={clsx(cn.container, expanded && cn.expanded)}
			onClick={() => setCurrent(track.id)}
		>
            <h2>{track.label}</h2>
			<h2 className={cn.instrument}>[{track.instrument}]</h2>
			<div></div>
			<div className={cn.volume}>
				<input
					type='range'
					name='volume'
					value={volume}
					onChange={e => setVolume(parseInt(e.target.value))}
					min={-20}
					max={1}
					step={1}
				/>
			</div>
			<MonitorButton
				recordid={track.recordid}
				trackid={track.id}
				monitored={track.monitored}
			/>
			<MuteButton
				recordid={track.recordid}
				trackid={track.id}
				muted={track.muted}
			/>
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
