class FlipCounter {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.currentValue = '00';
        this.createFlipCards();
    }

    createFlipCards() {
        this.element.innerHTML = '';
        
        for (let i = 0; i < 2; i++) {
            const flipCounter = document.createElement('div');
            flipCounter.className = 'flip-counter';
            
            const flipCard = document.createElement('div');
            flipCard.className = 'flip-card';
            flipCard.id = `flip-${this.element.id}-${i}`;
            
            const top = document.createElement('div');
            top.className = 'flip-card-top';
            top.textContent = '0';
            
            const bottom = document.createElement('div');
            bottom.className = 'flip-card-bottom';
            bottom.textContent = '0';
            
            flipCard.appendChild(top);
            flipCard.appendChild(bottom);
            flipCounter.appendChild(flipCard);
            this.element.appendChild(flipCounter);
        }
        
        this.update(this.currentValue);
    }

    update(newValue) {
        newValue = newValue.toString().padStart(2, '0');
        
        if (newValue === this.currentValue) return;
        
        for (let i = 0; i < 2; i++) {
            const flipCard = document.getElementById(`flip-${this.element.id}-${i}`);
            const currentDigit = parseInt(this.currentValue[i]);
            const newDigit = parseInt(newValue[i]);
            
            if (currentDigit !== newDigit) {
                this.animateFlip(flipCard, newDigit);
            } else {
                // Aggiorna senza animazione se la cifra non è cambiata
                const top = flipCard.querySelector('.flip-card-top');
                const bottom = flipCard.querySelector('.flip-card-bottom');
                top.textContent = newDigit;
                bottom.textContent = newDigit;
            }
        }
        
        this.currentValue = newValue;
    }

    animateFlip(flipCard, newDigit) {
        const top = flipCard.querySelector('.flip-card-top');
        const bottom = flipCard.querySelector('.flip-card-bottom');
        
        // Inizia animazione
        flipCard.classList.add('flipping');
        
        // Mezzo secondo dopo, aggiorna i numeri
        setTimeout(() => {
            top.textContent = newDigit;
            bottom.textContent = newDigit;
            
            // Fine animazione
            setTimeout(() => {
                flipCard.classList.remove('flipping');
            }, 50);
        }, 300);
    }
}

particles.js
// Configurazione particelle per diverse condizioni meteo
const particleConfigs = {
    sunny: {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffcc00" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { 
                enable: true, 
                speed: 1, 
                direction: "none", 
                random: true, 
                out_mode: "out" 
            }
        }
    },
    cloudy: {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            opacity: { value: 0.3, random: true },
            size: { value: 5, random: true },
            line_linked: { enable: false },
            move: { 
                enable: true, 
                speed: 0.5, 
                direction: "none", 
                random: true, 
                out_mode: "out" 
            }
        }
    },
    rainy: {
        particles: {
            number: { value: 150, density: { enable: true, value_area: 800 } },
            color: { value: "#4a90e2" },
            opacity: { value: 0.6, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: false },
            move: { 
                enable: true, 
                speed: 3, 
                direction: "bottom", 
                random: true, 
                out_mode: "out",
                straight: true
            }
        }
    },
    clear: {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            opacity: { value: 0.1, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.1, width: 1 },
            move: { 
                enable: true, 
                speed: 0.5, 
                direction: "none", 
                random: true, 
                out_mode: "out" 
            }
        }
    }
};

function initParticles(weatherCondition) {
    if (typeof particlesJS !== 'undefined') {
        // Scegli configurazione basata sulle condizioni meteo
        let config;
        if (weatherCondition.includes('clear') || weatherCondition.includes('sunny')) {
            config = particleConfigs.sunny;
        } else if (weatherCondition.includes('cloud')) {
            config = particleConfigs.cloudy;
        } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
            config = particleConfigs.rainy;
        } else {
            config = particleConfigs.clear;
        }
        
        particlesJS('particles-js', config);
    }
}

// Inizializza particelle di default
document.addEventListener('DOMContentLoaded', function() {
    initParticles('clear');
});
