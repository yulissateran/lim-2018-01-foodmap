const redirect = () =>{
window.location= 'hotel.html';
return
};
 const  timeout = () => {
    window.setTimeout(redirect, 2000);
    };
 document.addEventListener('DOMContentLoaded', timeout); 
