/* ==========================================================================
   Acauã — TextLoop Ribbon Divider (Continuous Marquee Below Hero Fold)
   Powered by GSAP 3 (No pause on hover, exclusive copy)
   ========================================================================== */

(function () {
    function initTextLoop() {
        const container = document.getElementById('text-loop-section');
        if (!container) return;

        container.innerHTML = ''; // Clear previous content
        container.className = 'w-full bg-[#C0894E] py-3.5 overflow-hidden text-[#121F21] shadow-[0_4px_25px_rgba(192,137,78,0.25)] relative z-20 select-none';

        const marqueeWrap = document.createElement('div');
        marqueeWrap.className = 'flex whitespace-nowrap items-center font-heading font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#121F21] w-max';

        // Exclusive copy distinct from Hero rotating text
        const unitHTML = `
            <span class="inline-flex items-center gap-6 px-4 font-bold">
                <span>ACAUÃ TECH</span>
                <span class="opacity-60 text-xs">✦</span>
                <span>SITES PARA PSICÓLOGOS</span>
                <span class="opacity-60 text-xs">✦</span>
                <span>GESTÃO CLÍNICA 100% OFFLINE</span>
                <span class="opacity-60 text-xs">✦</span>
                <span>CONFORMIDADE CFP & LGPD</span>
                <span class="opacity-60 text-xs">✦</span>
                <span>ACAUÃ APP & SITES</span>
                <span class="opacity-60 text-xs">✦</span>
                <span>INDEPENDÊNCIA DIGITAL</span>
                <span class="opacity-60 text-xs">✦</span>
            </span>
        `;

        marqueeWrap.innerHTML = unitHTML.repeat(6);
        container.appendChild(marqueeWrap);

        // GSAP Continuous Loop Animation (Never pauses on hover)
        function startGSAPMarquee() {
            if (typeof gsap === 'undefined') return;

            const singleWidth = marqueeWrap.scrollWidth / 2;
            gsap.to(marqueeWrap, {
                x: `-=${singleWidth}`,
                duration: 25,
                ease: 'none',
                repeat: -1
            });
        }

        setTimeout(startGSAPMarquee, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTextLoop);
    } else {
        initTextLoop();
    }
})();
