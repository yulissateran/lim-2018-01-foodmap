const dataRestaurants = '../data/restaurants.json';
let ratingRestaurant = '';
const starts = [0, 1, 2, 3, 4];

// función llamado a los datos
const getData = (url) => {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => error);
};


// crea estrellas para indicar el rating de un restaurante
const showRating = (element) => {
  ratingRestaurant = '';
  if (element.rating) {
    for (let i in starts) {
      if (element.rating < (parseInt(i) + 0.5)) {
        ratingRestaurant += '&#10025;';
      } else {
        ratingRestaurant += '&#10029;';
      }
    }
  }
  return ratingRestaurant;
};
//filtra restaurantes que sean del tipo del string dado.
const filterRestaurants = (response, string) => response.filter((restaurant) => restaurant.types.includes(string));

//función modal: modal de bienvenida e información de restaurantes se mostrarán el él.
const renderModal = (title, texto, container, img) => {
  container.innerHTML = `
  <div id="modal" class="modal">
<div class="modal-content">
<div class="modal-header">
    <span id="close-modal" class="close">&times;</span>
    <h2>${title}</h2>
 </div>
 <div class="modal-body">
 <p><strong>${texto}</strong></p>
 <figure class"restaurant-img"><img class="img-rest" id="img-modal" class=/></figure>
 </div>
</div>
</div>`, document.getElementById('close-modal').addEventListener('click', () => container.innerHTML = '')
    , document.getElementById('modal').addEventListener('click', () => container.innerHTML = '');
  if (img) {
    const imgContainer = document.getElementById('img-modal');
    imgContainer.setAttribute('src', img);
  }
};


//trae información del restaurante seleccionado para mostrarlo en el modal
const moreInformationRestaurant = () => {
  const idRestaurant = event.target.getAttribute('id-restaurant');
  getData(dataRestaurants).then((response) => {
    return response.filter((restaurant) => restaurant.id === idRestaurant);
  }).then((response) => {
    renderModal(response[0].name, 	'Delivery:  &phone; 12345689', containerModal, response[0].photos);
  })
};

// crea divs con la información de cada restaurante
showRestaurants = (response, containerRestaurants, showRating, dataRestaurants) => {
  containerRestaurants.innerHTML = '';
  response.forEach(element => {
    let countStarts = showRating(element);
    containerRestaurants.innerHTML += `
    <div  class="restaurant">
    <figure  class="restaurant-img" ">
    <img  class="img-rest" src="${element.photos}" />   
    </figure>
    <div  class="restaurant-info">   
    <ul  class="list-info-restaurant">
    <li class="name-restaurant"><strong>${element.name} <img height=20 width=20 src="${element.icon}"/></strong></li>
    <li id="restaurant-rating">${countStarts}</li>
    <li>${element.vicinity}</li>
    </ul>
    <span class="more-info-restaurant" id-restaurant=${element.id}><img class="icon" src="../view//assets/img/phone-symbol-of-an-auricular-inside-a-circle.png"/></span>
    </div>
    </div>`;
  }), addEvent(containerRestaurants);
  return containerRestaurants
};

// agrega evento para mostrar modal a cada botón de los divs
const addEvent = (containerRestaurants) => {
  const elementMoreInfo = document.getElementsByClassName('more-info-restaurant');
  if (elementMoreInfo !== '') {
    for (let i of elementMoreInfo) {
      i.addEventListener('click', moreInformationRestaurant, false);
    };
  };
};