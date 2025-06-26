// Funciones/renderizarProductos.js
// Este script se encarga únicamente de leer los datos de productos.js
// y renderizarlos en el HTML.

document.addEventListener('DOMContentLoaded', () => {
    // Referencia al contenedor donde se insertarán los productos
    const encapsuladoProductos = document.getElementById('EncapsuladoProductos');

    // Función para formatear el precio a moneda local
    // Mantenemos esta función aquí porque es directamente relevante para la presentación del precio.
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Organiza los productos por categoría para agruparlos visualmente
    // Esto asegura que los productos de "Carnes" aparezcan juntos, luego "Verduras", etc.
    const productosPorCategoria = productos.reduce((acc, producto) => {
        if (!acc[producto.categoria]) {
            acc[producto.categoria] = [];
        }
        acc[producto.categoria].push(producto);
        return acc;
    }, {});

    // Itera sobre cada categoría y sus productos para crear el HTML
    for (const categoria in productosPorCategoria) {
        // Asegúrate de que la propiedad sea propia del objeto y no heredada
        if (productosPorCategoria.hasOwnProperty(categoria)) {
            // Crea el título de la categoría (ej. <h3>CARNES</h3>)
            const h3 = document.createElement('h3');
            h3.id = categoria; // Asigna un ID para que los enlaces del menú funcionen (ej. <a href="#Carnes">)
            h3.textContent = categoria.toUpperCase(); // Convierte el nombre de la categoría a mayúsculas
            encapsuladoProductos.appendChild(h3); // Añade el título al contenedor principal

            // Itera sobre cada producto dentro de la categoría actual
            productosPorCategoria[categoria].forEach(producto => {
                const divProducto = document.createElement('div'); // Crea el div para cada producto
                divProducto.classList.add('EncapsuladoProducto'); // Añade la clase CSS
                divProducto.id = producto.id; // Asigna un ID único al div del producto

                // Inserta el HTML interno del producto usando los datos del objeto JSON
                divProducto.innerHTML = `
                    <img src="${producto.imagen}" class="Imagen" alt="Imagen de ${producto.nombre}">
                    <samp class="Nombre"> ${producto.nombre} </samp>
                    <samp class="Precio" data-precio="${producto.precio}"> ${formatPrice(producto.precio)} </samp>
                    <button class="Boton BotonComprar" data-producto="${producto.nombre}" data-id="${producto.id}"> Pedir </button>
                `;
                encapsuladoProductos.appendChild(divProducto); // Añade el div del producto al contenedor principal
            });
        }
    }

    // Nota: Toda la lógica de modales y manejo de eventos de clic en los botones "Pedir"
    // ha sido ELIMINADA de este archivo. Deberás manejar esa lógica en otro script.
});