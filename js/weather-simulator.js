class WeatherSimulator {
    constructor() {
        this.location = "Santa Cristina Valgardena";
        this.currentWeather = this.generateRealisticWeather();
        this.manualOverride = false;
        this.manualWeather = null;
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
        const totalWeight = conditions.reduce((sum, item) => sum + item.weight
