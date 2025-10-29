class WeatherSimulator {
    constructor() {
        this.location = "Santa Cristina Valgardena";
        this.currentWeather = this.generateRealisticWeather();
        this.manualOverride = false;
        this.manualWeather = null;
    }

    getSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'autumn';
        return 'winter';
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        return 'evening';
    }

    generateRealisticWeather() {
        const season = this.getSeason();
        const timeOfDay = this.getTimeOfDay();
        const baseTemp = this.getBaseTemperature(season, timeOfDay);
        
        const weatherConditions = this.getWeatherProbabilities(season);
        const condition = this.pickWeightedCondition(weatherConditions);
        
        const tempVariation = (Math.random() - 0.5) * 8;
        const temperature = Math.round(baseTemp + tempVariation);
        
        return {
            temperature: temperature,
            condition: condition,
            description: this.getWeatherDescription(condition),
            location: this.location,
            season: season,
            timeOfDay: timeOfDay
        };
    }

    getBaseTemperature(season, timeOfDay) {
        const baseTemps = {
            winter: { morning: -2, afternoon: 3, evening: -1 },
            spring: { morning: 6, afternoon: 12, evening: 7 },
            summer: { morning: 12, afternoon: 18, evening: 13 },
            autumn: { morning: 7, afternoon: 11, evening: 6 }
        };
        
        return baseTemps[season][timeOfDay];
    }

    getWeatherProbabilities(season) {
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
        
        const conditionMap = {
            'clear': 'sunny',
            'partly_cloudy': 'cloudy',
            'cloudy': 'cloudy',
            'rain': 'rainy',
            'snow': 'rainy',
            'thunderstorm': 'rainy',
            'fog': 'cloudy'
        };

        const weatherCondition = conditionMap[condition] || 'sunny';
        return `weather-${timeOfDay}-${weatherCondition}`;
    }

    setManualWeather(condition) {
        if (condition === 'auto') {
            this.manualOverride = false;
            this.currentWeather = this.generateRealisticWeather();
        } else {
            this.manualOverride = true;
            this.manualWeather = {
                condition: condition,
                description: this.getWeatherDescription(condition),
                temperature: this.getManualTemperature(condition),
                timestamp: new Date()
            };
        }
        this.updateWeatherDisplay();
    }

    getManualTemperature(condition) {
        const baseTemp = this.getBaseTemperature(this.getSeason(), this.getTimeOfDay());
        const adjustments = {
            clear: 2, partly_cloudy: 0, cloudy: -2, 
            rain: -5, snow: -8, thunderstorm: -3, fog: -1
        };
        return Math.round(baseTemp + (adjustments[condition] || 0));
    }

    getCurrentWeather() {
        if (this.manualOverride && this.manualWeather) {
            return this.manualWeather;
        }
        return this.currentWeather;
    }

    updateWeather() {
        if (!this.manualOverride) {
            if (Math.random() < 0.3) {
                this.currentWeather = this.generateRealisticWeather();
                this.updateWeatherDisplay();
            }
        }
    }

    updateWeatherDisplay() {
        const weatherData = this.getCurrentWeather();
        const weatherClass = this.getWeatherClass();
        
        // Aggiorna sfondo
        const backgroundElement = document.getElementById('dynamic-background');
        backgroundElement.className = weatherClass;
        
        // Aggiorna particelle
        if (typeof initParticles === 'function') {
            initParticles(weatherData.condition);
        }
        
        // Aggiorna opzione attiva nel menu
        this.updateWeatherMenu(weatherData.condition);
    }

    updateWeatherMenu(currentCondition) {
        const options = document.querySelectorAll('.weather-option');
        options.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.weather === currentCondition || 
                (!this.manualOverride && option.dataset.weather === 'auto')) {
                option.classList.add('active');
            }
        });
    }

    init() {
        this.updateWeatherDisplay();
        
        // Aggiorna meteo ogni 15 minuti
        setInterval(() => {
            this.updateWeather();
        }, 15 * 60 * 1000);
    }
}

// Inizializza simulatore meteo
const weatherSimulator = new WeatherSimulator();
