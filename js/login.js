//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

 function validarLogin() {
    let usuario = document.getElementById("usuario").value;

    sessionStorage.setItem("usuarioIngresado", usuario);
    sessionStorage.setItem("imagen", "img/profile1.png")
 }

//  sessionStorage.getItem("usuarioIngresado")
