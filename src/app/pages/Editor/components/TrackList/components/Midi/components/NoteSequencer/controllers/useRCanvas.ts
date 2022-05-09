import { useRef, useEffect, useCallback } from 'react';

const KEY_HEIGHT = 16;
const MEASURE_WIDTH = 360;

const useRCanvas = (notes: any, range: number, viewPosition: number) => {
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
        switch (note) {
            case 1:
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(x, y, width, height);
                ctx.strokeRect(x, y, width, height);
                break;
        }
    }, []);

    const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        canvas.height = range * KEY_HEIGHT + 1;
        canvas.width = canvas.getBoundingClientRect().width;

        let offset = 0.5 - viewPosition;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;

        const lo = Math.floor(viewPosition / 360);
        const hi = lo + Math.ceil(canvas.width / 360) + 1;

        for (let key = 0; key < notes.length; key++) {
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
            }
        }
    }, [notes, range, drawNote, viewPosition]);

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