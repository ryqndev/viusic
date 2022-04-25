import type { ReactElement } from 'react';
import useCanvas from './controllers/useCanvas';
import cn from './NoteSequencer.module.scss';

interface NoteSequencerProps {
	range: number;
}

const NoteSequencer = ({ range }: NoteSequencerProps): ReactElement => {
	const draw = (canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const {width} = canvas.getBoundingClientRect();
        canvas.height = range * 16;
        canvas.width = width;
        
        // canvas.width = range * 16;
		// ctx.fillStyle = '#000000';
		// ctx.beginPath();
		// ctx.arc(50, 100, 20, 0, 2 * Math.PI);
		// ctx.fill();
	};
	const canvasRef = useCanvas(draw);

	return (
		<canvas
			className={cn.container}
			ref={canvasRef}
		/>
	);
};

export default NoteSequencer;
