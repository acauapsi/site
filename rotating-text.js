/* ==========================================================================
   Acauã — Ultra-Smooth Letter Stagger Engine (ALL UPPERCASE & Crisp Legibility)
   ========================================================================== */

(function () {
    const phrases = [
        "APP OFFLINE CRIPTOGRAFADO",
        "SITES & PRESENÇA NO GOOGLE",
        "SEM MENSALIDADES",
        "GUARDA SIGILOSA LGPD",
        "CONSULTÓRIO DIGITAL"
    ];

    const displayInterval = 3200; // 3.2s display pause
    const staggerStep = 0.02;    // 20ms per character delay
    let currentIndex = 0;
    let isAnimating = false;

    // Helper: Build letter-by-letter DOM tree
    function buildStaggerDOM(phraseText) {
        const phraseContainer = document.createElement('span');
        phraseContainer.className = 'phrase-layer inline-flex flex-nowrap items-center justify-center whitespace-nowrap py-1 font-bold uppercase text-center w-full';
        phraseContainer.style.fontFamily = "'Inter', sans-serif";
        phraseContainer.style.letterSpacing = '0.05em';

        const words = phraseText.toUpperCase().split(' ');
        const totalChars = phraseText.length;
        let charIndex = 0;

        words.forEach((word, wIdx) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word-box inline-flex flex-nowrap whitespace-nowrap py-1';
            
            if (wIdx < words.length - 1) {
                wordSpan.style.marginRight = '0.45em';
            }

            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                const charSpan = document.createElement('span');
                charSpan.className = 'char-span inline-block whitespace-pre';
                charSpan.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                charSpan.style.willChange = 'transform, opacity';
                charSpan.textContent = char;

                // Stagger from last character (reverse index delay)
                const reverseIdx = totalChars - 1 - charIndex;
                const delaySec = (reverseIdx * staggerStep).toFixed(3);
                charSpan.style.transitionDelay = `${delaySec}s`;

                // Initial offscreen state below (y: 120%)
                charSpan.style.transform = 'translateY(120%)';
                charSpan.style.opacity = '0';

                wordSpan.appendChild(charSpan);
                charIndex++;
            }

            phraseContainer.appendChild(wordSpan);

            if (wIdx < words.length - 1) {
                charIndex++;
            }
        });

        return phraseContainer;
    }

    function initRotatingText() {
        const target = document.getElementById('rotating-text-pill');
        if (!target) return;

        // Container styling: clean, crisp, legible copper pill
        target.className = "inline-flex whitespace-nowrap px-6 sm:px-8 py-2.5 bg-[#C0894E] text-[#121F21] overflow-hidden rounded-2xl justify-center items-center font-extrabold shadow-[0_4px_25px_rgba(192,137,78,0.35)] align-middle my-1 min-h-[50px] sm:min-h-[60px] text-base sm:text-2xl md:text-3xl lg:text-4xl max-w-full text-center relative uppercase";
        target.style.fontFamily = "'Inter', sans-serif";

        // Render initial phrase
        let currentDOM = buildStaggerDOM(phrases[0]);
        target.appendChild(currentDOM);

        // Animate initial phrase in
        requestAnimationFrame(() => {
            const chars = currentDOM.querySelectorAll('.char-span');
            chars.forEach(ch => {
                ch.style.transform = 'translateY(0%)';
                ch.style.opacity = '1';
            });
        });

        // Loop rotation with absolute stacking during swap
        function rotateNext() {
            if (isAnimating) return;
            isAnimating = true;

            const nextIndex = (currentIndex + 1) % phrases.length;
            const nextDOM = buildStaggerDOM(phrases[nextIndex]);
            
            // Set next phrase ABSOLUTE so it layers over top without expanding container width!
            nextDOM.style.position = 'absolute';
            nextDOM.style.left = '50%';
            nextDOM.style.top = '50%';
            nextDOM.style.transform = 'translate(-50%, -50%)';
            nextDOM.style.width = 'max-content';

            const nextChars = nextDOM.querySelectorAll('.char-span');
            target.appendChild(nextDOM);

            const currentChars = currentDOM.querySelectorAll('.char-span');

            // 1. Stagger current phrase UP (-120%) and out
            currentChars.forEach(ch => {
                ch.style.transform = 'translateY(-120%)';
                ch.style.opacity = '0';
            });

            // 2. Stagger next phrase UP (from 120% to 0%) and in
            setTimeout(() => {
                nextChars.forEach(ch => {
                    ch.style.transform = 'translateY(0%)';
                    ch.style.opacity = '1';
                });
            }, 60);

            // Cleanup old DOM after transition completes
            const maxDelay = (phrases[currentIndex].length * staggerStep) + 0.45;
            setTimeout(() => {
                if (currentDOM && currentDOM.parentNode === target) {
                    target.removeChild(currentDOM);
                }
                currentDOM = nextDOM;
                currentDOM.style.position = 'relative';
                currentDOM.style.left = 'auto';
                currentDOM.style.top = 'auto';
                currentDOM.style.transform = 'none';
                currentDOM.style.width = '100%';
                
                currentIndex = nextIndex;
                isAnimating = false;
            }, maxDelay * 1000);
        }

        setInterval(rotateNext, displayInterval);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRotatingText);
    } else {
        initRotatingText();
    }
})();
