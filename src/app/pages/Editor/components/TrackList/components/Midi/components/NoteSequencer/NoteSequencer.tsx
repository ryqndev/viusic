import type { ReactElement } from 'react';
import useCanvas from './controllers/useCanvas';
import cn from './NoteSequencer.module.scss';

const NoteSequencer = (): ReactElement => {
	const draw = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = '#000000';
		ctx.beginPath();
		ctx.arc(50, 100, 20, 0, 2 * Math.PI);
		ctx.fill();
	};
	const canvasRef = useCanvas(draw);

	return <canvas className={cn.container} ref={canvasRef} />;
};

export default NoteSequencer;
