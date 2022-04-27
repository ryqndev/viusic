import { ReactElement, memo } from 'react';
import useCanvas from './controllers/useCanvas';
import useMouseActions from './controllers/useMouseActions';
import cn from './NoteSequencer.module.scss';

interface NoteSequencerProps {
	range: number;
	notes: any[];
	setNotes: (notes: any) => void;
}

const NoteSequencer = ({
	range,
	notes,
	setNotes,
}: NoteSequencerProps): ReactElement => {
	const canvasRef = useCanvas(notes, range);
	const { showContextMenu, leftClick, rightClick } = useMouseActions(
		canvasRef,
		setNotes,
	);

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
