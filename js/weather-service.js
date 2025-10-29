class WeatherService {
    constructor() {
        this.apiKey = 'your_api_key_here'; // Sostituisci con API key vera
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.location = {
            lat: 46.5583,  // Santa Cristina Valgardena
            lon: 11.7139
        };
    }

    async getWeather() {
        try {
            const response = await fetch(
                `${this.baseUrl}/weather?lat=${this.location.lat}&lon=${this.location.lon}&appid=${this.apiKey}&units=metric&lang=it`
            );
            
            if (!response.ok) {
                throw new Error('Errore nel fetch meteo');
            }
            
            const data = await response.json();
            return this.processWeatherData(data);
        } catch (error) {
            console.error('Errore meteo:', error);
            return this.getFallbackWeather();
        }
    }

    processWeatherData(data) {
        return {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].main.toLowerCase(),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        };
    }

    getFallbackWeather() {
        // Fallback se l'API non funziona
        const now = new Date();
        const hour = now.getHours();
        
        // Simula condizioni basate sull'ora
        let condition, temperature;
        if (hour >= 6 && hour < 12) {
            condition = 'clear';
            temperature = 15;
        } else if (hour >= 12 && hour < 18) {
            condition = 'clouds';
            temperature = 18;
        } else {
            condition = 'clear';
            temperature = 10;
        }
        
        return {
            temperature: temperature,
            condition: condition,
            description: 'Dati non disponibili',
            icon: '01d',
            humidity: 65,
            windSpeed: 2
        };
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        if (hour >= 18 && hour < 22) return 'evening';
        return 'night';
    }

    getWeatherClass(weatherData) {
        const timeOfDay = this.getTimeOfDay();
        const condition = weatherData.condition;
        
        // Mappa condizioni meteo a classi CSS
        const conditionMap = {
            'clear': 'sunny',
            'clouds': 'cloudy', 
            'rain': 'rainy',
            'drizzle': 'rainy',
            'thunderstorm': 'rainy',
            'snow': 'rainy', // Usa stesso stile pioggia per neve
            'mist': 'cloudy',
            'smoke': 'cloudy',
            'haze': 'cloudy',
            'dust': 'cloudy',
            'fog': 'cloudy',
            'sand': 'cloudy',
            'ash': 'cloudy',
            'squall': 'cloudy',
            'tornado': 'rainy'
        };

        const weatherCondition = conditionMap[condition] || 'sunny';
        return `weather-${timeOfDay}-${weatherCondition}`;
    }

    updateWeatherDisplay(weatherData) {
        const weatherElement = document.getElementById('weatherInfo');
        const weatherClass = this.getWeatherClass(weatherData);
        
        // Aggiorna sfondo
        const backgroundElement = document.getElementById('dynamic-background');
        backgroundElement.className = weatherClass;
        
        // Aggiorna particelle
        initParticles(weatherData.condition);
        
        // Aggiorna info meteo
        weatherElement.innerHTML = `
            <div class="weather-data">
                <span class="weather-icon">${this.getWeatherEmoji(weatherData.icon)}</span>
                <span>${weatherData.temperature}°C - ${weatherData.description}</span>
            </div>
        `;
    }

    getWeatherEmoji(iconCode) {
        const emojiMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌦️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return emojiMap[iconCode] || '🌤️';
    }

    async init() {
        const weatherData = await this.getWeather();
        this.updateWeatherDisplay(weatherData);
        
        // Aggiorna meteo ogni 30 minuti
        setInterval(async () => {
            const newWeatherData = await this.getWeather();
            this.updateWeatherDisplay(newWeatherData);
        }, 30 * 60 * 1000);
    }
}

// Inizializza servizio meteo
const weatherService = new WeatherService();
