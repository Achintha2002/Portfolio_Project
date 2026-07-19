document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Update active class immediately
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Live Local Time ---
    const timeDisplay = document.getElementById('current-time');
    const ampmDisplay = document.getElementById('time-ampm');
    
    function updateLocalTime() {
        if(!timeDisplay || !ampmDisplay) return;
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        const strHours = hours < 10 ? '0' + hours : hours;
        
        timeDisplay.textContent = `${strHours}:${strMinutes}`;
        ampmDisplay.textContent = ampm;
    }
    
    setInterval(updateLocalTime, 1000);
    updateLocalTime(); // Initial call

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Typewriter Effect ---
    const typewriterText = document.querySelector('.typewriter-text');
    if (typewriterText) {
        const words = ['Fullstack Developer', 'QA Engineer', 'IT Supporter'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing
        setTimeout(type, 1000);
    }

});
