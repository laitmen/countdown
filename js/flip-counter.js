class FlipCounter {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.currentValue = '00';
        this.createFlipCards();
    }

    createFlipCards() {
        this.element.innerHTML = '';
        
        for (let i = 0; i < 2; i++) {
            const flipCounter = document.createElement('div');
            flipCounter.className = 'flip-counter';
            
            const flipCard = document.createElement('div');
            flipCard.className = 'flip-card';
            flipCard.id = `flip-${this.element.id}-${i}`;
            
            const top = document.createElement('div');
            top.className = 'flip-card-top';
            top.textContent = '0';
            
            const bottom = document.createElement('div');
            bottom.className = 'flip-card-bottom';
            bottom.textContent = '0';
            
            flipCard.appendChild(top);
            flipCard.appendChild(bottom);
            flipCounter.appendChild(flipCard);
            this.element.appendChild(flipCounter);
        }
        
        this.update(this.currentValue);
    }

    update(newValue) {
        newValue = newValue.toString().padStart(2, '0');
        
        if (newValue === this.currentValue) return;
        
        for (let i = 0; i < 2; i++) {
            const flipCard = document.getElementById(`flip-${this.element.id}-${i}`);
            const currentDigit = parseInt(this.currentValue[i]);
            const newDigit = parseInt(newValue[i]);
            
            if (currentDigit !== newDigit) {
                this.animateFlip(flipCard, newDigit);
            } else {
                // Aggiorna senza animazione se la cifra non è cambiata
                const top = flipCard.querySelector('.flip-card-top');
                const bottom = flipCard.querySelector('.flip-card-bottom');
                top.textContent = newDigit;
                bottom.textContent = newDigit;
            }
        }
        
        this.currentValue = newValue;
    }

    animateFlip(flipCard, newDigit) {
        const top = flipCard.querySelector('.flip-card-top');
        const bottom = flipCard.querySelector('.flip-card-bottom');
        
        // Inizia animazione
        flipCard.classList.add('flipping');
        
        // Mezzo secondo dopo, aggiorna i numeri
        setTimeout(() => {
            top.textContent = newDigit;
            bottom.textContent = newDigit;
            
            // Fine animazione
            setTimeout(() => {
                flipCard.classList.remove('flipping');
            }, 50);
        }, 300);
    }
}
