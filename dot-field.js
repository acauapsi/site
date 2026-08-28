/* ==========================================================================
   React Bits — DotField Component (Vanilla JS Canvas Adapter for Entire Site BG)
   Interactive Dot Grid with Cursor Bulge Physics & Gold Glow Effect
   ========================================================================== */

(function () {
    const TWO_PI = Math.PI * 2;

    function initDotField() {
        // Prevent duplicate containers
        if (document.getElementById('dot-field-bg')) return;

        const bgContainer = document.createElement('div');
        bgContainer.id = 'dot-field-bg';
        bgContainer.style.cssText = 'position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; overflow: hidden;';

        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;';
        bgContainer.appendChild(canvas);

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;';
        
        const glowId = 'dot-field-glow-' + Math.random().toString(36).slice(2, 9);
        svg.innerHTML = `
            <defs>
                <radialGradient id="${glowId}">
                    <stop offset="0%" stop-color="rgba(192, 137, 78, 0.20)" />
                    <stop offset="100%" stop-color="transparent" />
                </radialGradient>
            </defs>
            <circle id="glow-circle-${glowId}" cx="-9999" cy="-9999" r="220" fill="url(#${glowId})" style="opacity: 0; transition: opacity 0.3s ease; pointer-events: none;" />
        `;
        bgContainer.appendChild(svg);

        const glowEl = svg.querySelector(`#glow-circle-${glowId}`);
        const ctx = canvas.getContext('2d', { alpha: true });
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Component Settings (Acauã Palette)
        const dotRadius = 1.5;
        const dotSpacing = 18;
        const cursorRadius = 450;
        const bulgeStrength = 75;
        const gradientFrom = 'rgba(192, 137, 78, 0.28)'; // Copper Accent Start
        const gradientTo = 'rgba(27, 75, 79, 0.12)';     // Petrol Accent End

        let dots = [];
        let mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
        let size = { w: 0, h: 0 };
        let glowOpacity = 0;
        let engagement = 0;
        let frameCount = 0;
        let rafId = null;

        function doResize() {
            const w = window.innerWidth;
            const h = window.innerHeight;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            size = { w, h };
            buildDots(w, h);
        }

        function buildDots(w, h) {
            const step = dotRadius + dotSpacing;
            const cols = Math.floor(w / step);
            const rows = Math.floor(h / step);
            const padX = (w % step) / 2;
            const padY = (h % step) / 2;
            dots = new Array(rows * cols);
            let idx = 0;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const ax = padX + col * step + step / 2;
                    const ay = padY + row * step + step / 2;
                    dots[idx++] = { ax, ay, sx: ax, sy: ay };
                }
            }
        }

        function onMouseMove(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }

        function updateMouseSpeed() {
            const dx = mouse.prevX - mouse.x;
            const dy = mouse.prevY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            mouse.speed += (dist - mouse.speed) * 0.5;
            if (mouse.speed < 0.001) mouse.speed = 0;
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;
        }

        setInterval(updateMouseSpeed, 20);

        function tick() {
            frameCount++;
            const { w, h } = size;
            const len = dots.length;

            const targetEngagement = Math.min(mouse.speed / 5, 1);
            engagement += (targetEngagement - engagement) * 0.06;
            if (engagement < 0.001) engagement = 0;

            glowOpacity += (engagement - glowOpacity) * 0.08;

            if (glowEl) {
                glowEl.setAttribute('cx', mouse.x);
                glowEl.setAttribute('cy', mouse.y);
                glowEl.style.opacity = glowOpacity;
            }

            ctx.clearRect(0, 0, w, h);

            const grad = ctx.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0, gradientFrom);
            grad.addColorStop(1, gradientTo);
            ctx.fillStyle = grad;

            const crSq = cursorRadius * cursorRadius;
            const rad = dotRadius / 2;

            ctx.beginPath();

            for (let i = 0; i < len; i++) {
                const d = dots[i];
                const dx = mouse.x - d.ax;
                const dy = mouse.y - d.ay;
                const distSq = dx * dx + dy * dy;

                if (distSq < crSq && engagement > 0.01) {
                    const dist = Math.sqrt(distSq);
                    const t = 1 - dist / cursorRadius;
                    const push = t * t * bulgeStrength * engagement;
                    const angle = Math.atan2(dy, dx);
                    d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
                    d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
                } else {
                    d.sx += (d.ax - d.sx) * 0.1;
                    d.sy += (d.ay - d.sy) * 0.1;
                }

                ctx.moveTo(d.sx + rad, d.sy);
                ctx.arc(d.sx, d.sy, rad, 0, TWO_PI);
            }

            ctx.fill();
            rafId = requestAnimationFrame(tick);
        }

        window.addEventListener('resize', doResize);
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        doResize();
        rafId = requestAnimationFrame(tick);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDotField);
    } else {
        initDotField();
    }
})();
