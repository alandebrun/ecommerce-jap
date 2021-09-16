var product = {};
var comments = {};

function galeriaImagenes(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let images = array[i];

        htmlContentToAppend += `
        <div class="col-md-2 text-center m-2">
            <div class="align-center">
                <img class="img-hover" src="` + images + `" alt="">
            </div>
        </div>
        `
        
    }
    document.getElementById("imagenesProducto").innerHTML += htmlContentToAppend;
    document.getElementById("principal").setAttribute("src", array[0]);
}

// Muestro los comentarios
function showComentarios(comments){

    let htmlContentToAppend = "";

    for(let i = 0; i < comments.length; i++){
        let score = comments[i].score;
        let dateTime = comments[i].dateTime;
        let user = comments[i].user;
        let description = comments[i].description;

        htmlContentToAppend += `
        <div>
        <div class="card text-center">
            <div class="card-header">
            ` + puntaje(score) +`
            </div>
        <div class="card-body">
        <h5 class="card-title">` + description +`</h5>
        <p class="card-text">` + user +`</p>
         </div>
        <div class="card-footer text-muted">
        ` + (new Date(dateTime)).toLocaleDateString() +`
        </div>
        </div>
        </div>
        <br>
        `

       
        
    }
    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
}

// Agrego comentarios
function agregarComentario (score, comentario, user){
    let htmlContentToAppend = `
    <div>
    <div class="card text-center">
        <div class="card-header">
        ` + puntaje(score) +`
        </div>
    <div class="card-body">
    <h5 class="card-title">` + comentario +`</h5>
    <p class="card-text">` + user +`</p>
     </div>
    <div class="card-footer text-muted">
    ` + (new Date()).toLocaleDateString() +`
    </div>
    </div>
    </div>
    <br>
    `

    document.getElementById("comentarios").innerHTML += htmlContentToAppend;
}

// Funcion que transforma el puntaje a estrellas
function puntaje (score) {
    let puntaje = ``;
    for (let i = 0; i < score; i++) {
        puntaje += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = 0; i < 5 - score; i++) {
        puntaje += `<span class="fa fa-star"></span>`
    }
    return puntaje;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let nombreProductoHTML = document.getElementById("nombreProducto");
            let descriptionProductoHTML = document.getElementById("descriptionProducto");
            let costoProductoHTML = document.getElementById("costoProducto");
            let monedaProductoHTML = document.getElementById("monedaProducto");
            let ventasProductoHTML = document.getElementById("ventasProducto");
            let categoriaProductoHTML = document.getElementById("categoriaProducto");

            nombreProductoHTML.innerHTML = product.name;
            descriptionProductoHTML.innerHTML = product.description;
            costoProductoHTML.innerHTML = product.cost;
            monedaProductoHTML.innerHTML = product.currency;
            ventasProductoHTML.innerHTML = product.soldCount;
            categoriaProductoHTML.innerHTML = product.category;  

            galeriaImagenes(product.images);

        }

    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultado){
        if (resultado.status === "ok")
        {
            comments = resultado.data;

            showComentarios(comments);
        
        }

    });

    // Funcion del boton enviar que valida entradas

    document.getElementById("btnEnviar").addEventListener("click", function(){
        let comentarioUsuario =  document.getElementById("comentarioUsuario").value;
        let score = document.getElementsByClassName("seleccionado")[0].getAttribute("id")[1];
        
        if (comentarioUsuario !== "" && comentarioUsuario.length > 10)  {
            agregarComentario (score, comentarioUsuario, sessionStorage.getItem("usuarioIngresado"));
            document.getElementById("alerta").setAttribute("hidden", "");
            document.getElementById("corto").setAttribute("hidden", "");
            document.getElementById("comentarioUsuario").value = "";
        }
        else if(comentarioUsuario === ""){
            document.getElementById("alerta").removeAttribute("hidden");
            document.getElementById("corto").setAttribute("hidden", "");
        }        
        else {
            document.getElementById("corto").removeAttribute("hidden");
            document.getElementById("alerta").setAttribute("hidden", "");
        }
    

    });
   
    // Funcion para sistema de puntaje de los comentarios
    document.querySelectorAll(".rangoEstrella").forEach(elem => {
        elem.addEventListener("click", function(){
        let index = this.getAttribute("id");
        // le quito la clase al que ya la tiene
            document.getElementsByClassName("seleccionado")[0].classList.remove("seleccionado");
        // le agrego la clase al que le di click
            this.classList.add("seleccionado");

        let estrellas = document.getElementsByClassName("rangoEstrella");

        for (let element of estrellas){
            if (element.getAttribute("id") <= index){
                element.classList.add("checked"); 
            }
            else {
                element.classList.remove("checked");
            }
        }


    });});


   
});





