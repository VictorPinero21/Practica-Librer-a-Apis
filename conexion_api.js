const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='; // URL base de la API

async function obtenerLibrosDestacados() {
    try {
        const consulta = 'programación'; // Término de búsqueda genérico
        const respuesta = await fetch(`${API_URL}${consulta}`);
        if (!respuesta.ok) {
            throw new Error('Error al obtener datos de la API');
        }
        const datos = await respuesta.json();

        // Seleccionar libros aleatorios de los resultados
        const libros = seleccionarLibrosAleatorios(datos.items, 8); // Selecciona 8 libros aleatorios

        // Imprimir los libros en la sección correspondiente
        imprimirLibrosDestacados(libros);
    } catch (error) {
        console.error('Error:', error);
    }
}

function seleccionarLibrosAleatorios(libros, cantidad) {
    const librosAleatorios = [];
    const indicesSeleccionados = new Set();

    while (librosAleatorios.length < cantidad && librosAleatorios.length < libros.length) {
        const indiceAleatorio = Math.floor(Math.random() * libros.length);
        if (!indicesSeleccionados.has(indiceAleatorio)) {
            indicesSeleccionados.add(indiceAleatorio);
            librosAleatorios.push(libros[indiceAleatorio]);
        }
    }

    return librosAleatorios;
}

function imprimirLibrosDestacados(libros) {
    const contenedor = document.getElementById('libros-destacados');
    contenedor.innerHTML = ''; // Limpiar contenido previo

    libros.forEach((libro) => {
        const id = libro.id;
        const titulo = libro.volumeInfo.title || 'Título no disponible';
        const autores = libro.volumeInfo.authors?.join(', ') || 'Autor desconocido';
        const portada = libro.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150';

        const libroHTML = `
            <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <img src="${portada}" alt="${titulo}" class="w-32 h-48 object-cover mb-4">
                <h3 class="text-lg font-semibold text-center mb-2">${titulo}</h3>
                <p class="text-gray-600 text-sm mb-4">${autores}</p>
                <button class="text-yellow-500 text-2xl hover:text-yellow-600 mb-2" onclick="guardarFavorito('${id}', '${titulo}')">
                 <i class="fa-solid fa-cart-shopping"></i>
                </button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Ver Detalles</button>
            </div>
        `;

        contenedor.innerHTML += libroHTML;
    });
}

function guardarFavorito(id, titulo) {
    // Obtener favoritos actuales del localStorage o inicializar como un array vacío
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Verificar si el libro ya está en favoritos
    if (!favoritos.some((libro) => libro.id === id)) {
        // Agregar el libro a la lista de favoritos
        favoritos.push({ id, titulo });

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem('favoritos', JSON.stringify(favoritos));

        alert(`"${titulo}" añadido a favoritos.`);
    } else {
        alert(`"${titulo}" ya está en favoritos.`);
    }
}


function storeSearchTerm() {
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput) {
        localStorage.setItem("searchTerm", searchInput);
    }
}



// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerLibrosDestacados);
document.addEventListener("DOMContentLoaded", async () => {
    // Obtener el término de búsqueda del localStorage
    const searchTerm = localStorage.getItem("searchTerm");
    if (!searchTerm) {
       
        document.getElementById("searchInput").preventDefault();
        alert("No hay términos de búsqueda disponibles.");
        window.location.href = "index.html"; // Redirigir si no hay término
        return;
    }

  
        // Llamada a la API de Google Books
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            // Tomar el primer libro de los resultados
            const book = data.items[0].volumeInfo;
            const id = data.items[0].id; // ID del libro
            const titulo = book.title || "Título no disponible";

            // Rellenar los elementos del DOM
            const tituloElement = document.getElementById("titulo");
            const autor = document.getElementById("autor");
            const precio = document.getElementById("precio");
            const descripcion = document.getElementById("descripcion");
            const imagen = document.querySelector("img");

            tituloElement.textContent = titulo;
            autor.textContent = book.authors ? book.authors.join(", ") : "Autor no disponible";
            precio.textContent = book.publishedDate || "Precio no disponible";
            descripcion.textContent = book.description || "Descripción no disponible";
            imagen.src = book.imageLinks?.thumbnail || "https://via.placeholder.com/300";
            imagen.alt = titulo;

            // Crear el botón de añadir a favoritos
            const detallesProducto = document.getElementById("detallesproducto"); // Contenedor
            const botonCarrito = document.createElement("button");
            botonCarrito.className = "mt-6 bg-pink-600 text-white font-bold py-2 px-6 rounded hover:bg-pink-700";
            botonCarrito.textContent = "Añadir a favoritos";

            // Añadir evento al botón
            botonCarrito.addEventListener("click", () => {
                // Obtener favoritos actuales del localStorage o inicializar como un array vacío
                let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

                // Verificar si el libro ya está en favoritos
                if (!favoritos.some((libro) => libro.id === id)) {
                    // Agregar el libro a la lista de favoritos
                    favoritos.push({ id, titulo });

                    // Guardar la lista actualizada en el localStorage
                    localStorage.setItem("favoritos", JSON.stringify(favoritos));

                    alert(`"${titulo}" añadido a favoritos.`);
                } else {
                    alert(`"${titulo}" ya está en favoritos.`);
                }
            });

            // Insertar el botón en el contenedor
            detallesProducto.appendChild(botonCarrito);
        } else {
            alert("No se encontraron resultados para la búsqueda.");
            window.location.href = "index.html"; // Redirigir si no hay resultados
        }
    } 
);

  
  // Función para guardar el libro en el carrito
  function guardarFavorito(id, titulo) {
    // Obtener el carrito actual
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Agregar el nuevo libro al carrito
    carrito.push({ id, titulo });
  
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
    alert(`El libro "${titulo}" ha sido añadido al carrito.`);
  }
  
  function storeSearchTerm() {
    const searchInput = document.getElementById("searchInput").value.trim();

    if (searchInput) {
        // Obtener búsquedas existentes del localStorage
        let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

        // Evitar duplicados y guardar la búsqueda
        if (!searchHistory.includes(searchInput)) {
            searchHistory.push(searchInput);
        }

        // Guardar el arreglo actualizado en el localStorage
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        // Guardar el término actual de búsqueda
        localStorage.setItem("searchTerm", searchInput);
    }
}


