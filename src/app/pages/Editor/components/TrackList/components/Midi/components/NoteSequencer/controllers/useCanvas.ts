import { useRef, useEffect, useCallback } from 'react';

const KEY_HEIGHT = 16;

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
        canvas.width = 72 * 4 * 8;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;

        for (let key = 0; key < notes.length; key++) {
            for (let beat = 0; beat < notes[key].length; beat++) {
                let note: Array<any> | number = notes[key][beat];
                drawNote(
                    ctx,
                    note,
                    beat * 72 + 0.5,
                    key * KEY_HEIGHT + 0.5,
                    72,
                    KEY_HEIGHT
                );
            }
        }
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