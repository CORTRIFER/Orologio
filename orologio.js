let animationId;
let lastUpdateTime = 0;

function aggiornaOrologio() {
    
	const ora = new Date();
    
    // Formato digitale
    let h = ora.getHours();
    const m = ora.getMinutes();
    const s = ora.getSeconds();
	
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
   
    const hh = h12.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');

    document.getElementById("digital-clock").textContent = `${hh}:${mm}:${ss} ${ampm}`;
    
    // Calcolo angoli lancette
    const secDeg = s * 6;
    const minDeg = m * 6 + s * 0.1;
    const hourDeg = (h % 12) * 30 + m * 0.5;

    // Applicazione trasformazioni (con ottimizzazione fluidità)
    const secondHand = document.getElementById("second-hand");
    const minuteHand = document.getElementById("minute-hand");
    const hourHand = document.getElementById("hour-hand");
    
    secondHand.style.transform = `translate(-50%, -100%) rotate(${secDeg}deg)`;
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${minDeg}deg)`;
    hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    
    // Richiesta del prossimo frame
    animationId = requestAnimationFrame(aggiornaOrologio);
}

function creaQuadranteAnalogico() {
    
	const clock = document.getElementById("analog-clock");
    clock.querySelectorAll(".numero-ora, .tacca-ora, .tacca-minuto").forEach(el => el.remove());

    const clockSize = 250;
    const center = clockSize / 2;

    for (let i = 0; i < 60; i++) {
        
		const angle = i * 6;
        const isHourMark = i % 5 === 0;

        const tacca = document.createElement("div");
        tacca.className = isHourMark ? "tacca-ora" : "tacca-minuto";
        tacca.style.transform = `rotate(${angle}deg)`;
        clock.appendChild(tacca);

        if (isHourMark) {
            
			const numero = document.createElement("div");
            numero.className = "numero-ora";
            
			const hourNum = i === 0 ? 12 : i / 5;
            const radius = 100;
            const rad = (angle - 90) * (Math.PI / 180);
            
			numero.style.left = `${center + Math.cos(rad) * radius}px`;
            numero.style.top = `${center + Math.sin(rad) * radius}px`;
            numero.textContent = hourNum;
            clock.appendChild(numero);
        }
    }
}

// Gestione efficiente della visibilità
function handleVisibilityChange() {
    
	if (document.hidden) {
        
		cancelAnimationFrame(animationId);
    } 
	else {
		
        animationId = requestAnimationFrame(aggiornaOrologio);
    }
}

// Inizializzazione
function initOrologio() {
    
	creaQuadranteAnalogico();
    animationId = requestAnimationFrame(aggiornaOrologio);
    document.addEventListener("visibilitychange", handleVisibilityChange);
}

// Avvio quando il DOM è pronto
if (document.readyState === "loading") {
    
	document.addEventListener("DOMContentLoaded", initOrologio);
} 
else {
	
    initOrologio();
}