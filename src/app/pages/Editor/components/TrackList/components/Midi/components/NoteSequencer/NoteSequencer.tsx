import { ReactElement, memo, useRef} from 'react';
import useNoteOutlineCanvas from './controllers/useNoteOutlineCanvas';
import useRCanvas from './controllers/useRCanvas';
import useMouseActions from './controllers/useMouseActions';
import cn from './NoteSequencer.module.scss';

interface NoteSequencerProps {
	hi: string;
	range: number;
	notes: any[];
	viewPosition: number;
	setNotes: (notes: any) => void;
	playNote: (note: string) => void;
}

const NoteSequencer = ({
	hi,
	range,
	notes,
	viewPosition,
	setNotes,
	playNote,
}: NoteSequencerProps): ReactElement => {
	// const containerRef = useRef(null);
	const bgCanvasRef = useNoteOutlineCanvas(notes, range, viewPosition);
	const userCanvasRef = useRCanvas(notes, range, viewPosition);
	const { showContextMenu, leftClick, rightClick } = useMouseActions(
		hi,
		range,
		notes,
		setNotes,
		playNote,
		viewPosition,
	);

	return (
		<>
			<div className={cn.container} >
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
						Split cell into 2
					</button>
					<button
						onClick={() => showContextMenu.generateSubdivision(3)}
					>
						Split cell into 3
					</button>
					<button
						onClick={() => showContextMenu.generateSubdivision(4)}
					>
						Split cell into 4
					</button>
					<input
						type='text'
						placeholder='Change note length'
						value=""
					/>
				</div>
			)}
		</>
	);
};

export default memo(NoteSequencer);
