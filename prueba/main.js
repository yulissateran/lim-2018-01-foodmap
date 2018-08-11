
class Localizacion {

  constructor (callback){
   if (navigator.geolocation) {
     //obtenemos ubicación
    navigator.geolocation.getCurrentPosition((position)=>{
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      callback();
      console.log(this);
    });
   }else {
     alert('Tu navegador no soporta geolocalización');
   }
  }
}
