        // Java de entrega 2

        const ordenarAmayor = "AZ";
        const ordenarAmenor = "ZA";
        const ordenarRelevancia = "Más relevantes";
        var listaOriginal = [];
        var listaOrdenada = undefined;
        var minimo = undefined;
        var maximo = undefined;
        

        function criterioOrden(criterio, array){
            let result = [];
            // Ordeno de menor a mayor
            if (criterio === ordenarAmayor)  
            {
                result = array.sort(function(a, b) {
                    if (a.cost < b.cost) {return -1;}
                    if (a.cost > b.cost) {return 1;}
                    return 0;
                });
            // Ordeno de menor a mayor
            }else if (criterio === ordenarAmenor) {
                result = array.sort(function(a, b) {
                    if (a.cost > b.cost) {return -1;}
                    if (a.cost < b.cost) {return 1;}
                    return 0;
                });
            // Ordeno por la relevancia de vendidos    
            }else if (criterio === ordenarRelevancia)  {
                result = array.sort(function(a, b) {
                    let aSold = parseInt(a.sold);
                    let bSold = parseInt(b.sold);
        
                    if ( a.soldCount > b.soldCount ){ return -1; }
                    if ( a.soldCount < b.soldCount ){ return 1; }
                    return 0;
                });
            }    
            return result;
        }


        // Funcion que me muestra la lista original o filtrada 

function showList(data){
    let htmlContentToAppend = "";

    for(let i = 0; i < data.length; i++) {
        let nombre = data[i].name;
        let description = data[i].description;
        let cost = data[i].cost;
        let currency = data[i].currency;
        let imgSrc = data[i].imgSrc;
        let soldCount = data[i].soldCount;

    //    1) si estan vacios los dos   //    2) si esta vacio uno pero el otro no
        if (((minimo === undefined) || (minimo != undefined && parseInt(cost) >= minimo)) 
                && //    3) que los dos tengan cosas 
           ((maximo === undefined) || (maximo != undefined && parseInt(cost) <= maximo))){

            htmlContentToAppend += `
                                    <div class="col-md-4">
                                        <div class="card md-4" style="border: 3px solid rgba(0,0,0,.125);">
                                            <a href="product-info.html" style="color:black;text-decoration:none;">
                                                <img src="` + imgSrc + `" alt="` + description + `" class="card-img-top img-Thumbnail">
                                                <div class="card-body">
                                                    <h5 class="card-title"><strong>`+ nombre +`</strong></h5>
                                                    <p class="card-text">` + description + `</p>
                                                </div>
                                                <div class="card-footer">
                                                <div class="row" >
                                                    <div class="col">
                                                        <p class="mb-1" style="color: rgba(0, 128, 0);"><strong>` + currency + " " +  cost +`</strong></p>
                                                    </div>
                                                    <div class="col">
                                                        <small class="text-muted"> Vendidos `+ soldCount +` </small>
                                                    </div>
                                                </div>  
                                                </div>
                                            </a>
                                        </div>
                                        <br>
                                    </div>
                                      
                                        `

        }
        document.getElementById("tabla-de-datos").innerHTML = htmlContentToAppend; 
    }
    
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let url = "https://japdevdep.github.io/ecommerce-api/product/all.json";

    
    fetch(url)
        .then(result => result.json())
        .then(data => {
            
            listaOriginal = data
            listaOrdenada = listaOriginal

        showList(listaOriginal)
    });

    // Llamar las funciones de los botones

    document.getElementById("menorMayor").addEventListener("click", function(){
        listaOrdenada = criterioOrden(ordenarAmayor, listaOriginal);
        showList(listaOrdenada);
    });

    document.getElementById("mayorMenor").addEventListener("click", function(){
        listaOrdenada = criterioOrden(ordenarAmenor, listaOriginal);
        showList(listaOrdenada);
    });

    document.getElementById("ordenVendidos").addEventListener("click", function(){
        listaOrdenada = criterioOrden(ordenarRelevancia, listaOriginal);
        showList(listaOrdenada);
    });

    document.getElementById("btnLimpiar").addEventListener("click", function(){
        document.getElementById("rangoMinimo").value = "";
        document.getElementById("rangoMaximo").value = "";

        minimo = undefined;
        maximo = undefined;

        showList(listaOriginal);
    });

    //Obtengo el mínimo y máximo
    document.getElementById("btnFiltrar").addEventListener("click", function(){
        minimo = document.getElementById("rangoMinimo").value;
        maximo = document.getElementById("rangoMaximo").value;

        if ((minimo != undefined) && (minimo != "") && (parseInt(minimo)) >= 0) {
            minimo = parseInt(minimo);
        }
        else {
            minimo = undefined;
        }

        if ((maximo != undefined) && (maximo != "") && (parseInt(maximo)) >= 0) {
            maximo = parseInt(maximo);
        }
        else {
            maximo = undefined;
        }

        showList(listaOrdenada);
    });
});