//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

 function validarLogin() {
    let usuario = document.getElementById("usuario").value;

    localStorage.setItem("usuarioIngresado", usuario);
    localStorage.setItem("imagen", "img/profile1.png")
 }

//Funcion para cerrar sesion
function cerrarSesion(){

   localStorage.clear()
}