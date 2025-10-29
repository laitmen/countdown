// Data di destinazione: 2 Novembre 2025 alle 14:30
const targetDate = new Date(2025, 10, 2, 14, 30, 0); // mese 10 => Novembre

// Inizializza flip counters
let flipDays, flipHours, flipMinutes, flipSeconds;

function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;
    
    // Se il countdown è terminato
    if (timeDifference <= 0) {
        if (flipDays) flipDays.update('00');
        if (flipHours) flipHours.update('00');
        if (flipMinutes) flipMinutes.update('00');
        if (flipSeconds) flipSeconds.update('00');
        const msg = document.getElementById('message');
        if (msg) msg.style.display = 'block';
        return;
    }
    
    // Calcolo giorni, ore, minuti e secondi
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Aggiornamento dei valori con animazione flip (difensivo)
    if (flipDays) flipDays.update(String(days).padStart(2, '0'));
    if (flipHours) flipHours.update(String(hours).padStart(2, '0'));
    if (flipMinutes) flipMinutes.update(String(minutes).padStart(2, '0'));
    if (flipSeconds) flipSeconds.update(String(seconds).padStart(2, '0'));
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza flip counters
    flipDays = new FlipCounter('days');
    flipHours = new FlipCounter('hours');
    flipMinutes = new FlipCounter('minutes');
    flipSeconds = new FlipCounter('seconds');
    
    // Aggiorna countdown subito e poi ogni secondo
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Avvia simulatore meteo (se è definito)
    if (typeof weatherSimulator !== 'undefined' && weatherSimulator && typeof weatherSimulator.init === 'function') {
        weatherSimulator.init();
    }
});
