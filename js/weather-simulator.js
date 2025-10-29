// ... (il resto del codice rimane uguale) ...

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

// ... (il resto del codice rimane uguale) ...
