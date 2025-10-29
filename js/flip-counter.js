class FlipCounter {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.currentValue = '00';
        this.createFlipCards();
    }

    createFlipCards() {
        // Pulisci l'elemento
        this.element.innerHTML = '';
        this.element.className = 'countdown-number';
        
        // Crea due contenitori per le due cifre
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
        newValue = newValue.toString().padStart(2, '0');
        
        if (newValue === this.currentValue) return;
        
        for (let i = 0; i < 2; i++) {
            const digitFlip = document.getElementById(`flip-${this.element.id}-${i}`);
            const currentDigit = parseInt(this.currentValue[i]);
            const newDigit = parseInt(newValue[i]);
            
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
        
        // Inizia animazione
        digitFlip.classList.add('flipping');
        
        // Mezzo secondo dopo, aggiorna i numeri
        setTimeout(() => {
            top.textContent = newDigit;
            bottom.textContent = newDigit;
            
            // Fine animazione
            setTimeout(() => {
                digitFlip.classList.remove('flipping');
            }, 50);
        }, 300);
    }
}
