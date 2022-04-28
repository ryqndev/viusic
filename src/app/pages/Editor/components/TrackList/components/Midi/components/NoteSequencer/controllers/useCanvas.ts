import { useRef, useEffect, useCallback } from 'react';

const KEY_HEIGHT = 16;
const MEASURE_WIDTH = 360;

const useCanvas = (notes: any, range: number) => {
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
            case 0:
                ctx.strokeRect(x, y, width, height);
                break;
            case 1:
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(x, y, width, height);
                ctx.strokeRect(x, y, width, height);
                break;
        }
    }, []);

    const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        canvas.height = range * KEY_HEIGHT + 1;
        canvas.width = MEASURE_WIDTH * 8;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;

        for (let key = 0; key < notes.length; key++) {
            for (let measure = 0; measure < notes[key].length; measure++) {
                let note: Array<any> | number = notes[key][measure];
                ctx.strokeStyle = '#333';
                drawNote(
                    ctx,
                    note,
                    measure * MEASURE_WIDTH + 0.5,
                    key * KEY_HEIGHT + 0.5,
                    MEASURE_WIDTH,
                    KEY_HEIGHT
                );
                // measure start signifiers 
                ctx.strokeStyle = '#FFD700';
                ctx.beginPath();
                ctx.moveTo(measure * MEASURE_WIDTH + 0.5, key * KEY_HEIGHT + 0.5);
                ctx.lineTo(measure * MEASURE_WIDTH + 0.5, key * KEY_HEIGHT + 0.5 + MEASURE_WIDTH);
                ctx.stroke();
            }
        }
        // Stylistic decision
        ctx.strokeStyle = '#FFD700';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

    }, [notes, range, drawNote]);

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
            ctx.restore()

            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => window.cancelAnimationFrame(animationFrameId);

    }, [draw]);

    return canvasRef;
}
export default useCanvas;