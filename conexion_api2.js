
// Función para seleccionar libros aleatorios
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
  
  // Función para imprimir libros destacados en el HTML
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
  
  async function obtenerLibrosPorFiltros(categoria = 'programación', anio = 2000) {
      try {
        // Construir la URL con valores predeterminados si no se pasa categoría o año
        const url = `${API_BASE_URL}?q=${categoria}+after:${anio}`;
        console.log('URL generada:', url); // Para depuración
    
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
        console.log('Error al obtener datos de la API');
        }
        const datos = await respuesta.json();
    
        if (!datos.items || datos.items.length === 0) {
          alert('No se encontraron libros para los filtros seleccionados.');
          return;
        }
    
        const libros = seleccionarLibrosAleatorios(datos.items, 8);
        imprimirLibrosDestacados(libros);
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al obtener los datos. Por favor, intenta nuevamente.');
      }
    }
    
    // Manejo del formulario de filtros
    document.getElementById('filtro-form').addEventListener('submit', (evento) => {
      evento.preventDefault();
      //si el usuario no ha seleecionado una categoria por default que sea de programacion
      const categoria = document.getElementById('categoria').value || 'programación';
      const anio = document.getElementById('anio').value || 2000;
    
      obtenerLibrosPorFiltros(categoria, anio);
    });
    
    // Llamada inicial para cargar libros por defecto
    obtenerLibrosPorFiltros();
    
  
  
  async function obtenerLibrosPorFiltros(categoria, anio) {
    try {
  
      const url = `${API_BASE_URL}?q=${categoria}+after:${anio}`;
      console.log('URL generada:', url); // Para depurar
  
      const respuesta = await fetch(url);
      if (!respuesta.ok) {
       alert('Error al obtener datos de la API');
      }
      const datos = await respuesta.json();
  
     
      if (!datos.items || datos.items.length === 0) {
        alert('No se encontraron libros para los filtros seleccionados.');
        return;
      }
  
      // Seleccionar libros aleatorios (8)
      const libros = seleccionarLibrosAleatorios(datos.items, 8);
  
     
      imprimirLibrosDestacados(libros);
    } catch (error) {
      console.error('Error:', error);
    
    }
  }
  
  // Manejar el evento de filtro
  document.getElementById('filtro-form').addEventListener('submit', (evento) => {
    evento.preventDefault();
    const categoria = document.getElementById('categoria').value;
    const anio = document.getElementById('anio').value;
  
    if (categoria && anio) {
      
      obtenerLibrosPorFiltros(categoria, anio);
      
    } else {
      alert('Por favor, selecciona una categoría y un año.');
    }
  });