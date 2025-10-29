// Data di destinazione: 2 Novembre 2025 alle 14:30
const targetDate = new Date(2025, 10, 2, 14, 30, 0);

// Inizializza flip counters
let flipDays, flipHours, flipMinutes, flipSeconds;

function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;
    
    // Se il countdown è terminato
    if (timeDifference <= 0) {
        flipDays.update('00');
        flipHours.update('00');
        flipMinutes.update('00');
        flipSeconds.update('00');
        document.getElementById('message').style.display = 'block';
        return;
    }
    
    // Calcolo giorni, ore, minuti e secondi
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Aggiornamento dei valori con animazione flip
    flipDays.update(days.toString().padStart(2, '0'));
    flipHours.update(hours.toString().padStart(2, '0'));
    flipMinutes.update(minutes.toString().padStart(2, '0'));
    flipSeconds.update(seconds.toString().padStart(2, '0'));
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza flip counters
    flipDays = new FlipCounter('days');
    flipHours = new FlipCounter('hours');
    flipMinutes = new FlipCounter('minutes');
    flipSeconds = new FlipCounter('seconds');
    
    // Aggiorna countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Avvia simulatore meteo
    weatherSimulator.init();
});
