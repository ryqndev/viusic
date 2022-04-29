import { ReactElement, memo } from 'react';
import useCanvas from './controllers/useCanvas';
import useMouseActions from './controllers/useMouseActions';
import cn from './NoteSequencer.module.scss';

interface NoteSequencerProps {
	hi: string;
	range: number;
	notes: any[];
	setNotes: (notes: any) => void;
	playNote: (note: string) => void;
}

const NoteSequencer = ({
	hi,
	range,
	notes,
	setNotes,
	playNote,
}: NoteSequencerProps): ReactElement => {
	const canvasRef = useCanvas(notes, range);
	const { showContextMenu, leftClick, rightClick } =
		useMouseActions(hi, range, setNotes, playNote);

	return (
		<canvas
			className={cn.container}
			ref={canvasRef}
			onClick={leftClick}
			onContextMenu={rightClick}
		>
			{showContextMenu && <div className={cn.menu}>hi</div>}
		</canvas>
	);
};

export default memo(NoteSequencer);
