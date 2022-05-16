import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TrackItemProps } from '../../TrackList';
import useAudio from './controller/useAudio';
import * as Tone from 'tone';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import MuteButton from '../../../MuteButton';
import MonitorButton from '../../../MonitorButton';
import cn from './Audio.module.scss';

const Audio = ({ setCurrent, ...track }: TrackItemProps) => {
	const [expanded, setExpanded] = useState(false);
	const [availableDevices, setAvailableDevices] = useState([]);
	const { volume, setVolume } = useAudio(track);

	const select = () => {
		setExpanded(prev => !prev);
		setCurrent(track);
	};

	useEffect(() => {
		navigator.mediaDevices
			.enumerateDevices()
			.then((devices: any) => {
				setAvailableDevices(
					devices.filter((dev: any) => dev.kind === 'audioinput')
				);
			})
			.catch(console.error);
	}, []);

	const selectAud = () => {};

	return (
		<div
			className={clsx(cn.container, expanded && cn.expanded)}
			onClick={() => setCurrent(track)}
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
			<div
				style={{
					position: 'relative',
					overflow: 'scroll',
					gridColumn: '1 / 7',
				}}
			>
				<button onClick={selectAud}>select</button>
				{availableDevices.map((device: any) => (
					<>
						<br />
						{device.label}
					</>
				))}
			</div>
		</div>
	);
};

export default Audio;
