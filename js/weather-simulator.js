// ... (il resto del codice rimane uguale) ...

    updateWeatherDisplay() {
        const weatherElement = document.getElementById('weatherInfo');
        const weatherClass = this.getWeatherClass();
        
        // Aggiorna sfondo
        const backgroundElement = document.getElementById('dynamic-background');
        backgroundElement.className = weatherClass;
        
        // Aggiorna particelle
        if (typeof initParticles === 'function') {
            initParticles(this.currentWeather.condition);
        }
        
        // Aggiorna info meteo con nuovo formato
        weatherElement.innerHTML = `
            <div class="weather-data">
                <div class="weather-icon">${this.getWeatherEmoji(this.currentWeather.condition)}</div>
                <div class="weather-temperature">${this.currentWeather.temperature}°C</div>
                <div class="weather-description">${this.currentWeather.description}</div>
                <div class="weather-location">${this.location}</div>
            </div>
        `;
    }

// ... (il resto del codice rimane uguale) ...
