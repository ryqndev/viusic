import { ReactElement, memo } from 'react';
import useNoteOutlineCanvas from '../NoteSequencer/controllers/useNoteOutlineCanvas';
import useRCanvas from '../NoteSequencer/controllers/useRCanvas';
import cn from './NoninteractableNoteSequencer.module.scss';

interface NoninteractableNoteSequencerProps {
	hi: string;
	range: number;
	notes: any[];
	viewPosition: number;
	setNotes: (notes: any) => void;
	playNote: (note: string) => void;
	keyHeight?: number;
	measureWidth?: number;
}

const KEY_HEIGHT = 16;
const MEASURE_WIDTH = 360;

const NoninteractableNoteSequencer = ({
	range,
	notes,
	viewPosition, 
	keyHeight = KEY_HEIGHT,
	measureWidth = MEASURE_WIDTH,
}: NoninteractableNoteSequencerProps): ReactElement => {
	const bgCanvasRef = useNoteOutlineCanvas(notes, range, viewPosition, keyHeight, measureWidth);
	const userCanvasRef = useRCanvas(notes, range, viewPosition, keyHeight, measureWidth);

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
				></canvas>
			</div>
		</>
	);
};

export default memo(NoninteractableNoteSequencer);
