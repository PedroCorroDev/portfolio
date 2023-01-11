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
/*Libreria dinamica*/ 

let i = 0;
const sliderImages = []

sliderImages[0] = '../assets/img/meteoapp.png'
sliderImages[1] = '../assets/img/calculadora.jpg'
sliderImages[2] = '../assets/img/reproapp.jpg'
sliderImages[3] = '../assets/img/tiendaapp.png'

window.addEventListener('load', () => {
    
 
  document.getElementById('slider').style.backgroundImage = "url(" + sliderImages[i] + ")"; 
  for (let j = 0; j < sliderImages.length; j++) {
      let iExtra = document.createElement('i');
      iExtra.className = "fa-square fa-regular";
      iExtra.id = "square"+j;
      if (iExtra.id == "square0"){iExtra.className = "fa-square fa-solid"};
      document.getElementById('squaresSliders').appendChild(iExtra); 
      document.getElementById('square'+j).addEventListener("click", goToImage);
    }


  function changeInterval() { 
    document.getElementById('slider').style.backgroundImage = "url(" + sliderImages[i] + ")"; 
    for(let j = 0; j < sliderImages.length; j++){
      if(j == i){
        document.getElementById('square'+j).className = "fa-square fa-solid";
      }else{
        document.getElementById('square'+j).className = "fa-square fa-regular";
      }
    };
    i++;
    if(i == sliderImages.length){
      i=0;
    }
  }

  let intervalID = setInterval(changeInterval, 3000);

  document.getElementById('playInterval').addEventListener("change", () => {
    let playInterval = document.getElementById('playInterval');
    if(playInterval.checked) {
      document.getElementById('labelInterval').className = "fa-solid fa-play";
      clearInterval(intervalID);
    }else{
      document.getElementById('labelInterval').className = "fa-solid fa-pause";
      intervalID = setInterval(changeInterval, 3000);
    }
  });

  function goToImage(e){
    let idSquare = parseInt(e.target.id.replace(/[^0-9\.]/g, ''));
    console.log(idSquare);
    document.getElementById('slider').style.backgroundImage = "url(" + sliderImages[idSquare] + ")"; 
    for(let k = 0; k < sliderImages.length; k++){
      if(idSquare == k){
        document.getElementById('square'+k).className = "fa-square fa-solid";
        i = idSquare;
      }else{
        document.getElementById('square'+k).className = "fa-square fa-regular";
      }
    }
  } 
});