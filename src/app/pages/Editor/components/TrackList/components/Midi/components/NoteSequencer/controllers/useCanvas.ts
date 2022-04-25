import { useRef, useEffect } from 'react';

const useCanvas = (draw: any) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement | null;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        let animationFrameId: any;

        const render = () => {
            draw(context);
            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [draw])

    return canvasRef;
}
export default useCanvas;