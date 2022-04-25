import { useRef, useEffect, useCallback } from 'react';

const useCanvas = (draw: any) => {
    const canvasRef = useRef(null)

    const resizeCanvas = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): boolean => {
        // const { width, height } = canvas.getBoundingClientRect();
        // canvas.width = width;
        // console.log(width, height);
        // canvas.height = height;
        // if (canvas.width !== width || canvas.height !== height) {
        //     // const { devicePixelRatio: ratio = 1 } = window
        //     canvas.width = width;
        //     canvas.height = height;
        //     // ctx.scale(ratio, ratio);
        //     return true;
        // }

        return false;
    }, []);

    const _predraw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        ctx.save()
        resizeCanvas(canvas, ctx);
        const { width, height } = ctx.canvas;
        ctx.clearRect(0, 0, width, height);
    }, [resizeCanvas]);

    const _postdraw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        ctx.restore()
    }

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement | null;
        if (!canvas) return;

        const context = canvas.getContext('2d');

        if (!context) return;

        let animationFrameId: any;

        const render = () => {
            resizeCanvas(canvas, context);
            // _predraw(canvas, context);
            draw(canvas, context);
            // _postdraw(canvas, context);

            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [draw]);

    return canvasRef;
}
export default useCanvas;