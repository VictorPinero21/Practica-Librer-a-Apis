const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='; // URL base de la API
const API_KEY = 'YOUR_API_KEY'; // Reemplaza con tu clave real
const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';




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


