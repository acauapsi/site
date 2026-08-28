/* ==========================================================================
   React Bits — ClickSpark Official Component Engine (PraXys Integration)
   Radial Golden Spark Burst on Mouse Click
   ========================================================================== */

(function () {
    const sparkColor = '#C0894E'; // Brand Acauã Copper
    const sparkSize = 16;         // Spark line length
    const sparkRadius = 26;       // Travel radius
    const sparkCount = 12;        // 12 radial spark lines
    const duration = 450;         // 450ms animation duration
    const extraScale = 1.0;

    let canvas, ctx;
    let sparks = [];

    function initCanvas() {
        canvas = document.createElement('canvas');
        canvas.id = 'click-spark-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;user-select:none;';
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();
    }

    function easeOut(t) {
        return t * (2 - t);
    }

    function draw(timestamp) {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparks = sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= duration) return false;

            const progress = elapsed / duration;
            const eased = easeOut(progress);

            const distance = eased * sparkRadius * extraScale;
            const lineLength = sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            ctx.strokeStyle = sparkColor;
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            return true;
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('click', (e) => {
        if (!canvas) return;
        const x = e.clientX;
        const y = e.clientY;
        const now = performance.now();

        for (let i = 0; i < sparkCount; i++) {
            sparks.push({
                x,
                y,
                angle: (2 * Math.PI * i) / sparkCount,
                startTime: now
            });
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initCanvas();
            requestAnimationFrame(draw);
        });
    } else {
        initCanvas();
        requestAnimationFrame(draw);
    }
})();
