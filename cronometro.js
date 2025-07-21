let stopwatchInterval;
let stopwatchStartTime;
let stopwatchElapsed = 0;
let stopwatchIsRunning = false;
let laps = [];

document.getElementById('start-stopwatch').addEventListener('click', startStopwatch);
document.getElementById('pause-stopwatch').addEventListener('click', pauseStopwatch);
document.getElementById('reset-stopwatch').addEventListener('click', resetStopwatch);
document.getElementById('lap-stopwatch').addEventListener('click', recordLap);

function startStopwatch() {
    
	if (!stopwatchIsRunning) {
        
		stopwatchStartTime = Date.now() - stopwatchElapsed;
        stopwatchInterval = setInterval(updateStopwatch, 10);
        stopwatchIsRunning = true;
    }
}

function pauseStopwatch() {
    
	clearInterval(stopwatchInterval);
    stopwatchIsRunning = false;
}

function resetStopwatch() {
    
	clearInterval(stopwatchInterval);
    stopwatchElapsed = 0;
    stopwatchIsRunning = false;
    
	document.getElementById('stopwatch-display').textContent = '00:00:00.000';
    document.getElementById('laps-container').innerHTML = '';
    laps = [];
}

function recordLap() {
    
	if (!stopwatchIsRunning) return;
    
    const currentTime = document.getElementById('stopwatch-display').textContent;
    const lapItem = document.createElement('div');
	
	lapItem.style.backgroundColor = 'rgba(0, 230, 230, 0.15)';
	lapItem.style.transition = 'background-color 0.5s ease';

	// E dopo 0,4s secondi torna al colore normale
	setTimeout(() => {
		
		lapItem.style.backgroundColor = '';
		
	}, 400);
	
    lapItem.className = 'lap-item';
    lapItem.textContent = `Giro ${laps.length + 1}: ${currentTime}`;
    
    const lapsContainer = document.getElementById('laps-container');
    lapsContainer.appendChild(lapItem);
    laps.push(currentTime);
    
    // Scroll automatico all'ultimo giro aggiunto
    lapsContainer.scrollTop = lapsContainer.scrollHeight;
}

function updateStopwatch() {
    
	stopwatchElapsed = Date.now() - stopwatchStartTime;
    
    const hours = Math.floor(stopwatchElapsed / 3600000);
    const minutes = Math.floor((stopwatchElapsed % 3600000) / 60000);
    const seconds = Math.floor((stopwatchElapsed % 60000) / 1000);
    const milliseconds = stopwatchElapsed % 1000;
    
    document.getElementById('stopwatch-display').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}