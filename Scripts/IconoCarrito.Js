// Escuchador Eventos
document.addEventListener('DOMContentLoaded', () => {

    const Carrito = document.getElementById('IconoCarritoCompras');
    
    const EncapsuladoProductos = document.getElementById('EncapsuladoProductos');

    // Condicional - Verificando Carrito
    if (Carrito) {
        const CarritoCompras = lottie.loadAnimation({
            container: Carrito,
            renderer: 'svg',
            loop: 1,  // Reproducciones   
            autoplay: false, 
            path: '../Imagenes/CarritoCompras.json'
        });

        EncapsuladoProductos.addEventListener('click', (event) => {
            
            const BotonPedir = event.target.closest('.BotonComprar');

            if (BotonPedir) {

                alert("Se ha agregado Correctamente el producto");
                CarritoCompras.stop(); // Resetea la animación
                CarritoCompras.play(); // Reproduce la animación del carrito
            }
        });
    }
});