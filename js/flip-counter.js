class FlipCounter {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.currentValue = '00';
        if (!this.element) {
            console.warn(`FlipCounter: elemento con id "${elementId}" non trovato.`);
            return;
        }
        this.createFlipCards();
    }

    createFlipCards() {
        // Pulisci l'elemento
        this.element.innerHTML = '';
        this.element.className = 'countdown-number';
        
        // Crea due contenitori per le due cifre (semplice layout: sempre 2 cifre)
        for (let i = 0; i < 2; i++) {
            const digitContainer = document.createElement('div');
            digitContainer.className = 'digit-container';
            
            const digitFlip = document.createElement('div');
            digitFlip.className = 'digit-flip';
            digitFlip.id = `flip-${this.element.id}-${i}`;
            
            const digitTop = document.createElement('div');
            digitTop.className = 'digit-top';
            digitTop.textContent = '0';
            
            const digitBottom = document.createElement('div');
            digitBottom.className = 'digit-bottom';
            digitBottom.textContent = '0';
            
            digitFlip.appendChild(digitTop);
            digitFlip.appendChild(digitBottom);
            digitContainer.appendChild(digitFlip);
            this.element.appendChild(digitContainer);
        }
        
        this.update(this.currentValue);
    }

    update(newValue) {
        if (!this.element) return;
        // Limitiamo a due caratteri (se necessario, manteniamo le ultime 2 cifre)
        newValue = newValue.toString();
        if (newValue.length > 2) {
            // se è un numero >99, mostriamo le ultime due cifre (esempio 123 -> 23)
            newValue = newValue.slice(-2);
        }
        newValue = newValue.padStart(2, '0');

        if (newValue === this.currentValue) return;
        
        for (let i = 0; i < 2; i++) {
            const digitFlip = document.getElementById(`flip-${this.element.id}-${i}`);
            if (!digitFlip) continue;
            const currentDigit = parseInt(this.currentValue[i] || '0', 10);
            const newDigit = parseInt(newValue[i], 10);
            
            if (Number.isNaN(currentDigit) || Number.isNaN(newDigit)) {
                // fallback: scriviamo il nuovo valore direttamente
                const top = digitFlip.querySelector('.digit-top');
                const bottom = digitFlip.querySelector('.digit-bottom');
                top.textContent = newValue[i];
                bottom.textContent = newValue[i];
                continue;
            }
            
            if (currentDigit !== newDigit) {
                this.animateFlip(digitFlip, newDigit);
            } else {
                // Aggiorna senza animazione
                const top = digitFlip.querySelector('.digit-top');
                const bottom = digitFlip.querySelector('.digit-bottom');
                top.textContent = newDigit;
                bottom.textContent = newDigit;
            }
        }
        
        this.currentValue = newValue;
    }

    animateFlip(digitFlip, newDigit) {
        const top = digitFlip.querySelector('.digit-top');
        const bottom = digitFlip.querySelector('.digit-bottom');
        if (!top || !bottom) return;
        
        // Inizia animazione
        digitFlip.classList.add('flipping');
        
        // Aggiorna i testi a metà animazione
        setTimeout(() => {
            top.textContent = newDigit;
            bottom.textContent = newDigit;
            
            // Fine animazione (lasciamo un piccolo delay per la transizione)
            setTimeout(() => {
                digitFlip.classList.remove('flipping');
            }, 350);
        }, 300);
    }
}
