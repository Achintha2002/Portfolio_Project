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

});
