function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('favoritos')) || [];
    const contenedor = document.getElementById('carrito-contenido');

    contenedor.innerHTML = ''; // Limpiar contenido previo

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <tr>
                <td class="py-3 px-6 text-center" colspan="2">Tu carrito está vacío.</td>
            </tr>
        `;
        return;
    }

    carrito.forEach((libro, index) => {
        const fila = `
            <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left whitespace-nowrap">
                    <span>${libro.titulo}</span>
                </td>
                <td class="py-3 px-6 text-center">
                    <button class="text-red-600 hover:text-red-800" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        contenedor.innerHTML += fila;
    });
}

function eliminarDelCarrito(indice) {
    const carrito = JSON.parse(localStorage.getItem('favoritos')) || [];
    carrito.splice(indice, 1); // Eliminar el libro del carrito
    localStorage.setItem('favoritos', JSON.stringify(carrito)); // Actualizar el localStorage
    cargarCarrito(); // Recargar la tabla
}

// Cargar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);
