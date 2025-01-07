// Obtener libros de la API
  
const imprimirLibros = () => {
    // Mostrar el primer libro encontrado en el DOM
    if (LibrosTotales.length > 0) {
       const libro = LibrosTotales[0];
       const bookDetails = document.getElementById("bookDetails");

       bookDetails.innerHTML = `
           <h2 class="text-xl font-bold text-gray-800">${libro.tittle}</h2>
           <p class="text-gray-600">${libro.authors.join(", ")}</p>
           <p class="mt-4">${libro.description}</p>
           <img class="mt-4" src="${libro.imagen || 'https://via.placeholder.com/150'}" alt="${libro.tittle}">
           <p class="mt-2 text-gray-600">Publicado por: ${libro.editorial}</p>
           <p class="mt-2 text-gray-600">Fecha de publicación: ${libro.fechaPublicacion}</p>
           <p class="mt-2 text-gray-600">Categorías: ${libro.categories.join(", ")}</p>
       `;
   } else {
       document.getElementById("bookDetails").innerHTML =
           "<p class='text-gray-600'>No se encontró información para este libro.</p>";
   }
};
const getLibros = async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("query") || "Harry Potter"; // Valor por defecto si no hay consulta
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();
  
      // Mapear resultados al array de libros
      const LibrosTotales = data.items.map((item) => {
        return new Libro(
            item.id,
            item.volumeInfo.title,
            item.volumeInfo.subtitle,
            item.volumeInfo.authors || ["Autor no disponible"],
            item.volumeInfo.publisher || "Editorial desconocida",
            item.volumeInfo.publishedDate || "Fecha no disponible",
            item.volumeInfo.description || "Descripción no disponible",
            item.volumeInfo.categories || ["Sin categoría"],
            item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null
        );
      });
  
      imprimirLibros();
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  
  // Event listener para cargar los libros al cargar el DOM
  document.addEventListener("DOMContentLoaded", getLibros);