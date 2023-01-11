/*-*-*-*-* Función para cambiar el tema de la web *-*-*/
$(document).ready(() => {
    $('#toggle-checkbox').on('change', () => { //Checkbox con funcion de cambio de colores
       if ($('#toggle-checkbox').is(':checked')){ //Si está seleccionado, cambiar colores a paleta oscura
           document.documentElement.style.setProperty('--bg-color-principal', '#292c35');
           document.documentElement.style.setProperty('--main-text-color', 'white');
           document.documentElement.style.setProperty('--toggle-bg', 'purple');
           document.documentElement.style.setProperty('--toggle-ball', '#292c35');
       } else { //Si está deseleccionado, cambia colores a paleta clara
           document.documentElement.style.setProperty('--bg-color-principal', 'white');
           document.documentElement.style.setProperty('--main-text-color', 'black');
           document.documentElement.style.setProperty('--toggle-bg', '#fcc474');
           document.documentElement.style.setProperty('--toggle-ball', 'white');
       }
    });
  });

/*-*-*-*-* Función caja de noticias dinámica *-*-*/

/*Url del que se obtienen las noticias de una API*/
let key = '433c50007b3f4c27868aeb80a6d2adb1';
let category = 'technology';
let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=433c50007b3f4c27868aeb80a6d2adb1`;

/* Esta función hace una petición a una URL y luego devuelve una respuesta en formato JSON. 
 La respuesta se recorre con el método map, creando un elemento div para cada artículo con sus respectivos atributos.
 Por último se recorre el elemento div que se ha creado con el método each para mostrar el que corresponda según el índice i.*/
let i = 0;
fetch(url).then((resp) => resp.json()).then(dato =>{
    let noticias = (dato.articles);
    noticias.map(function(number, index){
        let div = document.createElement('noticias');
        
        div.className = "news-styles";
        div.id = "div"+index;
        div.innerHTML = `
                            <img style="max-width:800px" src=${number.urlToImage}>
                            <div class= "new-description">
                                <h3>${number.title}</h3>
                                <h4>${number.description}</h4>
                                <button class="boton boton-azul"><a href="${number.url}" target="_blank">Enlace</a></button>
                            </div>`;
        document.getElementById('news-box').appendChild(div); 
    });
})  .then( () => { 
        $(".news-styles").each(function(index){  
        if($(this).attr("id") !== "div"+i) {
                $(this).hide();
            }
        })
});
 // Funciones para pasar las noticias, recorriendo otra vez los div para esconder los que no coincidan y enseñar el que coincida.
function nextNew (){
    $(".news-styles").each(function(index){
        if($(this).attr("id") == "div"+i) {
            $(this).hide();
        }
    })
    i++;
    if(i == 20){
        i = 0;
    }
    $(".news-styles").each(function(index){ 
        if($(this).attr("id") == "div"+i) {
            $(this).show();
        }
    })
}
function prevNew (){
    $(".news-styles").each(function(index){
        if($(this).attr("id") == "div"+i) {
            $(this).hide();
        }
    })
    i--;
    if(i == -1){
        i = 19;
    }
    $(".news-styles").each(function(index){ 
        if($(this).attr("id") == "div"+i) {
            $(this).show();
        }
    })
};


/*-*-*-*-*-*-*Tienda*-*-*-*-*- */
//En esta funcion creamos un conjunto de objetos, con unas categorias para relacionarlas con los servicios
//Al escoger uno, aparecen sus extras, y se pueden añadir obteniendo el precio de estos mediante checkboxes
const services = [
    {category: '1', price: '50',   id: '1',  name:'Web de Estética Simple'},
    {category: '1', price: '100',   id: '2',  name:'Diseño Dinámico'},
    {category: '1', price: '60',   id: '3',  name:'Incorporación de Galerías Dínámicas'},
    {category: '2', price: '100',   id: '4',  name:'Diseño Dinámico'},
    {category: '2', price: '50',   id: '5',  name:'Web de Estética Simple'},
    {category: '2', price: '60',   id: '6',  name:'Incorporación de Galerías Dinámicas'},
    {category: '2', price: '120',   id: '7',  name:'Incorporación de Página Formulario'},
    {category: '3', price: '30',   id: '8',  name:'Actualización de Diseño'},
    {category: '3', price: '200',   id: '9',  name:'Cambio de Lenguaje'},
    {category: '3', price: '400',   id: '10',  name:'Rediseño de Web Total'},
    {category: '3', price: '25',   id: '11',  name:'Adaptación de una única sección'},
    ];
let cost = '';
let result = '';
window.addEventListener("load", () => {  //Creamos un atributo de data value que nos permita organizar los objetos dependiendo de la categoría a la que pertenezcan
        document.getElementById("serv1").setAttribute("data-value", "1");
        document.getElementById("serv2").setAttribute("data-value", "2");
        document.getElementById("serv3").setAttribute("data-value", "3");
        let checkServicios = document.querySelectorAll(".boton-servicio");
        for(let i=0; i < checkServicios.length; i++){ //Obtenemos el precio del servicio que escogemos
            checkServicios[i].setAttribute("data-price", document.getElementById("precio"+i).innerHTML.slice(0, -1));
            checkServicios[i].addEventListener("click", (e) => changeOption(e));
        }
    });
    //Funcion para establecer el servicio escogido, haciendo que aparezcan sus respectivos extras y tomando´
    //su precio para el resultado final
    function changeOption(e){   
        cost = e.target.getAttribute("data-price");//Establecemos el precio
        let focusValue = e.target.getAttribute("data-value");
        const extras = services.filter(service => service.category == focusValue); //Ecogemos los extras del servicio que hemos escogido
        if (document.getElementById('conjuntoExtras') !==''){ //Comprobación de vaciado del elemento donde ponemos los extras, si está lleno lo vacíamos para no solapar
            document.getElementById('conjuntoExtras').innerHTML = '';
        }
        for (let i = 0; i < extras.length; i++) { //Recorremos los extras del servicio escogido y los añadimos al html del elemento que hemos vaciado
            let divExtra = document.createElement('div');
            divExtra.className = "extras-styles";
            divExtra.id = "extra"+i;
            divExtra.innerHTML = `
                            <h3>${extras[i].name}</h3>
                            <p>${extras[i].price} &euro;</p>
                            <input type="checkbox" class="checkbox-style" id="extra-check${i}">`;
            document.getElementById('conjuntoExtras').appendChild(divExtra); 
            document.getElementById('extra-check'+i).addEventListener("change", addExtra);
            let checkboxes = document.getElementsByClassName('checkbox-style');
            
            //Función de cada uno de los extras de los servicios, si es seleccionado obtenemos su valor y lo añadimos al precio del servicio escogido
            function addExtra(){ 
                let checkboxesArray = Array.from(checkboxes);
                let algunoMarcado = checkboxesArray.some(checkbox => checkbox.checked);
                if (algunoMarcado) {
                    let totalAcumulado = 0;
                    for (let j=0; j<checkboxes.length; j++){              
                        if(checkboxes[j].checked){
                            totalAcumulado += parseInt(document.querySelector('#extra'+j+' p').innerHTML);
                        }
                    }
                    result = parseInt(cost) + totalAcumulado;
                    document.getElementById('total').innerHTML = result+'&euro;';
                    plazosPago(tiempoPlazos);
                   
                } else { //En caso de que no haya ninguno marcado, se devuelve el precio al valor inicial para eliminar el precio de todos los checkbox si se ha marcado alguno y se quitan todos.
                    cost = e.target.getAttribute("data-price");
                    result = cost;
                    document.getElementById('total').innerHTML = result+'&euro;';
                    plazosPago(tiempoPlazos);
                }
            }
        }  
        //Mostramos el servicio escogido
        for (let i=1; i<document.querySelectorAll(".carta-servicio").length+1; i++){
            if (focusValue == i){
                document.getElementById('servicioEscogido').innerHTML = document.getElementById("titulo"+i).innerHTML;
                document.getElementById('precioServicio').innerHTML = cost+'&euro;';
                document.getElementById('total').innerHTML = cost+'&euro;';
            }
        }  
    }
    //Funcion que otorga un descuento dependiendo del plazo de tiempo que requieran para el servicio. A más tiempo, mayor descuento.
    function plazosPago(tiempoPlazos){
        let descuento;
        if(document.getElementById("plazos").value == "0"){
            if(tiempoPlazos.value == 0 || tiempoPlazos.value == ""){
                descuento = parseInt(document.getElementById('total').innerHTML) * 1;
                document.getElementById('totalDescuento').innerHTML ="Debe escoger un plazo";
            }
            if(tiempoPlazos.value > 0 && tiempoPlazos.value <= 60){
                descuento = parseInt(document.getElementById('total').innerHTML) * 0.90;
                document.getElementById('totalDescuento').innerHTML = descuento+'&euro;';
            }
            if(tiempoPlazos.value > 60 && tiempoPlazos.value < 120){
                descuento = parseInt(document.getElementById('total').innerHTML) * 0.85;
                document.getElementById('totalDescuento').innerHTML = descuento+'&euro;';
            }
            if(tiempoPlazos.value > 120){
                descuento = parseInt(document.getElementById('total').innerHTML) * 0.8;
                document.getElementById('totalDescuento').innerHTML = descuento+'&euro;';
            }
        } 
         if(document.getElementById("plazos").value == "1"){
            if(tiempoPlazos.value == 0 || tiempoPlazos.value == ""){
                descuento = parseInt(document.getElementById('total').innerHTML) * 1;
                document.getElementById('totalDescuento').innerHTML = "Debe escoger un plazo";
            }
            if(tiempoPlazos.value > 0 && tiempoPlazos.value <= 2){
                descuento = parseInt(document.getElementById('total').innerHTML) * 0.90;
                document.getElementById('totalDescuento').innerHTML = descuento+'&euro;';
            }
            if(tiempoPlazos.value > 2 && tiempoPlazos.value <= 4){
                descuento = parseInt(document.getElementById('total').innerHTML) * 0.85;
                document.getElementById('totalDescuento').innerHTML = descuento+'&euro;';
            }
            if(tiempoPlazos.value > 4){
                descuento = parseInt(document.getElementById('total').innerHTML) * 0.8;
                document.getElementById('totalDescuento').innerHTML = descuento+'&euro;';
            }
        }
    }


/*-*-*-*-*-*-*-*- Validación de formulario *-*-*-*-*-*-*-*-*-*-*/

//Validación del formulario utilizando formulas regulares. Si no coincide, se acumulará el motivo en una variable
//y se cambiará el campo de clase para mostrar gráficamente los inputs con fallos, enseñando la variable con los motivos.
function validation(form){
    let valid = 's';
    let message = '';
    let phoneNumber = /^[6|7|9]([0-9]){8}$/
    let mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/

    if (form.name.value == ''){
        valid = 'n';
        message += 'El campo nombre no puede estar vacío \n';
        $("#name").addClass("wrong");
    }
    if (form.surname.value == ''){
        valid = 'n';
        message += 'El campo apellidos no puede estar vacío \n';
        $("#surname").addClass("wrong");
    };
   if (form.tele.value == ''){
        valid = 'n';
        message += 'El campo teléfono no puede estar vacío \n';
        $("#tele").addClass("wrong");
    }else if (isNaN(parseInt(form.tele.value))){
        valid = 'n';
        message += 'El campo teléfono debe ser numérico \n';                
        $("#tele").addClass("wrong");
    } else { 
        if(!phoneNumber.test(parseInt(form.tele.value))){
            valid = 'n';
            message += 'Debes usar un teléfono español';
            $("#tele").addClass("wrong");
        }
    };
    if (form.email.value == ''){
        valid = 'n';
        message += 'El campo correo electrónico no puede estar vacío \n';
        $("#email").addClass("wrong");
    } else if(!mail.test(form.email.value)) { 
            valid = 'n';
            message += 'Debes usar un correo electrónico';
            $("#email").addClass("wrong");
    };
    if (valid == 's'){
        form.submit();  
        $("*").removeClass("wrong");
    }else{
        alert(message)
    };
}