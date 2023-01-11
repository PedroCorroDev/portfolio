// Funcion para crear un mapa con la localización del usuario
//Establecemos el mapa, con las coordenadas del usuario como punto central del mismo
let map = L.map('map');
const my_lat = 39.94191353320545;
const my_lng = -0.06370457064690664;
map.setView([my_lat, my_lng], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.control.scale().addTo(map);
L.marker([my_lat, my_lng],{draggable: false}).addTo(map);
//Establecemos en el mapa un punto con un cuadro que se desplega al clickar en el punto
let mark_dates = L.marker([my_lat, my_lng],{draggable: false}).addTo(map);
mark_dates.bindPopup('<div class="popup-image"></div><h1 class="popup-title">PedroCorroDev</h1><div class="popup"><p><i class="fa-sharp fa-solid fa-location-dot"></i> Calle San Miguel, nº 34, Almazora, Castellón</p> <p><i class="fa-solid fa-phone"></i> +34(632 54 82 00)</p> <p><i class="fa-solid fa-envelope"></i> contactopedrodev@gmail.com</p> </div>');

let marker, circle, zoomed;
//Si se obtiene la ubicación del usuario, se toma para trazar una ruta desde la ubicación del usuario hasta la ubicacion de la empresa
function success(pos){
    const client_lat = pos.coords.latitude;
    const client_lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if (marker){ //Se realiza una comprobación de si existen marcas, pues si el usuario cambia de ubicacion se mantendrían, pero las borramos
        map.removeLayer(marker);
        map.removeLayer(circle);
    }
    marker = L.marker([client_lat,client_lng], {draggable: false}).addTo(map);
    circle = L.circle([client_lat,client_lng], {draggable: false}, {radius: accuracy}).addTo(map);
    
    if (!zoomed){
        zoomed = map.fitBounds(circle.getBounds());
    }
    map.setView([client_lat,client_lng])

    L.Routing.control({
        waypoints: [
            L.latLng(client_lat, client_lng),
            L.latLng(my_lat, my_lng)
        ],
        draggable: false,
        editable: false
    }).addTo(map);
    
}
//Si no se obtiene la geolocalizacion, se manda un error que especifica el tipo de error
function error(err){
    if (err.code === 1){
        alert("Por favor permita el acceso a la geolocalización")
} else{
    alert("No se ha podido acceder a la localización")
}
}