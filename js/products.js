//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let url = "https://japdevdep.github.io/ecommerce-api/product/all.json";

    
    fetch(url)
        .then(result => result.json())
        .then(data => {
            console.log(data);

            for(let i = 0; i < data.length; i++) {
                let nombre = data[i].name;
                let description = data[i].description;
                let cost = data[i].cost;
                let currency = data[i].currency;
                let imgSrc = data[i].imgSrc;
                let soldCount = data[i].soldCount;


            document.getElementById("tabla-de-datos").innerHTML += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + imgSrc + `" alt="` + description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1 titulo">`+ nombre +`</h4>
                            <p class="precio">` + currency + " " +  cost +`</p>
                        </div>
                        <p class="mb-1">` + description + `</p>
                        <br>
                        <p class="vendidos">Vendidos `+ soldCount +` </p>
                    </div>
                </div>
            </a>
            `
        }

    
        });

});