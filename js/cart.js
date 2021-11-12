let articulos = [];
let cantidad = 0;
let costo = 0;
var cotizacion = 40;
//Entrega 7
var numeroTarjeta = document.getElementById("numeroTarjeta");
var vencimientoTarjeta = document.getElementById("vencimientoTarjeta");
var codigoCVV = document.getElementById("codigoTarjeta");
var cuentaBancaria = document.getElementById("cuentaBancaria");
var banco = document.getElementById("banco");

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

//Entrega 7

//Funcion de seleccionar y editar la forma de pago "tarjeta". Agrego botones
function editarPagoTarjeta(){
    document.getElementById("formaPago1").innerHTML =
    `<button type="submit" class="btn btn-info" onclick="cancelar()">Tarjeta de crédito</button>
    <button type="submit" class="btn btn-success" onclick="guardarTarjeta()">Guardar</button>
    <button type="submit" class="btn btn-danger" onclick="borrarTarjeta()">Borrar</button>`

      numeroTarjeta.disabled = false;
      vencimientoTarjeta.disabled = false;
      codigoTarjeta.disabled = false;
}

//Funcion que guarda los datos de la tarjeta
function guardarTarjeta(){
//Transforma los datos en JSON y se guarda
  let datosTarjeta = { 
  'numero': numeroTarjeta.value,
  'vencimiento': vencimientoTarjeta.value,
  'codigo': codigoCVV.value
  };
     localStorage.setItem('datosTarjeta', JSON.stringify(datosTarjeta));

  //Se dashabilitan los campos de edición y cambia los botones.
  document.getElementById("formaPago1").innerHTML = 
  `<button type="submit" class="btn btn-info" onclick="editarPagoTarjeta()">Tarjeta de crédito</button>`
    
    numeroTarjeta.disabled = true;
    vencimientoTarjeta.disabled = true;
    codigoCVV.disabled = true;
}

//Función que cancela la edición, cambia los botones sin guardar información nueva de la tarjeta
function cancelar(){
  document.getElementById("formaPago1").innerHTML = 
  `<button type="submit" class="btn btn-info" onclick="editarPagoTarjeta()">Tarjeta de crédito</button>`

  numeroTarjeta.disabled = true;
  vencimientoTarjeta.disabled = true;
  codigoCVV.disabled = true;
  verDatosTarjeta();
} 

//Funcion que borra los datos de la tarjeta
function borrarTarjeta(){
  localStorage.removeItem("datosTarjeta");

  document.getElementById("formaPago1").innerHTML = 
  `<button type="submit" class="btn btn-info" onclick="editarPagoTarjeta()">Tarjeta de crédito</button>`

  numeroTarjeta.disabled = true;
  vencimientoTarjeta.disabled = true;
  codigoCVV.disabled = true;
  verDatosTarjeta();
}

function verDatosTarjeta(){
  //Si existe información la muestra.
  if (localStorage.getItem('datosTarjeta')!= null){
      let dataParsed = JSON.parse(localStorage.getItem('datosTarjeta'));
      numeroTarjeta.value = dataParsed.numero;
      vencimientoTarjeta.value = dataParsed.vencimiento;
      codigoCVV.value = dataParsed.codigo;
  }    
}

//Funcion de seleccionar y editar la forma de pago "transferencia". Agrego botones
function editarPagoTransferencia(){
    document.getElementById("formaPago2").innerHTML =
    `<button type="submit" class="btn btn-info" id="formaPago2" onclick="cancelarCuenta()">Transferencia bancaria</button>
    <button type="submit" class="btn btn-success" onclick="guardarCuenta()">Guardar</button>
    <button type="submit" class="btn btn-danger" onclick="borrarCuenta()">Borrar</button>`

      cuentaBancaria.disabled = false;
      banco.disabled = false;

}

//Funcion que guarda los datos de la transferencia
function guardarCuenta(){
  //Transforma los datos en JSON y se guarda
    let datosTransferencia = { 
    'cuenta': cuentaBancaria.value,
    'banco': banco.value,
    };
       localStorage.setItem('datosTransferencia', JSON.stringify(datosTransferencia));
  
    //Se dashabilitan los campos de edición y cambia los botones.
    document.getElementById("formaPago2").innerHTML = 
    `<button type="submit" class="btn btn-info" id="formaPago2" onclick="editarPagoTransferencia()">Transferencia bancaria</button>`
      
      cuentaBancaria.disabled = true;
      banco.disabled = true;
  }

//Función que cancela la edición, cambia los botones sin guardar información nueva de la transferencia
function cancelarCuenta(){
  document.getElementById("formaPago2").innerHTML = 
  `<button type="submit" class="btn btn-info" id="formaPago2" onclick="editarPagoTransferencia()">Transferencia bancaria</button>`

    cuentaBancaria.disabled = false;
    banco.disabled = false;
    verDatosTransferencia();
} 

//Funcion que borra los datos de la transferencia
function borrarCuenta(){
  localStorage.removeItem("datosTransferencia");

  document.getElementById("formaPago2").innerHTML = 
  `<button type="submit" class="btn btn-info" onclick="editarPagoTransferencia()">Tarjeta de crédito</button>`

  cuentaBancaria.disabled = false;
  banco.disabled = false;
  verDatosTransferencia();
}

function verDatosTransferencia(){
  //Si existe información la muestra.
  if (localStorage.getItem('datosTransferencia')!= null){
      let dataParsed = JSON.parse(localStorage.getItem('datosTransferencia'));
      cuentaBancaria.value = dataParsed.cuenta;
      banco.value = dataParsed.banco;
  }    
}

function confirmarCompra(){
   var calle = document.getElementById("calle").value;
   var esquina = document.getElementById("esquina").value;
   var manzSol = document.getElementById("manzSol").value;
   var pais = document.getElementById("pais").value;
   var departamento = document.getElementById("departamento").value;
// si no hay datos salen los alertas de error
  if ((localStorage.getItem('datosTarjeta') == null) && (localStorage.getItem('datosTransferencia') == null)){
    document.getElementById("alertaErrores").innerHTML = `<div class="alert alert-warning" role="alert">
                                                            <strong>Debes completar los datos de pago.</strong>
                                                            <img src="img/error.png">
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                              <span aria-hidden="true">&times;</span>
                                                            </button>
                                                          </div>`   
  }
  if ((calle == "" || calle == null || esquina == "" || esquina == null || manzSol == "" || manzSol == null || 
      pais == "" || pais == null || departamento == "" || departamento == null)){
    document.getElementById("alertaErrores2").innerHTML = `<div class="alert alert-warning" role="alert">
                                                            <strong>Debes completar los datos de envio.</strong>
                                                            <img src="img/error.png">
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                              <span aria-hidden="true">&times;</span>
                                                            </button>
                                                          </div>`
  }
//Si esta todo bien sale alerta de finalizado
 else {
   if ((localStorage.getItem('datosTarjeta') != null) || (localStorage.getItem('datosTransferencia') != null) && 
   (calle != "" || calle != null || esquina != "" || esquina != null || manzSol != "" || manzSol != null || 
   pais != "" || pais != null || departamento != "" || departamento != null)){
    document.getElementById("alertaFinalizado").innerHTML = `<div class="alert alert-success" role="alert">
                                                            <strong>¡Felicitaciones!</strong> Compra realizada con éxito.
                                                            <img src="img/tick.png">
                                                          </div>
                                                          `
    setTimeout('window.location.href = "home.html"',3000);
   } 
 }
  
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
        verDatosTarjeta();
        verDatosTransferencia();
    });
});


