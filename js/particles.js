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
