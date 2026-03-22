// Aspettiamo che il contenuto HTML sia completamente caricato dal browser prima di eseguire il codice
document.addEventListener("DOMContentLoaded", () => {
    
    // Selezioniamo tutti gli elementi HTML a cui abbiamo assegnato la classe "fade-in"
    // querySelectorAll restituisce una lista (NodeList) di questi elementi.
    const fadeElements = document.querySelectorAll('.fade-in');

    // Creiamo le "opzioni" per il nostro osservatore
    const observerOptions = {
        root: null, // Usa la finestra del browser (viewport) come area di controllo
        rootMargin: '0px', // Nessun margine extra attorno alla finestra
        threshold: 0.15 // 0.15 significa: "Fai partire l'animazione quando l'elemento è visibile almeno al 15% nello schermo"
    };

    // Creiamo il vero e proprio "Osservatore" (IntersectionObserver)
    // Prende due parametri: una funzione da eseguire (cosa fare) e le opzioni create sopra.
    const observer = new IntersectionObserver((entries, observer) => {
        
        // entries è la lista degli elementi che stiamo osservando in quel momento
        entries.forEach(entry => {
            // Se l'elemento è entrato nello schermo (isIntersecting è true)
            if (entry.isIntersecting) {
                // Aggiungiamo la classe "visible" all'elemento. 
                // Nel CSS abbiamo detto che ".visible" riporta l'opacità a 1, facendo l'animazione.
                entry.target.classList.add('visible');
                
                // Una volta che l'elemento è apparso, smettiamo di osservarlo. 
                // In questo modo l'animazione avviene solo la prima volta che l'utente fa scroll in giù, 
                // migliorando le prestazioni del sito.
                observer.unobserve(entry.target);
            }
        });
        
    }, observerOptions);

    // Diciamo all'osservatore di iniziare a "guardare" ogni singolo elemento della nostra lista
    fadeElements.forEach(element => {
        observer.observe(element); // Inizia l'osservazione
    });
});