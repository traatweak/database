document.addEventListener("DOMContentLoaded", function() {
    const splashScreen = document.getElementById('splash-screen');
    const pageHome = document.getElementById('page-home');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            pageHome.classList.remove('hidden-content');
            pageHome.classList.add('visible-content');
            
            setTimeout(() => {
                splashScreen.remove();
            }, 500);
        }, 1500);
    });

    let slideIndex = 0;
    const slides = document.querySelectorAll(".my-slides");
    const slideshowWrapper = document.querySelector(".slideshow-wrapper");
    const totalSlides = slides.length;

    function showSlides() {
        const translateValue = -slideIndex * 100;
        slideshowWrapper.style.transform = `translateX(${translateValue}%)`;
        
        slideIndex++;
        if (slideIndex >= totalSlides) {
            slideIndex = 0;
        }
        
        setTimeout(showSlides, 2500);
    }
    
    pageHome.addEventListener('transitionend', () => {
        showSlides();
    }, { once: true });
    
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    function renderStars(rating, container) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        container.innerHTML = starsHtml;
    }

    const ratingContainers = document.querySelectorAll('.module-rating');
    ratingContainers.forEach(container => {
        const rating = parseFloat(container.getAttribute('data-rating'));
        const starsSpan = container.querySelector('.rating-stars');
        if (starsSpan) {
            renderStars(rating, starsSpan);
        }
    });

    const positiveParticles = ["👍", "❤️", "✨", "🎉", "🔥"];
    const negativeParticles = ["👎", "❌", "🚫", "💢", "💔"];
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-container');
    document.body.appendChild(particleContainer);

    function createParticle(x, y, particlesArray) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.textContent = particlesArray[Math.floor(Math.random() * particlesArray.length)];
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = -250 - Math.random() * 150;
        const randomRotate = (Math.random() - 0.5) * 360;

        particle.style.setProperty('--x', `${randomX}px`);
        particle.style.setProperty('--y', `${randomY}px`);
        particle.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;

        particleContainer.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }

    function showParticleAnimation(x, y, particlesType) {
        const particlesToUse = particlesType === 'like' ? positiveParticles : negativeParticles;
        for (let i = 0; i < 15; i++) {
            createParticle(x, y, particlesToUse);
        }
    }

    document.querySelectorAll('.like-dislike-container').forEach(container => {
        const likeBtn = container.querySelector('.like-btn');
        const dislikeBtn = container.querySelector('.dislike-btn');
        
        likeBtn.addEventListener('click', (event) => {
            if (likeBtn.classList.contains('liked')) {
                likeBtn.classList.remove('liked');
            } else {
                likeBtn.classList.add('liked');
                dislikeBtn.classList.remove('disliked');
                
                const rect = likeBtn.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;
                showParticleAnimation(btnX, btnY, 'like');
            }
        });

        dislikeBtn.addEventListener('click', (event) => {
            if (dislikeBtn.classList.contains('disliked')) {
                dislikeBtn.classList.remove('disliked');
            } else {
                dislikeBtn.classList.add('disliked');
                likeBtn.classList.remove('liked');
                
                const rect = dislikeBtn.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;
                showParticleAnimation(btnX, btnY, 'dislike');
            }
        });
    });
});
