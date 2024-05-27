function plato() {
  var platillos = document.querySelectorAll('.contenedor-menu__platillos-item');
  platillos.forEach(function(platillo) {
    platillo.addEventListener('click', function() {
      var nombre = platillo.querySelector('h3').textContent;
      var imagen = platillo.querySelector('img').src;
      var precio = platillo.querySelector('h3:nth-child(2)').textContent;
      
      var infoPlatillo = document.getElementById('infoPlatillo');
      
      // Check if infoPlatillo exists
      if (!infoPlatillo) {
        // Create infoPlatillo div if it doesn't exist
        infoPlatillo = document.createElement('div');
        infoPlatillo.id = 'infoPlatillo';

        var closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.onclick = cerrar;
        closeButton.textContent = 'X';
        infoPlatillo.appendChild(closeButton);

        var imagenPlatillo = document.createElement('img');
        imagenPlatillo.id = 'imagenPlatillo';
        imagenPlatillo.alt = 'Imagen del platillo';
        infoPlatillo.appendChild(imagenPlatillo);

        var cbDiv = document.createElement('div');
        cbDiv.className = 'cb';

        var nombrePlatillo = document.createElement('h2');
        nombrePlatillo.id = 'nombrePlatillo';
        cbDiv.appendChild(nombrePlatillo);

        var precioPlatillo = document.createElement('h3');
        precioPlatillo.id = 'precioPlatillo';
        cbDiv.appendChild(precioPlatillo);

        infoPlatillo.appendChild(cbDiv);

        document.body.appendChild(infoPlatillo);
      }

      infoPlatillo.style.display = 'block'; // Mostrar el platillo

      document.getElementById('imagenPlatillo').src = imagen;
      document.getElementById('nombrePlatillo').textContent = nombre;
      document.getElementById('precioPlatillo').textContent = precio;
    // Buscar cbDiv existente
var cbDiv = document.querySelector('.cb');

// Si cbDiv no existe, crear uno nuevo
if (!cbDiv) {
  cbDiv = document.createElement('div');
  cbDiv.className = 'cb';
} else {
  // Si cbDiv ya existe, limpiar su contenido
}

// Resto del código...
      infoPlatillo.appendChild(cbDiv); // Append cbDiv to infoPlatillo
      fetch(`https://revolucionarios-backend.vercel.app/descripcion/${nombre}`)
  .then(response => response.json())
  .then(data => {
    // Check if the description element already exists
    var descripcionPlatillo = document.getElementById('descripcionPlatillo');
    if (descripcionPlatillo) {
      // If it exists, just update its content
      descripcionPlatillo.textContent = data.descripcion;
    } else {
      // If it doesn't exist, create it and append it to cbDiv
      descripcionPlatillo = document.createElement('p');
      descripcionPlatillo.id = 'descripcionPlatillo';
      descripcionPlatillo.textContent = data.descripcion;
      cbDiv.appendChild(descripcionPlatillo);
    }
  })
  .catch(error => console.error('Error:', error));
    });
  });
}

function cerrar() {
  var infoPlatillo = document.getElementById('infoPlatillo');
  if (infoPlatillo) {
    infoPlatillo.classList.add('hide');
    infoPlatillo.addEventListener('animationend', function() {
      if (infoPlatillo.classList.contains('hide')) {
        this.style.display = 'none';  // <-- Error occurs here
        infoPlatillo.classList.remove('hide');
      }
    });
  } else {
    console.error('Elemento con ID "infoPlatillo" no encontrado');
  }
}
async function generarCarrusel() {
    try {
        const response = await fetch('https://revolucionarios-backend.vercel.app/carrusel');
        if (!response.ok) {
            throw new Error('Error al obtener las imágenes del carrusel');
        }
        const data = await response.json();
        const sliderFrame = document.querySelector('.slider-frame');
        sliderFrame.innerHTML = ''; // Clear the slider frame
        data.forEach((url, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide';
            const img = document.createElement('img');
            img.src = url;
            console.log(url);
            img.alt = `Imagen de Carrusel ${index + 1}`;
            slideDiv.appendChild(img);
            sliderFrame.appendChild(slideDiv);
        });

        // Llama a la función Carrusel() después de generar el carrusel
        Carrusel();
    } catch (error) {
        console.error('Error al generar el carrusel:', error);
    }
}
async function setFondo() {
  try {
    const response = await fetch('https://revolucionarios-backend.vercel.app/fondo');
    const data = await response.json();
    const imageUrl = data.url; // Asume que la API devuelve un objeto con una propiedad url

    const elements = document.querySelectorAll('.contenedor-principal,.contenedor-especialidades__carrusel,.presentador,.footer__horarios-estampado');
    elements.forEach(element => {
      element.style.backgroundImage = `url(${imageUrl})`;
    });

    console.log('Imagen de fondo establecida:', imageUrl);
  } catch (err) {
    console.error('Error al obtener la imagen de fondo:', err);
  }
}

