document.addEventListener('DOMContentLoaded', () => {
    // 1. Efek Navbar Saat Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Setup Intersection Observer untuk Animasi Muncul (Scroll Reveal)
    const observerOptions = {
        threshold: 0.15, // Elemen muncul setelah 15% bagian terlihat
        rootMargin: "0px 0px -50px 0px"
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Berhenti mengamati jika sudah muncul sekali (opsional)
                // observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // Target elemen yang ingin diberi animasi
    // Karena HTML tidak boleh diubah, kita targetkan selector yang sudah ada
    const elementsToReveal = document.querySelectorAll(
        '#latarbelakang, .isi-tujuan > div, .isi-inti > div, .timeline-item, .conclusion-wrapper'
    );

    elementsToReveal.forEach(el => {
        el.classList.add('reveal-hidden'); // Tambahkan state awal via JS
        observer.observe(el);
    });

    // 3. Smooth Scroll untuk Link Navigasi
    document.querySelectorAll('.navbar nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset untuk navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});
