/* ==========================================================================
   PraXys — Anti-Slop Interactive Frontend Logic
   Panelinha Calculator, ROI Savings Simulator, FAQ Accordion & Smooth Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Data Matrix for "Combo Panelinha" Calculator
    const panelinhaData = {
        crm: {
            name: "Só o CRM Offline",
            basePrice: 100,
            2: { total: 170, perPerson: 85, savings: 15 },
            4: { total: 300, perPerson: 75, savings: 25 },
            6: { total: 390, perPerson: 65, savings: 35 }
        },
        site: {
            name: "Só o Site Padrão",
            basePrice: 250,
            2: { total: 440, perPerson: 220, savings: 30 },
            4: { total: 800, perPerson: 200, savings: 50 },
            6: { total: 1080, perPerson: 180, savings: 70 }
        },
        combo: {
            name: "Combo Completo (CRM + Site + Kit)",
            basePrice: 297,
            2: { total: 520, perPerson: 260, savings: 37 },
            4: { total: 960, perPerson: 240, savings: 57 },
            6: { total: 1320, perPerson: 220, savings: 77 }
        }
    };

    let currentPack = 'crm';
    let currentFriends = 4;
    const whatsappNumber = "5500999999999";

    // DOM Elements for Panelinha Calc
    const packButtons = document.querySelectorAll('.pack-btn');
    const friendButtons = document.querySelectorAll('.f-btn');
    const calcPricePerson = document.getElementById('calc-price-person');
    const calcTotalGroup = document.getElementById('calc-total-group');
    const calcSavingsAlert = document.getElementById('calc-savings-alert');
    const btnWhatsappPanelinha = document.getElementById('btn-whatsapp-panelinha');

    function updatePanelinhaCalc() {
        const item = panelinhaData[currentPack];
        const data = item[currentFriends];

        // Animate counter effect
        animateNumber(calcPricePerson, parseInt(calcPricePerson.textContent), data.perPerson, 250);

        calcTotalGroup.textContent = `Valor total do grupo (${currentFriends} amigos): R$ ${data.total},00`;
        calcSavingsAlert.textContent = `🎉 Cada pessoa economiza R$ ${data.savings},00 em relação ao preço individual!`;

        // Dynamic WhatsApp URL
        const text = `Olá! Quero montar uma Panelinha de ${currentFriends} amigos no pacote "${item.name}". Ficou R$ ${data.perPerson},00 por pessoa (Total: R$ ${data.total},00). Como fazemos para garantir?`;
        btnWhatsappPanelinha.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    }

    function animateNumber(el, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            el.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    packButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            packButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPack = btn.getAttribute('data-pack');
            updatePanelinhaCalc();
        });
    });

    friendButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            friendButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFriends = parseInt(btn.getAttribute('data-f'));
            updatePanelinhaCalc();
        });
    });

    // Initial Calc Run
    updatePanelinhaCalc();


    // 2. ROI Calculator (SaaS Cloud vs PraXys Savings)
    const yearButtons = document.querySelectorAll('.year-btn');
    const roiSavingsEl = document.getElementById('roi-savings');

    const roiValues = {
        1: 1328,
        2: 2768,
        5: 7080
    };

    yearButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            yearButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const years = btn.getAttribute('data-years');
            const savingsVal = roiValues[years];
            roiSavingsEl.textContent = `R$ ${savingsVal.toLocaleString('pt-BR')},00`;
        });
    });


    // 3. FAQ Accordion Toggle
    const faqButtons = document.querySelectorAll('.faq-button');

    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });


    // 4. Header Scroll Blur
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(7, 10, 18, 0.95)';
        } else {
            header.style.padding = '18px 0';
            header.style.background = 'rgba(7, 10, 18, 0.85)';
        }
    });

});
