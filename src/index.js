/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

 const baseUrl = "https://randomfox.ca/floof/"

 const appNode = document.querySelector('#images');
 
 //web api
 //conectarnos al server
 //promise --> asinc/await


document.getElementById("clickme").onclick = createImageNode;
function createImageNode() {
  window.fetch(baseUrl)
  //procesar la respuesta y convertirla en JSON
  .then((respuesta) => respuesta.json())
  //JSON --> data --> renderizar info to browser
  .then((responseJson) => {
      //crear imagen
      const imagen = document.createElement("img");
      imagen.className = "mx-auto";
      imagen.width = "320";
      imagen.dataset.src = responseJson.image;
      
      const container = document.createElement("div");
      container.className = "p-4";
      container.append(imagen);

  
      appNode.append(container);
      registerImage(container);
  });
}

//Intersection observer
const isIntersecting = (entry) => {
  return entry.isIntersecting //true si esta dentro de la pantalla.
};

const loadImage = (entry) => {
  const container = entry.target; // container DIV
  const imagen = container.firstChild;
  imagen.src = imagen.dataset.src;

  //des registro de imagen (unlist)
  observador.unobserve(container);
}

//Intersection observer ejecuta la funcion y 
//Me tegresa las entradas que escucha poniendolas en entries
//Inluso si ya fueron intersectadas una vez se salen y vuelven 
//A entrar se ejecutara de nuevo accion
const observador = new IntersectionObserver((entries) => {
  entries.filter(isIntersecting).forEach(loadImage);
});

const registerImage = (imagen) => {
  observador.observe(imagen);
};