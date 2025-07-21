document.getElementById('timezone-selector').addEventListener('change', updateTimezoneDisplay);

function updateTimezoneDisplay() {
    const timezone = document.getElementById('timezone-selector').value;
    const now = new Date();
    
    // Opzioni per l'orario
    const timeOptions = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    // Opzioni per la data
    const dateOptions = {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    // Calcola l'offset GMT
    const timezoneOffset = -now.getTimezoneOffset() / 60;
    const gmtOffset = new Intl.DateTimeFormat('it-IT', {
        timeZone: timezone,
        timeZoneName: 'short'
    }).format(now).split(' ')[1];
    
    // Formatta l'orario
    const timeString = new Intl.DateTimeFormat('it-IT', timeOptions).format(now);
    const timezoneName = timezone.split('/')[1].replace('_', ' ');
    
    // Formatta la data
    const dateString = new Intl.DateTimeFormat('it-IT', dateOptions).format(now);
    
    // Aggiorna la visualizzazione
    document.getElementById('timezone-display').innerHTML = `
        <span class="timezone-city">${timezoneName}</span><br>
        <span class="timezone-time">${timeString} ${gmtOffset}</span>
    `;
    
    document.getElementById('timezone-date').textContent = dateString;
}

// Aggiorna ogni secondo
updateTimezoneDisplay();
setInterval(updateTimezoneDisplay, 1000);