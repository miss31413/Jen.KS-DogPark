// 數字跳動動畫
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-item .number');
    const speed = 100;

    stats.forEach(stat => {
        const updateCount = () => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText;
            const inc = Math.max(1, target / speed);

            if (count < target) {
                stat.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    });
}

// 捲動觸發動畫監聽
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            // 如果是影響力區塊，執行數字動畫
            if (entry.target.id === 'impact' && !entry.target.dataset.animated) {
                animateNumbers();
                entry.target.dataset.animated = "true";
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section, .dog-card, .help-box').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
    observer.observe(el);
});

// 平滑捲動工具
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// === 滾動隱藏導覽列效果 (Hidey-bar) ===
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 100) {
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-top');
    } else {
        navbar.classList.remove('navbar-top');

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.add('navbar-hidden');
        }
        else if (currentScrollY < lastScrollY) {
            navbar.classList.remove('navbar-hidden');
        }
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

updateNavbar();

// === 圖片輪播 (Carousel) ===
const carouselTrack = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (carouselTrack && prevBtn && nextBtn) {
    const scrollAmount = 310; // 卡片寬度 + gap

    prevBtn.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // 觸控滑動支援已內建於 CSS overflow-x: auto
}

// === 圖片燈箱 (Lightbox) ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-nav.prev');
const lightboxNext = document.querySelector('.lightbox-nav.next');
const slides = document.querySelectorAll('.carousel-slide');
let currentSlideIndex = 0;

// 開啟燈箱
function openLightbox(index) {
    const slide = slides[index];
    const img = slide.querySelector('img');
    const caption = slide.querySelector('.slide-caption');

    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    currentSlideIndex = index;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 關閉燈箱
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// 切換圖片
function navigateLightbox(direction) {
    currentSlideIndex += direction;

    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;

    const slide = slides[currentSlideIndex];
    const img = slide.querySelector('img');
    const caption = slide.querySelector('.slide-caption');

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightboxImg.style.opacity = '1';
    }, 200);
}

// 綁定事件
slides.forEach((slide, index) => {
    slide.addEventListener('click', () => openLightbox(index));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

// 點擊背景關閉
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// 鍵盤導航
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// === 狗狗卡片點擊開啟燈箱 ===
const dogCards = document.querySelectorAll('.dog-card .dog-img');
dogCards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = card.closest('.dog-card').querySelector('h3')?.textContent || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// 為燈箱圖片添加過渡效果
if (lightboxImg) {
    lightboxImg.style.transition = 'opacity 0.3s ease';
}

console.log('🐕 高雄張阿姨狗園網站已載入完成！');
