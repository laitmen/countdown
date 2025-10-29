class WeatherSimulator {
    constructor() {
        this.location = "Santa Cristina Valgardena";
        this.currentWeather = this.generateRealisticWeather();
        this.manualOverride = false;
        this.manualWeather = null;
    }

    // ... (resto del codice invariato) ...

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
                humidity: this.getHumidity(condition, this.getSeason()),
                windSpeed: this.getWindSpeed(condition),
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
            // Cambia gradualmente il meteo solo se non in manuale
            if (Math.random() < 0.3) {
                this.currentWeather = this.generateRealisticWeather();
                this.updateWeatherDisplay();
            }
        }
    }

    updateWeatherDisplay() {
        const weatherData = this.getCurrentWeather();
        const targetDateElement = document.getElementById('targetDate');
        const weatherClass = this.getWeatherClass();
        
        // Aggiorna sfondo
        const backgroundElement = document.getElementById('dynamic-background');
        backgroundElement.className = weatherClass;
        
        // Aggiorna particelle
        if (typeof initParticles === 'function') {
            initParticles(weatherData.condition);
        }
        
        // Aggiorna display meteo
        targetDateElement.innerHTML = `
            <div class="weather-display">
                <div class="weather-icon">${this.getWeatherEmoji(weatherData.condition)}</div>
                <div class="weather-temp">${weatherData.temperature}°C</div>
                <div class="weather-desc">${weatherData.description}</div>
                ${this.manualOverride ? '<div class="weather-manual">🎛️ Manuale</div>' : ''}
            </div>
            <div class="date-info">
                Santa Cristina Valgardena • 2 Novembre 2025, 14:30
            </div>
        `;
        
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

    // ... (resto del codice invariato) ...
}
