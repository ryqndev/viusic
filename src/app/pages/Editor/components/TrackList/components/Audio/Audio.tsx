import clsx from 'clsx';
import { useEffect, useState, memo } from 'react';
import { TrackItemProps } from '../../TrackList';
import useAudio from './controller/useAudio';
import useRecorder from './controller/useRecorder';
import * as Tone from 'tone';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import MuteButton from '../../../MuteButton';
import MonitorButton from '../../../MonitorButton';
import cn from './Audio.module.scss';
import SoundMeter from '../SoundMeter';

const Audio = ({ setCurrent, ...track }: TrackItemProps) => {
	const [distortion, setDistortion] = useState(0);
	const {
		availableDevices,
		selectedDeviceId,
		audioURL,
		selectInput,
		recorderState,
		recordInput,
	} = useRecorder(track.id, track.recordid, track.data);
	const [expanded, setExpanded] = useState(false);
	const [offset, setOffset] = useState(0.2);
	const { player, volume, setVolume } = useAudio(track, distortion, offset, audioURL);
	const [outputLevel, setOutputLevel] = useState(0);

	const select = () => {
		setExpanded(prev => !prev);
		setCurrent(track.id);
	};

	useEffect(() => {
		if (!player) return;

		const meter = new Tone.Meter();
		meter.normalRange = true;

		player.connect(meter);

		const soundCheck = setInterval(() => {
			const outputDecibels = meter.getValue();
			if (Array.isArray(outputDecibels) || !isFinite(outputDecibels))
				setOutputLevel(0);
			else setOutputLevel(outputDecibels < 0.01 ? 0 : outputDecibels);
		}, 100);
		return () => clearInterval(soundCheck);
	}, [player]);

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
			<div className={cn.track}>
				<SoundMeter level={outputLevel} />
				<div>
					{expanded ? (
						<>
							<button 
								onClick={recordInput}
								disabled={!selectedDeviceId}
							>
								{recorderState === 'recording'
									? 'stop'
									: 'record'}
							</button>
							<br />
							state: {recorderState}
							<br />
							selected device: {selectedDeviceId ?? 'none'}
							<br />
							{availableDevices.map((device: any) => (
								<div
									key={device.deviceId}
									onClick={() => selectInput(device.deviceId)}
								>
									<br />
									{device.label}
								</div>
							))}
							distortion: <input
								type='range'
								name='volume'
								value={distortion * 20}
								onChange={e => setDistortion(parseInt(e.target.value) / 20)}
								min={0}
								max={10}
								step={1}
							/>
							offset: <input
								type='range'
								name='volume'
								value={offset * 100}
								onChange={e => setOffset(parseInt(e.target.value) / 100)}
								min={0}
								max={100}
								step={1}
							/>
						</>
					) : audioURL ? (
						<>audio</>
					) : (
						<h2>No Audio Recorded Yet</h2>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(Audio);
