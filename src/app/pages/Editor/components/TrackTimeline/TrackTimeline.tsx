import type { MouseEvent, ReactElement } from 'react';
import { ViewPositionType } from '../../Editor.types';
import cn from './TrackTimeline.module.scss';

interface TrackTimelineProps {
	viewPosition: ViewPositionType;
	setViewPosition: (newViewPosition: any) => void;
}

const TrackTimeline = ({
	viewPosition,
	setViewPosition,
}: TrackTimelineProps): ReactElement => {
	const move = (event: MouseEvent) => {
		if(event.buttons !== 1) return;
		// console.log(event.nativeEvent.offsetX, (event.target as HTMLDivElement).clientWidth);
	}

	return (
		<div
			className={cn.container}
			// onWheel={(e: WheelEvent<HTMLDivElement>) => {
			// 	e.preventDefault();
			// 	setViewPosition((prev: ViewPositionType) => {
			// 		const newVPos = prev.x + e.deltaX;
			// 		const newZoom = prev.zoom + e.deltaY / 100;

			// 		return { 
			// 			x: newVPos <= 0 ? 0 : newVPos, 
			// 			zoom: (newZoom > 0.5 && newZoom < 10) ? newZoom : prev.zoom 
			// 		};
			// 	});
			// }}
			onMouseMove={move}
		>
			{JSON.stringify(viewPosition)}
			<div></div>
		</div>
	);
};

export default TrackTimeline;
