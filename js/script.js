// Data di destinazione: 2 Novembre alle 22:00
const targetDate = new Date();
// Impostiamo l'anno corrente per il 2 Novembre
targetDate.setMonth(10); // Novembre è il mese 10 (0-based)
targetDate.setDate(2);
targetDate.setHours(22, 0, 0, 0);

// Se siamo già passati dal 2 Novembre di quest'anno, impostiamo per l'anno prossimo
if (targetDate < new Date()) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
}

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
