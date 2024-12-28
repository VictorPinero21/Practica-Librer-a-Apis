const query = document.getElementById("Libro"); // Reemplaza con tu término de búsqueda
const apiKey = 'TU_CLAVE_API'; // Reemplaza con tu clave de API
const url = "https://www.googleapis.com/books/v1/volumes";

LibrosTotales=[];

 //Ejemplo de ruta sin key https://www.googleapis.com/books/v1/volumes?q=harry+potter
 //`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`

const imprimirLibros = () =>{
    // card
     productosTotales.forEach(producto => {
      let card = document.createElement("ARTICLE");
      card.classList.add("card");
    
      // img
      let img = document.createElement("IMG");
      img.classList.add("card__img");
      img.src = producto.imagen
      card.appendChild(img);
    
      // p
      let p = document.createElement("P");
      p.classList.add("card__text");
      p.textContent = producto.nombre
      card.appendChild(p);
    
      // div
      let div = document.createElement("DIV");
      div.classList.add("card__precios");
      card.appendChild(div);
    
      // span
      let span = document.createElement("SPAN");
      span.classList.add("card__rebajado");
      span.textContent = producto.precio
      div.appendChild(span);
    
      // span precio
      let spanp = document.createElement("SPAN");
      spanp.classList.add("card__precio");
      spanp.textContent = producto.precio
      div.appendChild(spanp);
    
      // button
      let button = document.createElement("BUTTON");
      button.classList.add("card__button");
      button.textContent = "Añadir al carro";
    
      // i
      let i = document.createElement("I");
      i.classList.add("fa-solid");
      i.classList.add("fa-cart-arrow-down");
      i.classList.add("card__icon");
      button.appendChild(i);
      card.appendChild(button);
      
  
      main.appendChild(card);
    });
    
  }
  const getLibros = async () => {
    try {
      fetch(url)
      .then(res=>res.json())
      .then(json=>{
        json.forEach(Lib => {
          const libro = new Libro(Lib.id,Lib.title,Lib.price,Lib.image);
          LibrosTotales.push(libro);
        });
        imprimirLibros();
      })  
    } catch (error) {
      console.error('Error:', error);
    }
  
  };




document.addEventListener("DOMContentLoaded",getLibros)