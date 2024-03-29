import { useRef, useEffect, useCallback } from 'react';

const useRCanvas = (notes: any, range: number, viewPosition: number, KEY_HEIGHT: number, MEASURE_WIDTH: number) => {
    const canvasRef = useRef(null);

    const drawNote = useCallback((
        ctx: CanvasRenderingContext2D,
        note: Array<any> | number,
        x: number,
        y: number,
        width: number,
        height: number
    ) => {
        if (note === 0) return;
        if (Array.isArray(note)) {
            let subWidth = width / note.length;
            note.forEach((n, i) => {
                drawNote(ctx, n, x + subWidth * i, y, subWidth, height);
            });
            return;
        }

        ctx.fillStyle = '#FFD700';
        ctx.fillRect(x, y, width * note, height);
    }, []);

    const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        canvas.height = range * KEY_HEIGHT + 20;
        canvas.width = canvas.getBoundingClientRect().width;

        let offset = 0.5 - viewPosition;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;

        const lo = Math.floor(viewPosition / MEASURE_WIDTH);
        const hi = lo + Math.ceil(canvas.width / MEASURE_WIDTH) + 1;

        for (let key = 0; key < notes.length; key++) {
            for (let measure = lo; measure < hi; measure++) {
                let note: Array<any> | number = notes[key][measure];
                ctx.strokeStyle = '#333';
                drawNote(
                    ctx,
                    note,
                    measure * MEASURE_WIDTH + offset,
                    key * KEY_HEIGHT + 0.5 + 18,
                    MEASURE_WIDTH,
                    KEY_HEIGHT
                );
            }
        }
    }, [notes, range, drawNote, viewPosition, KEY_HEIGHT, MEASURE_WIDTH]);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement | null;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        let animationFrameId: any;

        const render = () => {
            ctx.save()
            const { width, height } = ctx.canvas;
            ctx.clearRect(0, 0, width, height);
            draw(canvas, ctx);
            ctx.restore();

            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => window.cancelAnimationFrame(animationFrameId);

    }, [draw]);

    return canvasRef;
}
export default useRCanvas;