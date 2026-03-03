/**
 * script.js — Горные туры | ООО "ТестыПортфолио"
 * Защита + интерактивность
 */

'use strict';

/* ========================================
   🛡️ SECURITY: защита контента
======================================== */
(function initSecurity() {
    // Блокировка правой кнопки мыши
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // Блокировка горячих клавиш (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+S)
    document.addEventListener('keydown', function (e) {
        const blockedKeys = [
            { key: 'F12' },
            { ctrl: true, key: 'u' },
            { ctrl: true, key: 'U' },
            { ctrl: true, key: 's' },
            { ctrl: true, key: 'S' },
            { ctrl: true, shift: true, key: 'I' },
            { ctrl: true, shift: true, key: 'i' },
            { ctrl: true, shift: true, key: 'J' },
            { ctrl: true, shift: true, key: 'j' },
            { ctrl: true, shift: true, key: 'C' },
            { ctrl: true, shift: true, key: 'c' },
        ];

        for (const combo of blockedKeys) {
            const ctrlMatch = combo.ctrl ? (e.ctrlKey || e.metaKey) : true;
            const shiftMatch = combo.shift ? e.shiftKey : true;
            const keyMatch = e.key === combo.key;
            if (ctrlMatch && shiftMatch && keyMatch) {
                e.preventDefault();
                return false;
            }
        }
    });

    // Блокировка выделения текста на ключевых блоках
    const noSelectEls = document.querySelectorAll(
        '.hero__title, .tour-card, .feature-card, .logo'
    );
    noSelectEls.forEach(el => {
        el.style.userSelect = 'none';
        el.style.webkitUserSelect = 'none';
    });

    // Блокировка drag & drop изображений
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
        img.addEventListener('dragstart', e => e.preventDefault());
    });

    // Обнаружение DevTools (базовое)
    let devToolsOpen = false;
    const devToolsCheck = setInterval(function () {
        const threshold = 160;
        if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
        ) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                console.clear();
                console.log('%c⛰️ ООО "ТестыПортфолио"', 'font-size:20px; color:#2E7D32; font-weight:bold;');
                console.log('%cГорные туры по России. Сайт защищён.', 'font-size:14px; color:#555;');
            }
        } else {
            devToolsOpen = false;
        }
    }, 1000);
})();


/* ========================================
   🔝 SCROLL TO TOP BUTTON
======================================== */
(function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


/* ========================================
   📌 STICKY HEADER
======================================== */
(function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
})();


/* ========================================
   🍔 BURGER MENU
======================================== */
(function initBurger() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;

    // Создаём оверлей
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        display:none; position:fixed; inset:0;
        background:rgba(0,0,0,0.5); z-index:1050;
        transition:opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);

    function openMenu() {
        burger.classList.add('active');
        nav.classList.add('open');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => overlay.style.opacity = '1', 10);
    }

    function closeMenu() {
        burger.classList.remove('active');
        nav.classList.remove('open');
        overlay.style.opacity = '0';
        document.body.style.overflow = '';
        setTimeout(() => overlay.style.display = 'none', 300);
    }

    burger.addEventListener('click', function () {
        nav.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Закрывать при клике на ссылку
    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрывать по Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });
})();


/* ========================================
   ⏰ COUNTDOWN TIMER
======================================== */
(function initTimer() {
    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-minutes');
    const secsEl = document.getElementById('timer-seconds');

    if (!daysEl) return;

    // Дата дедлайна — 1 июня 2025
    const deadline = new Date('2025-06-01T00:00:00').getTime();

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function updateTimer() {
        const now = Date.now();
        const diff = deadline - now;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minsEl.textContent = pad(mins);
        secsEl.textContent = pad(secs);
    }

    updateTimer();
    setInterval(updateTimer, 1000);
})();


