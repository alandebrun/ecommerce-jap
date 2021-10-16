let articulos = [];
let cantidad = 0;
let costo = 0;
const cotizacion = 40;


//Muestro los datos del carrito, obtenidos de JSON
function carrito(){
  
    let carritoHTML = "";
  
    for (let i=0; i < articulos.length; i++) {
      article = articulos[i];
     
      carritoHTML += ` 
      <tr> 
            <th scope="col"><img src="${article.src}" style="width: 100px; heigth: 100px;"></th>
            <th scope="col">${article.name}</th>
            <th scope="col" class="precioCarrito">${article.currency} ${article.unitCost}</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"><input onchange="update(event)" id="cantidad${i}" class="contador" value="${article.count}" type="number" min="1"></th>
            <th scope="col" id="subTotal${i}">${article.unitCost * article.count}</th>
          </tr>
       `     
    }
    document.getElementById("datos-carrito").innerHTML = carritoHTML;
}


// Funcion de sumar el Subtotal
function update(){
    
    let carrSubTotal = 0;

    for (let i=0; i < articulos.length; i++) {

      cantidad = document.getElementById("cantidad"+i+"").value;
      precio = articulos[i].unitCost;
    
      if (cantidad<=0){
        document.getElementById("cantidad"+i).value = 1;
        cantidad = 1;
      }

      if (articulos[i].currency==="USD") {
        let precioUYU = precio*cotizacion*cantidad;

          document.getElementById("subTotal"+i).innerText = precioUYU;
          carrSubTotal += precioUYU;
      } 

      else {
        let uruguayo = precio*cantidad
        document.getElementById("subTotal"+i).innerText = uruguayo;
        carrSubTotal += uruguayo;
      }
    }
    // Modifico los precios del envio según cual este seleccionado
    let btnEnvio = document.querySelector("input[type=radio]:checked");
    let carrEnvio = 0;

     if (btnEnvio.id === "envioPremium"){
      carrEnvio = carrSubTotal*0.15;
     }

     if (btnEnvio.id === "envioExpress"){
       carrEnvio = carrSubTotal*0.07;
     }

     if (btnEnvio.id === "envioStandard"){
      carrEnvio = carrSubTotal*0.05;
    }
    //Agrego la información a la tabla
    document.getElementById("costoSubtotal").innerText = new Intl.NumberFormat().format(carrSubTotal);
    document.getElementById("costoEnvio").innerText = new Intl.NumberFormat().format(carrEnvio);
    document.getElementById("costoFinal").innerText = new Intl.NumberFormat().format(carrSubTotal + carrEnvio);
    
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART2_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            articulos = resultObj.data.articles;
        }
        
        carrito();
        update();
    });
});


