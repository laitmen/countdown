class WeatherSimulator {
    constructor() {
        this.location = "Santa Cristina Valgardena";
        this.currentWeather = this.generateRealisticWeather();
    }

    getSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';      // Mar-Mag
        if (month >= 5 && month <= 7) return 'summer';      // Giu-Ago
        if (month >= 8 && month <= 10) return 'autumn';     // Set-Nov
        return 'winter';                                    // Dic-Feb
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 9) return 'early_morning';
        if (hour >= 9 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 15) return 'midday';
        if (hour >= 15 && hour < 18) return 'afternoon';
        if (hour >= 18 && hour < 21) return 'evening';
        if (hour >= 21 || hour < 5) return 'night';
    }

    generateRealisticWeather() {
        const season = this.getSeason();
        const timeOfDay = this.getTimeOfDay();
        const baseTemp = this.getBaseTemperature(season, timeOfDay);
        
        // Probabilità di condizioni meteo basate su stagione e Dolomiti
        const weatherConditions = this.getWeatherProbabilities(season);
        const condition = this.pickWeightedCondition(weatherConditions);
        
        // Temperatura con variazione realistica
        const tempVariation = (Math.random() - 0.5) * 8; // ±4 gradi
        const temperature = Math.round(baseTemp + tempVariation);
        
        // Umidità basata su condizione
        const humidity = this.getHumidity(condition, season);
        
        // Vento tipico delle Dolomiti
        const windSpeed = this.getWindSpeed(condition);

        return {
            temperature: temperature,
            condition: condition,
            description: this.getWeatherDescription(condition),
            humidity: humidity,
            windSpeed: windSpeed,
            location: this.location,
            season: season,
            timeOfDay: timeOfDay,
            timestamp: new Date()
        };
    }

    getBaseTemperature(season, timeOfDay) {
        // Temperature medie per Santa Cristina Valgardena (1360m slm)
        const baseTemps = {
            winter: { early_morning: -5, morning: -2, midday: 3, afternoon: 2, evening: -1, night: -6 },
            spring: { early_morning: 2, morning: 6, midday: 12, afternoon: 11, evening: 7, night: 1 },
            summer: { early_morning: 8, morning: 12, midday: 18, afternoon: 17, evening: 13, night: 7 },
            autumn: { early_morning: 3, morning: 7, midday: 11, afternoon: 10, evening: 6, night: 2 }
        };
        
        return baseTemps[season][timeOfDay];
    }

    getWeatherProbabilities(season) {
        // Probabilità realistiche per le Dolomiti
        const probabilities = {
            winter: [
                { condition: 'clear', weight: 40 },
                { condition: 'partly_cloudy', weight: 30 },
                { condition: 'cloudy', weight: 15 },
                { condition: 'snow', weight: 10 },
                { condition: 'fog', weight: 5 }
            ],
            spring: [
                { condition: 'clear', weight: 35 },
                { condition: 'partly_cloudy', weight: 30 },
                { condition: 'cloudy', weight: 15 },
                { condition: 'rain', weight: 15 },
                { condition: 'thunderstorm', weight: 5 }
            ],
            summer: [
                { condition: 'clear', weight: 50 },
                { condition: 'partly_cloudy', weight: 25 },
                { condition: 'cloudy', weight: 10 },
                { condition: 'thunderstorm', weight: 10 },
                { condition: 'rain', weight: 5 }
            ],
            autumn: [
                { condition: 'clear', weight: 30 },
                { condition: 'partly_cloudy', weight: 25 },
                { condition: 'cloudy', weight: 20 },
                { condition: 'rain', weight: 15 },
                { condition: 'fog', weight: 10 }
            ]
        };
        
        return probabilities[season];
    }

    pickWeightedCondition(conditions) {
        const totalWeight = conditions.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const item of conditions) {
            random -= item.weight;
            if (random <= 0) {
                return item.condition;
            }
        }
        
        return conditions[0].condition;
    }

    getHumidity(condition, season) {
        const baseHumidity = {
            clear: 45, partly_cloudy: 60, cloudy: 75, 
            rain: 85, snow: 80, thunderstorm: 90, fog: 95
        };
        
        const seasonalAdjustment = {
            winter: 0, spring: 5, summer: -5, autumn: 10
        };
        
        return baseHumidity[condition] + seasonalAdjustment[season];
    }

    getWindSpeed(condition) {
        const baseSpeeds = {
            clear: 2, partly_cloudy: 3, cloudy: 4, 
            rain: 5, snow: 3, thunderstorm: 8, fog: 1
        };
        
        // Variazione ±2 km/h
        return baseSpeeds[condition] + (Math.random() * 4 - 2);
    }

    getWeatherDescription(condition) {
        const descriptions = {
            clear: "Sereno",
            partly_cloudy: "Parzialmente nuvoloso",
            cloudy: "Nuvoloso",
            rain: "Pioggia",
            snow: "Neve",
            thunderstorm: "Temporale",
            fog: "Nebbia"
        };
        
        return descriptions[condition];
    }

    getWeatherEmoji(condition) {
        const emojis = {
            clear: "☀️",
            partly_cloudy: "⛅",
            cloudy: "☁️",
            rain: "🌧️",
            snow: "❄️",
            thunderstorm: "⛈️",
            fog: "🌫️"
        };
        
        return emojis[condition];
    }

    getWeatherClass() {
        const timeOfDay = this.getTimeOfDay();
        const condition = this.currentWeather.condition;
        
        // Mappa per classi CSS
        const conditionMap = {
            'clear': 'sunny',
            'partly_cloudy': 'partly_cloudy',
            'cloudy': 'cloudy',
            'rain': 'rainy',
            'snow': 'snowy',
            'thunderstorm': 'stormy',
            'fog': 'foggy'
        };

        const timeMap = {
            'early_morning': 'morning',
            'morning': 'morning',
            'midday': 'afternoon',
            'afternoon': 'afternoon',
            'evening': 'evening',
            'night': 'night'
        };

        const weatherCondition = conditionMap[condition] || 'sunny';
        const timeClass = timeMap[timeOfDay] || 'day';
        
        return `weather-${timeClass}-${weatherCondition}`;
    }

    updateWeather() {
        // Cambia gradualmente il meteo (non troppo brusco)
        if (Math.random() < 0.3) { // 30% di probabilità di cambiamento ogni aggiornamento
            this.currentWeather = this.generateRealisticWeather();
        }
    }

    updateWeatherDisplay() {
        const targetDateElement = document.getElementById('targetDate');
        const weatherClass = this.getWeatherClass();
        
        // Aggiorna sfondo
        const backgroundElement = document.getElementById('dynamic-background');
        backgroundElement.className = weatherClass;
        
        // Aggiorna particelle
        if (typeof initParticles === 'function') {
            initParticles(this.currentWeather.condition);
        }
        
        // Aggiorna display meteo nel target-date
        targetDateElement.innerHTML = `
            <div class="weather-display">
                <div class="weather-icon">${this.getWeatherEmoji(this.currentWeather.condition)}</div>
                <div class="weather-temp">${this.currentWeather.temperature}°C</div>
                <div class="weather-desc">${this.currentWeather.description}</div>
            </div>
            <div class="date-info">
                Santa Cristina Valgardena • 2 Novembre 2025, 14:30
            </div>
        `;
    }

    init() {
        this.updateWeatherDisplay();
        
        // Aggiorna meteo ogni 15 minuti (simulato)
        setInterval(() => {
            this.updateWeather();
            this.updateWeatherDisplay();
        }, 15 * 60 * 1000);
        
        // Piccole variazioni ogni 2 minuti
        setInterval(() => {
            this.currentWeather.temperature += (Math.random() - 0.5) * 2;
            this.currentWeather.temperature = Math.round(this.currentWeather.temperature);
            this.updateWeatherDisplay();
        }, 2 * 60 * 1000);
    }
}

// Inizializza simulatore meteo
const weatherSimulator = new WeatherSimulator();
