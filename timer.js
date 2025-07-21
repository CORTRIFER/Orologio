let timerInterval;
let totalSeconds = 0;
let isRunning = false;
let savedTime = 0;
let currentInputValues = { hours: 0, minutes: 0, seconds: 0 };

function initTimer() {
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('pause-timer').addEventListener('click', pauseTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);
}

function startTimer() {
    // Se è già in esecuzione, ferma il timer corrente
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }

    // Leggi i valori correnti dagli input
    currentInputValues.hours = parseInt(document.getElementById('hours-input').value) || 0;
    currentInputValues.minutes = parseInt(document.getElementById('minutes-input').value) || 0;
    currentInputValues.seconds = parseInt(document.getElementById('seconds-input').value) || 0;
	
	document.getElementById('hours-input').value = currentInputValues.hours;
    document.getElementById('minutes-input').value = currentInputValues.minutes;
    document.getElementById('seconds-input').value = currentInputValues.seconds;

    // Se non è in pausa, calcola il nuovo tempo
    if (savedTime === 0) {
        totalSeconds = currentInputValues.hours * 3600 + 
                      currentInputValues.minutes * 60 + 
                      currentInputValues.seconds;
    } else {
        // Se è in pausa, usa il tempo salvato
        totalSeconds = savedTime;
        savedTime = 0;
    }

    if (totalSeconds <= 0) return;

    // Avvia il timer
    isRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
    updateTimerDisplay(totalSeconds);
}

function updateTimer() {
    totalSeconds--;
    updateTimerDisplay(totalSeconds);

    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        showCompletionAndReset();
    }
}

function showCompletionAndReset() {
    const display = document.getElementById('timer-display');
    display.textContent = "00:00:00";
    display.style.color = "#ff0000";
    display.style.fontWeight = "bold";
    
    setTimeout(() => {
        resetTimer();
    }, 2000);
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        savedTime = totalSeconds; // Salva il tempo rimanente
        
        // Mantieni i valori originali negli input
        document.getElementById('hours-input').value = currentInputValues.hours;
        document.getElementById('minutes-input').value = currentInputValues.minutes;
        document.getElementById('seconds-input').value = currentInputValues.seconds;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    totalSeconds = 0;
    savedTime = 0;
    currentInputValues = { hours: 0, minutes: 0, seconds: 0 };
    document.getElementById('hours-input').value = '';
    document.getElementById('minutes-input').value = '';
    document.getElementById('seconds-input').value = '';
    
    const display = document.getElementById('timer-display');
    display.textContent = '00:00:00';
    display.style.color = "";
    display.style.fontWeight = "";
}

function updateTimerDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const display = document.getElementById('timer-display');
    display.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (seconds <= 10) {
        display.style.color = "#ff5555";
    } else {
        display.style.color = "";
    }
}

document.addEventListener('DOMContentLoaded', initTimer);