// === CONFIGURAZIONE ===
// Imposta qui la data di destinazione del countdown
const targetDate = new Date("2025-12-31T23:59:59").getTime();

/**
 * Funzione che aggiorna il conto alla rovescia ogni secondo
 */
function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "🎉 È arrivato il momento!";
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = 
    `${days}g ${hours}h ${minutes}m ${seconds}s`;
}

// === AGGIORNAMENTO OGNI SECONDO ===
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

/**
 * Funzione che cambia lo sfondo in base all'ora locale
 */
function updateBackground() {
  const hour = new Date().getHours();
  let imageUrl = "";

  if (hour >= 6 && hour < 12) {
    imageUrl = "url('images/morning.jpg')";     // Mattina
  } else if (hour >= 12 && hour < 18) {
    imageUrl = "url('images/afternoon.jpg')";   // Pomeriggio
  } else if (hour >= 18 && hour < 21) {
    imageUrl = "url('images/evening.jpg')";     // Sera
  } else {
    imageUrl = "url('images/night.jpg')";       // Notte
  }

  document.body.style.backgroundImage = imageUrl;
}

// Aggiorna lo sfondo ogni minuto
updateBackground();
setInterval(updateBackground, 60000);
