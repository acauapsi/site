/* ==========================================================================
   React Bits — StaggeredMenu Official Component Engine (PraXys Integration)
   Powered by GSAP 3
   ========================================================================== */

(function () {
    const defaultProps = {
        position: 'right',
        colors: ['#121F21', '#1B4B4F'],
        accentColor: '#C0894E',
        displayItemNumbering: true,
        displaySocials: true,
        menuItems: [
            { label: 'Início', link: '#hero' },
            { label: 'Autonomia', link: '#diferenciais' },
            { label: 'O App', link: '#recursos' },
            { label: 'O Site', link: '#sites' },
            { label: 'Panelinha', link: '#panelinha' },
            { label: 'Planos', link: '#planos' },
            { label: 'FAQ', link: '#faq' }
        ],
        socialItems: [
            { label: 'WhatsApp', link: 'https://wa.me/5584987347580' },
            { label: 'Instagram', link: 'https://instagram.com/acauapsi' },
            { label: 'Suporte CFP', link: '#' }
        ]
    };

    let isOpen = false;
    let isBusy = false;
    let openTl = null;
    let closeTween = null;
    let spinTween = null;
    let textCycleTween = null;

    function buildMenuDOM() {
        const wrapper = document.createElement('div');
        wrapper.className = 'staggered-menu-wrapper fixed-wrapper';
        wrapper.setAttribute('data-position', defaultProps.position);

        // Pre-layers container
        const prelayersDiv = document.createElement('div');
        prelayersDiv.className = 'sm-prelayers';
        prelayersDiv.setAttribute('aria-hidden', 'true');
        defaultProps.colors.forEach(c => {
            const layer = document.createElement('div');
            layer.className = 'sm-prelayer';
            layer.style.background = c;
            prelayersDiv.appendChild(layer);
        });
        wrapper.appendChild(prelayersDiv);

        // Header with Logo & Staggered Toggle Button
        const header = document.createElement('header');
        header.className = 'staggered-menu-header';
        header.innerHTML = `
            <a href="#hero" class="sm-logo flex items-center gap-3 font-heading font-black text-2xl tracking-tight">
                <div class="w-9 h-9 rounded-xl bg-[#0E0E14] border border-gold/50 text-gold flex items-center justify-center font-heading font-black text-xl shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                    <span class="shiny-text-gold">X</span>
                </div>
                <span>Pra<span class="shiny-text-gold">X</span>ys<span class="shiny-text-gold">.</span></span>
            </a>
            <button id="sm-toggle-btn" class="sm-toggle" type="button" aria-label="Open menu">
                <span class="sm-toggle-textWrap" aria-hidden="true">
                    <span id="sm-toggle-textInner" class="sm-toggle-textInner">
                        <span class="sm-toggle-line">Menu</span>
                    </span>
                </span>
                <span id="sm-toggle-icon" class="sm-icon" aria-hidden="true">
                    <span class="sm-icon-line"></span>
                    <span class="sm-icon-line sm-icon-line-v"></span>
                </span>
            </button>
        `;
        wrapper.appendChild(header);

        // Main Panel
        const panel = document.createElement('aside');
        panel.id = 'staggered-menu-panel';
        panel.className = 'staggered-menu-panel';
        panel.setAttribute('aria-hidden', 'true');

        let itemsHTML = defaultProps.menuItems.map((it, idx) => `
            <li class="sm-panel-itemWrap">
                <a class="sm-panel-item" href="${it.link}" data-index="${idx + 1}">
                    <span class="sm-panel-itemLabel">${it.label}</span>
                </a>
            </li>
        `).join('');

        let socialsHTML = defaultProps.socialItems.map(s => `
            <li class="sm-socials-item">
                <a href="${s.link}" target="_blank" rel="noopener noreferrer" class="sm-socials-link">${s.label}</a>
            </li>
        `).join('');

        panel.innerHTML = `
            <div class="sm-panel-inner">
                <ul class="sm-panel-list" role="list" data-numbering="${defaultProps.displayItemNumbering ? 'true' : ''}">
                    ${itemsHTML}
                </ul>
                <div class="sm-socials">
                    <h3 class="sm-socials-title">Presença & Contato</h3>
                    <ul class="sm-socials-list" role="list">
                        ${socialsHTML}
                    </ul>
                </div>
            </div>
        `;
        wrapper.appendChild(panel);

        document.body.appendChild(wrapper);
    }

    function initGSAP() {
        if (typeof gsap === 'undefined') return;

        const panel = document.getElementById('staggered-menu-panel');
        const preLayers = Array.from(document.querySelectorAll('.sm-prelayer'));
        const icon = document.getElementById('sm-toggle-icon');
        const textInner = document.getElementById('sm-toggle-textInner');
        const toggleBtn = document.getElementById('sm-toggle-btn');
        const offscreen = defaultProps.position === 'left' ? -100 : 100;

        // Set initial GSAP offscreen state
        gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
        gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
        gsap.set(textInner, { yPercent: 0 });

        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-item'));
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

        gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        gsap.set(numberEls, { '--sm-num-opacity': 0 });
        gsap.set(socialTitle, { opacity: 0 });
        gsap.set(socialLinks, { y: 25, opacity: 0 });

        function buildOpenTimeline() {
            openTl?.kill();
            closeTween?.kill();

            const tl = gsap.timeline({ paused: true });

            preLayers.forEach((layer, i) => {
                tl.fromTo(layer, { xPercent: offscreen }, { xPercent: 0, duration: 0.45, ease: 'power4.out' }, i * 0.07);
            });

            const lastTime = (preLayers.length - 1) * 0.07;
            const panelInsertTime = lastTime + 0.08;
            const panelDuration = 0.6;

            tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelInsertTime);

            const itemsStart = panelInsertTime + panelDuration * 0.15;
            tl.to(itemEls, {
                yPercent: 0,
                rotate: 0,
                duration: 0.85,
                ease: 'power4.out',
                stagger: { each: 0.08, from: 'start' }
            }, itemsStart);

            tl.to(numberEls, {
                duration: 0.5,
                ease: 'power2.out',
                '--sm-num-opacity': 1,
                stagger: { each: 0.06, from: 'start' }
            }, itemsStart + 0.1);

            const socialsStart = panelInsertTime + panelDuration * 0.35;
            tl.to(socialTitle, { opacity: 1, duration: 0.4, ease: 'power2.out' }, socialsStart);
            tl.to(socialLinks, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out',
                stagger: { each: 0.06, from: 'start' }
            }, socialsStart + 0.04);

            return tl;
        }

        function playOpen() {
            if (isBusy) return;
            isBusy = true;
            const tl = buildOpenTimeline();
            tl.eventCallback('onComplete', () => { isBusy = false; });
            tl.play(0);
        }

        function playClose() {
            openTl?.kill();
            const offscreen = defaultProps.position === 'left' ? -100 : 100;
            const all = [...preLayers, panel];
            closeTween = gsap.to(all, {
                xPercent: offscreen,
                duration: 0.35,
                ease: 'power3.in',
                overwrite: 'auto',
                onComplete: () => {
                    gsap.set(itemEls, { yPercent: 140, rotate: 10 });
                    gsap.set(numberEls, { '--sm-num-opacity': 0 });
                    gsap.set(socialTitle, { opacity: 0 });
                    gsap.set(socialLinks, { y: 25, opacity: 0 });
                    isBusy = false;
                }
            });
        }

        function animateIcon(opening) {
            spinTween?.kill();
            spinTween = gsap.to(icon, {
                rotate: opening ? 225 : 0,
                duration: opening ? 0.75 : 0.35,
                ease: opening ? 'power4.out' : 'power3.inOut'
            });
        }

        function animateText(opening) {
            textCycleTween?.kill();
            textInner.innerHTML = `
                <span class="sm-toggle-line">${opening ? 'Menu' : 'Close'}</span>
                <span class="sm-toggle-line">${opening ? 'Close' : 'Menu'}</span>
            `;
            gsap.set(textInner, { yPercent: 0 });
            textCycleTween = gsap.to(textInner, {
                yPercent: -50,
                duration: 0.45,
                ease: 'power4.out'
            });
        }

        function toggleMenu() {
            isOpen = !isOpen;
            panel.setAttribute('aria-hidden', !isOpen);
            if (isOpen) {
                playOpen();
            } else {
                playClose();
            }
            animateIcon(isOpen);
            animateText(isOpen);
        }

        function closeMenu() {
            if (!isOpen) return;
            isOpen = false;
            panel.setAttribute('aria-hidden', 'true');
            playClose();
            animateIcon(false);
            animateText(false);
        }

        toggleBtn.addEventListener('click', toggleMenu);

        // Close when clicking outside panel
        document.addEventListener('mousedown', (e) => {
            if (isOpen && !panel.contains(e.target) && !toggleBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Click on menu links: close menu panel and smooth scroll
        const links = panel.querySelectorAll('.sm-panel-item');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    closeMenu();
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        setTimeout(() => {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 250);
                    }
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            buildMenuDOM();
            initGSAP();
        });
    } else {
        buildMenuDOM();
        initGSAP();
    }
})();