/* ========================================
   📋 QUIZ / FORM
======================================== */
(function initQuiz() {
    const form = document.getElementById('quizForm');
    if (!form) return;

    const steps = form.querySelectorAll('.quiz__step');
    const progressBar = document.getElementById('progressBar');
    const totalSteps = 4; // шаги с вопросами (без success)
    let currentStep = 1;

    // Обновить прогресс
    function updateProgress(step) {
        const pct = ((step - 1) / totalSteps) * 100;
        if (progressBar) progressBar.style.width = pct + '%';
    }

    // Показать нужный шаг
    function showStep(step) {
        steps.forEach(s => s.classList.remove('active'));
        const target = form.querySelector(`[data-step="${step}"]`);
        if (target) target.classList.add('active');
        updateProgress(step);
    }

    // Валидация опций на шаге
    function validateStep(step) {
        if (step === 1) {
            return form.querySelector('input[name="level"]:checked') !== null;
        }
        if (step === 2) {
            return form.querySelector('input[name="days"]:checked') !== null;
        }
        if (step === 3) {
            return form.querySelector('input[name="budget"]:checked') !== null;
        }
        return true;
    }

    // Кнопки "Далее"
    form.querySelectorAll('.quiz__next').forEach(btn => {
        btn.addEventListener('click', function () {
            const nextStep = parseInt(this.dataset.next);

            if (!validateStep(currentStep)) {
                showShakeError(this.closest('.quiz__step'));
                showToast('Пожалуйста, выберите один из вариантов', 'warning');
                return;
            }

            currentStep = nextStep;
            showStep(currentStep);
        });
    });

    // Подсветка выбранных опций
    form.querySelectorAll('.quiz__option').forEach(option => {
        option.addEventListener('click', function () {
            const group = this.closest('.quiz__options');
            group.querySelectorAll('.quiz__option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Отправка формы
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('userName');
        const phoneInput = document.getElementById('userPhone');
        const agreeCheck = document.getElementById('agreeCheck');

        let valid = true;

        // Сброс ошибок
        [nameInput, phoneInput].forEach(inp => inp.classList.remove('error'));

        // Валидация имени
        const name = sanitizeInput(nameInput.value.trim());
        if (!name || name.length < 2) {
            nameInput.classList.add('error');
            nameInput.focus();
            valid = false;
        }

        // Валидация телефона
        const phone = sanitizeInput(phoneInput.value.trim());
        if (!isValidPhone(phone)) {
            phoneInput.classList.add('error');
            if (valid) phoneInput.focus();
            valid = false;
        }

        // Валидация согласия
        if (!agreeCheck.checked) {
            showToast('Необходимо согласие на обработку данных', 'warning');
            valid = false;
        }

        if (!valid) {
            showToast('Проверьте правильность заполнения полей', 'error');
            return;
        }

        // Имитация отправки
        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.textContent = 'Отправляем...';
        submitBtn.disabled = true;

        setTimeout(function () {
            showStep(5);
            updateProgress(5);
            showToast('Заявка успешно отправлена! 🎉', 'success');
        }, 1200);
    });

    updateProgress(1);
})();


/* ========================================
   🔒 INPUT SANITIZATION
======================================== */
function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/[^\p{L}\p{N}\s\+\-$\)@._]/gu, '')
        .trim()
        .substring(0, 200);
}

function isValidPhone(phone) {
    // Допускает форматы: +375XXXXXXXXX, +7XXXXXXXXXX и т.д.
    const cleaned = phone.replace(/[\s\-\($]/g, '');
    return /^\+?[0-9]{7,15}$/.test(cleaned);
}


/* ========================================
   🔔 TOAST NOTIFICATIONS
======================================== */
function showToast(message, type = 'info') {
    // Удалить предыдущий тост
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const colors = {
        success: '#2E7D32',
        error: '#c62828',
        warning: '#e65100',
        info: '#1565C0'
    };

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<span>${icons[type]}</span> ${escapeHtml(message)}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: ${colors[type]};
        color: #fff;
        padding: 14px 28px;
        border-radius: 50px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        transition: all 0.35s ease;
        max-width: 90vw;
        text-align: center;
        white-space: nowrap;
        pointer-events: none;
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}


/* ========================================
   💥 SHAKE ANIMATION ON ERROR
======================================== */
function showShakeError(el) {
    if (!el) return;
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake 0.4s ease';

    // Добавляем keyframes если нет
    if (!document.getElementById('shakeStyle')) {
        const style = document.createElement('style');
        style.id = 'shakeStyle';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-8px); }
                40% { transform: translateX(8px); }
                60% { transform: translateX(-5px); }
                80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}


/* ========================================
   👁️ SCROLL REVEAL ANIMATION
======================================== */
(function initScrollReveal() {
    const revealEls = document.querySelectorAll(
        '.tour-card, .feature-card, .review-card, .step-card, ' +
        '.gallery__item, .pain__list li, .quiz__benefits li'
    );

    revealEls.forEach((el, i) => {
        el.classList.add('reveal');
        el.classList.add(`reveal-delay-${(i % 4) + 1}`);
    });

    function checkReveal() {
        const winH = window.innerHeight;
        revealEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < winH - 80) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('resize', checkReveal, { passive: true });
    checkReveal(); // первый запуск
})();


/* ========================================
   🔗 SMOOTH ANCHOR SCROLL
======================================== */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const headerH = document.getElementById('header')?.offsetHeight || 70;
            const top = target.getBoundingClientRect().top + window.scrollY - headerH;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();


/* ========================================
   📱 PHONE INPUT AUTO-FORMAT
======================================== */
(function initPhoneFormat() {
    const phoneInput = document.getElementById('userPhone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', function () {
        let val = this.value.replace(/[^\d+]/g, '');

        // Оставить только цифры и + в начале
        if (val.startsWith('+')) {
            val = '+' + val.slice(1).replace(/\D/g, '');
        } else {
            val = val.replace(/\D/g, '');
        }

        // Ограничить длину
        if (val.startsWith('+')) {
            val = val.substring(0, 16);
        } else {
            val = val.substring(0, 15);
        }

        this.value = val;
        this.classList.remove('error');
    });

    phoneInput.addEventListener('blur', function () {
        const val = this.value.trim();
        if (val && !isValidPhone(val)) {
            this.classList.add('error');
            showToast('Введите корректный номер телефона', 'warning');
        }
    });
})();


/* ========================================
   🏷️ ACTIVE NAV HIGHLIGHT
======================================== */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', function () {
        let current = '';
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            if (scrollY >= section.offsetTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.fontWeight = '600';
            link.style.color = '';
            const href = link.getAttribute('href')?.replace('#', '');
            if (href === current) {
                link.style.fontWeight = '800';
            }
        });
    }, { passive: true });
})();


/* ========================================
   🎉 PAGE LOAD ANIMATION
======================================== */
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});