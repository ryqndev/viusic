import { ReactElement, memo } from 'react';
import useNoteOutlineCanvas from './controllers/useNoteOutlineCanvas';
import useRCanvas from './controllers/useRCanvas';
import useMouseActions from './controllers/useMouseActions';
import cn from './NoteSequencer.module.scss';
import { ViewPositionType } from '../../../../../../Editor.types';

interface NoteSequencerProps {
	hi: string;
	range: number;
	notes: any[];
	viewPosition: ViewPositionType;
	setNotes: (notes: any) => void;
	playNote: (note: string) => void;
	keyHeight?: number;
	measureWidth?: number;
}

const KEY_HEIGHT = 16;
const MEASURE_WIDTH = 360;

const NoteSequencer = ({
	hi,
	range,
	notes,
	viewPosition,
	setNotes,
	playNote,
	keyHeight = KEY_HEIGHT,
	measureWidth = MEASURE_WIDTH,
}: NoteSequencerProps): ReactElement => {
	const bgCanvasRef = useNoteOutlineCanvas(
		notes,
		range,
		viewPosition.x,
		keyHeight,
		measureWidth * viewPosition.zoom
	);
	const userCanvasRef = useRCanvas(
		notes,
		range,
		viewPosition.x,
		keyHeight,
		measureWidth * viewPosition.zoom
	);
	const { showContextMenu, leftClick, rightClick } = useMouseActions(
		hi,
		range,
		notes,
		setNotes,
		playNote,
		viewPosition.x
	);

	return (
		<>
			<div className={cn.container}>
				<canvas id={cn.background} ref={bgCanvasRef}>
					Your browser does not support the canvas element. Please use
					the latest version of Chrome.
				</canvas>
				<canvas
					id={cn.user}
					ref={userCanvasRef}
					onClick={leftClick}
					onContextMenu={rightClick}
				></canvas>
			</div>
			{showContextMenu && (
				<div
					className={cn.menu}
					style={{ top: showContextMenu.y, left: showContextMenu.x }}
				>
					<button
						onClick={() => showContextMenu.generateSubdivision(2)}
					>
						Split cell into 2 (2)
					</button>
					<button
						onClick={() => showContextMenu.generateSubdivision(3)}
					>
						Split cell into 3 (3)
					</button>
					<button
						onClick={() => showContextMenu.generateSubdivision(4)}
					>
						Split cell into 4 (4)
					</button>
					<button
						onClick={() => {
							showContextMenu.changeNoteLength(
								(prev: any) => prev / 2
							);
						}}
					>
						halve
					</button>
					<button
						onClick={() => {
							showContextMenu.changeNoteLength(
								(prev: any) => prev * 2
							);
						}}
					>
						double
					</button>
					{/* {showContextMenu.value} */}
					{/* <input
						type='text'
						placeholder='Change note length'
						id='notelen'
						// value=	 */}
					{/* /> */}
				</div>
			)}
		</>
	);
};

export default memo(NoteSequencer);
