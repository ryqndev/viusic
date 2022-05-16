import { useRef, useEffect, useCallback } from 'react';

const useNoteOutlineCanvas = (notes: any, range: number, viewPosition: number, KEY_HEIGHT: number, MEASURE_WIDTH: number) => {
    const canvasRef = useRef(null);

    const drawNote = useCallback((
        ctx: CanvasRenderingContext2D,
        note: Array<any> | number,
        x: number,
        y: number,
        width: number,
        height: number
    ) => {
        if (Array.isArray(note)) {
            let subWidth = width / note.length;
            note.forEach((n, i) => {
                drawNote(ctx, n, x + subWidth * i, y, subWidth, height);
            });
            return;
        }
        ctx.strokeRect(x, y, width, height);
    }, []);

    const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        let offset = 0.5 - viewPosition;
        canvas.height = range * KEY_HEIGHT + 1;
        canvas.width = canvas.getBoundingClientRect().width;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;

        const lo = Math.floor(viewPosition / MEASURE_WIDTH);
        const hi = lo + Math.ceil(canvas.width / MEASURE_WIDTH) + 1;

        for (let key = 0; key < notes.length; key++) {
            // for (let measure = 0; measure < notes[key].length; measure++) {
            for (let measure = lo; measure < hi; measure++) {
                let note: Array<any> | number = notes[key][measure];
                ctx.strokeStyle = '#333';
                drawNote(
                    ctx,
                    note,
                    measure * MEASURE_WIDTH + offset,
                    key * KEY_HEIGHT + 0.5,
                    MEASURE_WIDTH,
                    KEY_HEIGHT
                );
                // measure start signifiers 
                ctx.strokeStyle = '#FFD700';
                ctx.beginPath();
                ctx.moveTo(measure * MEASURE_WIDTH + offset, key * KEY_HEIGHT + 0.5);
                ctx.lineTo(measure * MEASURE_WIDTH + offset, key * KEY_HEIGHT + 0.5 + MEASURE_WIDTH);
                ctx.stroke();
            }
        }
        // Stylistic decision
        ctx.strokeStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();

    }, [notes, range, drawNote, viewPosition]);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement | null;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });

        if (!ctx) return;

        let animationFrameId: any;

        const render = () => {
            ctx.save()
            const { width, height } = ctx.canvas;
            ctx.clearRect(0, 0, width, height);
            draw(canvas, ctx);
            ctx.restore()

            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => window.cancelAnimationFrame(animationFrameId);

    }, [draw]);

    return canvasRef;
}
export default useNoteOutlineCanvas;