function generarPlatillos(tipo, titulo, icono){
  console.log('Tipo:', tipo);
    console.log('Titulo:', titulo);
    console.log('Icono:', icono);
  fetch('https://revolucionarios-backend.vercel.app/platillos')
    .then(response => response.json())
    .then(data => {
  let html = '';
  // Filtrar los platillos para solo incluir los de tipo especificado
  const platillos = data.filter(platillo => platillo.tipo === tipo);
  platillos.forEach(platillo => {
    // Hacer una solicitud a la API para obtener la imagen
    fetch(`https://revolucionarios-backend.vercel.app/imagen/${platillo.id_imagen}`)
      .then(response => response.json())
      .then(imagen => {
        html += `<div class='contenedor-menu__platillos-item'>
                   <img src='${imagen.url}' alt='platilo-${platillo.id_platillo}'/>
                   <div class='contenedor-menu__platillos-item-txt'>
                     <h3>${platillo.nombre}</h3>
                     <h3>$${platillo.Precio}</h3>
                   </div>
                 </div>`;
        document.getElementById('contMenu').innerHTML = html;
        document.getElementById("opMenu").innerHTML = titulo;
        document.getElementById("imgMenu").src = icono;
        console.log('Platillos generados exitosamente');
        plato(); // Llamar a la función plato() después de generar los platillos
      })
      .catch(error => {
        console.log('Error al generar la imagen del platillo:', error);
      });
  });
});
}

function Taco(){
  generarPlatillos('Taco', 'Tacos', './src/img/icons8-taco-100.png');
}

function Especial(){
  generarPlatillos('Especial', 'Especialidades', './src/img/icons8-comida-100 (1).png');
}

function Parrilla(){
  generarPlatillos('Parrilla', 'A la Parrilla', './src/img/icons8-filete-muy-caliente-100.png');
}

function Marisco(){
  generarPlatillos('Marisco', 'Mariscos', './src/img/icons8-comida-100.png');
}
document.addEventListener('DOMContentLoaded', (event) => {
    setFondo();
    generarCarrusel();
    plato();
    generarPlatillos('Taco', 'Tacos', './src/img/icons8-taco-100.png');
    // Obtén la barra de búsqueda
const searchBar = document.querySelector('.busqueda input');

// Añade un evento de escucha
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  // Utiliza la función generarPlatillos para obtener todos los platillos
  fetch('https://revolucionarios-backend.vercel.app/platillos')
    .then(response => response.json())
    .then(data => {
      // Filtra los platillos basándose en el valor de la búsqueda
      const filteredPlatillos = data.filter(platillo => platillo.nombre.toLowerCase().includes(searchString));

      // Limpia el contenedor de platillos
      document.getElementById('contMenu').innerHTML = '';

      // Genera los platillos filtrados
      filteredPlatillos.forEach(platillo => {
        fetch(`https://revolucionarios-backend.vercel.app/${platillo.id_imagen}`)
          .then(response => response.json())
          .then(imagen => {
            const html = `<div class='contenedor-menu__platillos-item'>
                            <img src='${imagen.url}' alt='platilo-${platillo.id}'/>
                            <div class='contenedor-menu__platillos-item-txt'>
                              <h3>${platillo.nombre}</h3>
                              <h3>$${platillo.Precio}</h3>
                            </div>
                          </div>`;
            document.getElementById('contMenu').innerHTML += html;
          })
      });
    });
});
});

function Carrusel() {
  const diapositivas = document.querySelectorAll('.slide');
  let diapositivaActual = 0;

  function mostrarDiapositiva(n) {
      diapositivas[diapositivaActual].classList.add('salida');
      setTimeout(() => {
          diapositivas[diapositivaActual].classList.remove('activa');
          diapositivas[diapositivaActual].classList.remove('salida');
          diapositivaActual = (n + diapositivas.length) % diapositivas.length;
          diapositivas[diapositivaActual].classList.add('activa');
      }, 1000); // Ajusta este valor al tiempo de duración de tu animación
  }

  function siguienteDiapositiva() {
      mostrarDiapositiva(diapositivaActual + 1);
  }

  setInterval(siguienteDiapositiva, 3000);
}

