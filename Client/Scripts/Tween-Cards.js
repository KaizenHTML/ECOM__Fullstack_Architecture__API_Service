document.addEventListener("DOMContentLoaded", () => {
    // 1. Buscamos todas las luces (asegúrate que coincida con la clase de tu HTML)
    const glows = document.querySelectorAll('.Border-Glow', ".Encapsulated-Card-Phrase");

    // Solo ejecutamos si existen las luces
    if (glows.length > 0) {
        
        // 2. Creamos una Línea de Tiempo infinita
        const tl = gsap.timeline({ 
            repeat: -1,
        });

        glows.forEach((glow) => {
            // Reiniciamos la ubicación de la luz por seguridad
            gsap.set(glow, { strokeDashoffset: 0, opacity: 0 });

            // 3. Añadimos los pasos a la línea de tiempo
            tl.to(glow, { 
                opacity: 1, 
                duration: 0.5 
            })
            .to(glow, {
                strokeDashoffset: -870, // La ubicación recorre el borde
                duration: 5,             // Velocidad del viaje
                ease: "none"
            }, "-=0.5") // Empieza a moverse un poquito antes de ser 100% visible
            .to(glow, { 
                opacity: 0, 
                duration: 0.5 
            });
            
            // Opcional: un pequeño respiro de 0.2 segundos antes de que salte a la siguiente tarjeta
            tl.to({}, { duration: 0.1 }); 
        });
    }
});