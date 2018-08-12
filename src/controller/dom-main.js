const containerRestaurants = document.getElementById('container-restaurants');
const searchRestaurants = document.getElementById('search-restaurants');
const stringSearch = document.getElementById('string-search');

const msgWelcome = ' Encuentra los mejores restaurantes cerca de tí, en la categoría que prefieras!  🍜🍝🍴🍹 😉';
containerModal = document.getElementById('modal-content');

document.addEventListener('DOMContentLoaded', () => {
  getData(dataRestaurants).then((response) => {
    showRestaurants(response, containerRestaurants, showRating);
  }).then(() => {
    renderModal('Bienvenidx a Foodmap!', msgWelcome, containerModal);
  });
});

searchRestaurants.addEventListener('click', () => {
  getData(dataRestaurants)
    .then((response) => {
      return filterRestaurants(response, stringSearch.value);
    }).then((response) => {
      showRestaurants(response, containerRestaurants, showRating);
    });
});
