let MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
let markers = [];
let infoWindow ='';
//   let ubicacion  = new Localizacion();
// console.log(ubicacion);
let places ='';
google.maps.event.addDomListener(window, 'load', function(){
let mapa;
  const ubicacion = new Localizacion(()=>{
       const myLatLong = { lat: ubicacion.latitude,  lng: ubicacion.longitude }
        const text = `<h1>Nombre lugar</h1><p>description</p><a href="https://google.com">Pagina web</a>`
       const options = {
            center: myLatLong,
            zoom: 16,
            radius: 100000
        }
        console.log(options);
    mapa = new google.maps.Map(document.getElementById('map'), options);
    console.log(mapa);
   const marcador = new google.maps.Marker({
  position: myLatLong,
  map: mapa,
  title: 'aQUÍ ESTOY',
   });
   infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('modal-content'),
   
  }),document.getElementById('modal-content').style.display='block';

    const windowInformation = new google.maps.InfoWindow({
        content : text
    });
marcador.addListener('click', ()=>{
    windowInformation.open(mapa, marcador);
});

places = new google.maps.places.PlacesService(mapa);
function search() {
    var search = {
    //   bounds: map.getBounds(),
    radius: 2000,
    location: myLatLong,
      types: ['restaurant'],
    };
    places.nearbySearch(search, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // clearResults();
const inputFilter = document.getElementById('filter-restaurant').value;
let newResults = results.filter((result)=>{
return  result['types'].indexOf(inputFilter) > -1 });
console.log(results.filter((result)=>{
  console.log(result['types'].indexOf(inputFilter)  > -1);
return  result['types'].indexOf(inputFilter) > -1 }));

// Create a marker for each hotel found, and
        // assign a letter of the alphabetic to each marker icon.
        for (var i = 0; i < newResults.length; i++) {
          var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
          var markerIcon = MARKER_PATH + markerLetter + '.png';
          // Use marker animation to drop the icons incrementally on the map.
          markers[i] = new google.maps.Marker({
            position: newResults[i].geometry.location,
            animation: google.maps.Animation.DROP,
            icon: markerIcon
          });
          console.log(newResults[i].types,newResults[i].opening_hours, newResults[i].rating);
          // If the user clicks a hotel marker, show the details of that hotel
          // in an info window.
          markers[i].placeResult = results[i];
          google.maps.event.addListener(markers[i], 'click', showInfoWindow);
          setTimeout(dropMarker(i), i * 100);        
        // console.log(newResults);
        }
      }
  }
    )};
    document.getElementById('search-places').addEventListener('click', search); 
   // Get the place details for a hotel. Show the information in an info window,
    // anchored on the marker for the hotel that the user selected.
    function showInfoWindow() {
        var marker = this;
        console.log(marker.placeResult);
        places.getDetails({ placeId: marker.placeResult.place_id },
          function (place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              return;
            }
            infoWindow.open(mapa, marker);
            buildIWContent(place);
          });
      }
   
      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null);
          }
        }
        markers = [];
      }
  
  
      function dropMarker(i) {
        return function () {
          markers[i].setMap(mapa);
        };
      }   

      function buildIWContent(place) {
      
        document.getElementById('modal-content').innerHTML =  `
        <div class="w3-container"
        <div id="id01" class="w3-modal">
            <header class="w3-container w3-teal"> 
              <h2><img class="hotelIcon" src=" ${place.icon}"/>
                <b><a href="${ place.url}">${place.name}</a></h2>
            </header>
               
        <div id="info-content">
            <table>
              <tr id="iw-address-row" class="iw_table_row">
                <td class="iw_attribute_name">Address:</td>
                <td id="iw-address">${place.vicinity}</td>
              </tr>
              <tr id="iw-rating-row" class="iw_table_row">
                <td class="iw_attribute_name">Rating:</td>
                <td id="iw-rating"></td>
              </tr>
            </div>
        </div>
      </div>
      `;
                // Assign a five-star rating to the hotel, using a black star ('&#10029;')
            // to indicate the rating the hotel has earned, and a white star ('&#10025;')
            // for the rating points not achieved.
               if (place.rating) {
              var ratingHtml = '';
              for (var i = 0; i < 5; i++) {
                if (place.rating < (i + 0.5)) {
                  ratingHtml += '&#10025;';
                } else {
                  ratingHtml += '&#10029;';
                }
                document.getElementById('iw-rating-row').style.display = '';
                document.getElementById('iw-rating').innerHTML = ratingHtml;
              }
            } else {
              document.getElementById('iw-rating-row').style.display = 'none';
            }
          }    

  })
});
