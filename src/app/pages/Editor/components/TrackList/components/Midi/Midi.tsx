import clsx from 'clsx';
import { useState, memo, useRef, useEffect, WheelEvent } from 'react';
import { ReactComponent as ExpandIcon } from '../../../../../../../assets/icons/expand.svg';
import MuteButton from '../../../MuteButton';
import MonitorButton from '../../../MonitorButton';
import { KeyboardReference, NoteSequencer } from './components';
import useSound from './controllers/useSound';
import useNotes from './controllers/useNotes';
import useInstruments from './controllers/useInstruments';
import type { TrackItemProps } from '../../TrackList';
import * as Tone from 'tone';
import cn from './Midi.module.scss';
import SoundMeter from '../SoundMeter';
import NoninteractableNoteSequencer from './components/NoninteractableNoteSequencer';
import { ViewPositionType } from '../../../../Editor.types';

const Midi = ({
	setCurrent,
	setViewPosition,
	viewPosition,
	...track
}: TrackItemProps) => {
	const [outputLevel, setOutputLevel] = useState<number>(0);
	const { data } = useInstruments(track);

	const trackRef = useRef<HTMLDivElement>(null);
	const { notes, transportNotation, setNotes } = useNotes(data);
	const { synth, playNote, volume, setVolume } = useSound(
		track,
		transportNotation
	);

	const [expanded, setExpanded] = useState(false);

	// useEffect(() => {
	// 	if (!trackRef?.current || track.id === viewPosition[1]) return;
	// 	trackRef.current.scrollLeft = viewPosition[0];
	// }, [viewPosition, track.id]);

	useEffect(() => {
		const meter = new Tone.Meter();
		meter.normalRange = true;
		synth.connect(meter);

		const soundCheck = setInterval(() => {
			const outputDecibels = meter.getValue();
			if (Array.isArray(outputDecibels) || !isFinite(outputDecibels))
				setOutputLevel(0);
			else setOutputLevel(outputDecibels < 0.005 ? 0 : outputDecibels);
		}, 100);
		return () => clearInterval(soundCheck);
	}, [synth]);

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
				onClick={() => setExpanded(prev => !prev)}
			>
				<ExpandIcon />
			</button>
			{expanded ? (
				<div className={cn.track}>
					<div style={{ paddingTop: '17px' }}>
						<KeyboardReference hi={data.hi} range={data.range} />
					</div>
					<div
						className={cn.map}
						ref={trackRef}
						onWheel={(e: WheelEvent<HTMLDivElement>) => {
							setViewPosition((prev: ViewPositionType) => {
								if (e.deltaX === 0) return prev;
								const newVPos = prev.x + e.deltaX;
								if (newVPos <= 0)
									return { x: 0, zoom: prev.zoom };
								// TODO: add max horizontal scrolling
								return { x: newVPos, zoom: prev.zoom };
							});
						}}
					>
						<NoteSequencer
							hi={data.hi}
							notes={notes}
							setNotes={setNotes}
							range={data.range}
							playNote={playNote}
							viewPosition={viewPosition}
						/>
					</div>
				</div>
			) : (
				<div className={clsx(cn.track, cn.hidden)}>
					<SoundMeter level={outputLevel} />
					<div
						className={cn.map}
						ref={trackRef}
						onWheel={(e: WheelEvent<HTMLDivElement>) => {
							setViewPosition((prev: ViewPositionType) => {
								const newVPos = prev.x + e.deltaX;
								if (newVPos <= 0)
									return { x: 0, zoom: prev.zoom };
								return { x: newVPos, zoom: prev.zoom };
							});
						}}
					>
						<NoninteractableNoteSequencer
							hi={data.hi}
							notes={notes}
							setNotes={setNotes}
							range={data.range}
							playNote={playNote}
							viewPosition={viewPosition}
							keyHeight={115 / data.range}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(Midi);
