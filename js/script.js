// Data di destinazione: 2 Novembre 2025 alle 22:00
const targetDate = new Date(2025, 10, 2, 22, 0, 0); // Anno 2025, Mese 10 (Novembre), Giorno 2, Ore 22, Minuti 0, Secondi 0

function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;
    
    // Se il countdown è terminato
    if (timeDifference <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.getElementById('message').style.display = 'block';
        return;
    }
    
    // Calcolo giorni, ore, minuti e secondi
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Aggiornamento dei valori nel DOM
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Aggiornamento iniziale
updateCountdown();

// Aggiornamento ogni secondo
setInterval(updateCountdown, 1000);
