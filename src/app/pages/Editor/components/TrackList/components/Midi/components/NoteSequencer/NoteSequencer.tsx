import { ReactElement, useEffect } from 'react';
import useCanvas from './controllers/useCanvas';
import cn from './NoteSequencer.module.scss';

interface NoteSequencerProps {
	range: number;
	notes: any[];
}

const NoteSequencer = ({ range, notes }: NoteSequencerProps): ReactElement => {
	const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
		canvas.height = range * 16 + 1;
		canvas.width = 72 * 4 * 8;

		ctx.strokeStyle = '#888';
		ctx.lineWidth = 1;

        // value will be 2 if it's a slur?

		for (let note = 0; note < notes.length; note++) {
			for (let beat = 0; beat < notes[note].length; beat++) {
				let mapping: Array<number> | 0 = notes[note][beat];

				if (typeof mapping === 'number'){
                    mapping === 0 ? ctx.fillStyle = '#181818' : ctx.fillStyle = '#262626';
					ctx.fillRect(beat * 72 + 0.5, note * 16 + 0.5, 72, 16);
					ctx.strokeRect(beat * 72 + 0.5, note * 16 + 0.5, 72, 16);
                    continue;
                }

                // drawNote(ctx, );
                    
                //     // ctx.strokeRect(beat * 72 + 0.5, note * 16 + 0.5, 72, 16);
                //     // drawNote(ctx);
			}
		}
	};

	const drawNote = (ctx: CanvasRenderingContext2D, note:Array<Array<any> | number>) => {

    };

	const canvasRef = useCanvas(draw);

	const cursorHover = (event: any) => {
		// const rect = canvas.getBoundingClientRect();
		const x = event.nativeEvent.offsetX;
		const y = event.nativeEvent.offsetY;

		const canvas = canvasRef.current as HTMLCanvasElement | null;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		if (!ctx) return;

		console.log(x, y);
		ctx.strokeStyle = '#888';
		ctx.lineWidth = 1;
		ctx.fillStyle = '#fff';
		ctx.strokeRect(20, 20, 100, 16);
		// console.log('x: ' + event.nativeEvent.offsetX + ' y: ' + event.nativeEvent.offsetY);
		// console.log('x: ' + x + ' y: ' + y);
	};

    const click = (event:any) => {
        const x = event.nativeEvent.offsetX;
		const y = event.nativeEvent.offsetY;

		const canvas = canvasRef.current as HTMLCanvasElement | null;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		if (!ctx) return;

		console.log(x, y);
		ctx.strokeStyle = '#888';
		ctx.lineWidth = 1;
		ctx.fillStyle = '#fff';
		ctx.fillRect(20, 20, 100, 16);
    }

	// useEffect(() => {
	// 	canvasRef.current.addEventListener('mousedown', function (e) {
	// 		getCursorPosition(canvas, e);
	// 	});
	// }, []);

	return (
		<canvas
			className={cn.container}
			ref={canvasRef}
			onMouseMove={cursorHover}
            onClick={click}
		></canvas>
	);
};

export default NoteSequencer;
