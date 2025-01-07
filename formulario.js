const apiKey = 'TU_CLAVE_API'; // Reemplaza con tu clave de API
const urlBase = "https://www.googleapis.com/books/v1/volumes";
let LibrosTotales = [];


// Capturar el formulario y el campo de búsqueda
document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const searchQuery = document.getElementById("searchInput").value.trim();
  console.log(`Término buscado: ${searchQuery}`); 

  if (searchQuery) {
    const url = `./pages/ficha.html?q=${encodeURIComponent(searchQuery)}`;
    console.log(`Redirigiendo a: ${url}`); 
    window.location.href = url;
  } else {
    console.warn("No se ingresó un término de búsqueda.");
  }
});
