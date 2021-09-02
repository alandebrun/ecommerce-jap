document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("fotoPrincipal").setAttribute("src", sessionStorage.getItem("imagen"));
    let imagenes = document.getElementsByClassName("imgCambio");

    for(let unaImagen of imagenes) {
        unaImagen.addEventListener("click", function(img){
            let url = unaImagen.getAttribute("src");
            
            document.getElementById("fotoPrincipal").setAttribute("src", url);
            sessionStorage.setItem("imagen", url);        
        });
    }

});