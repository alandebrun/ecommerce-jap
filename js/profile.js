var nombrePerfil = document.getElementById("nombrePerfil");
var apellPerfil = document.getElementById("apellPerfil");
var edadPerfil = document.getElementById("edadPerfil");
var telefonoPerfil = document.getElementById("telefonoPerfil");
var emailPerfil = document.getElementById("emailPerfil");
var fotoPrincipal = document.getElementById("fotoPrincipal");


//Función que cuando apreto "editar", se habilita para modificar y agrega botones de "guardar" y "cancelar".
function editarInfo(){
    document.getElementById("btnOpcionesPerfil").innerHTML =    
    `<button type="submit" class="btn btn-success" onclick="guardarDatos()">Guardar Cambios</button>
    <button type="submit" class="btn btn-warning" onclick="cancelar()">Cancelar</button>`

    nombrePerfil.disabled= false;
    apellPerfil.disabled = false;
    edadPerfil.disabled = false;
    telefonoPerfil.disabled = false;
    emailPerfil.disabled = false;
}

// Funcion que guarda los datos que pongo.
function guardarDatos(){

    //Transforma los datos en JSON y se guarda
    let datosPerfil = { 
     'nombre': nombrePerfil.value,
     'apellido': apellPerfil.value,
     'edad': edadPerfil.value,
     'telefono': telefonoPerfil.value,
     'email': emailPerfil.value,
    };
     localStorage.setItem('datosPerfil', JSON.stringify(datosPerfil));

    //Se dashabilitan los campos de edición y cambia los botones.
    document.getElementById("btnOpcionesPerfil").innerHTML = 
    `<button type="submit" class="btn btn-info" onclick="editarInfo()">Editar</button>`

    nombrePerfil.disabled = true;
    apellPerfil.disabled = true;
    edadPerfil.disabled = true;
    telefonoPerfil.disabled = true;
    emailPerfil.disabled = true;
}

//Función que cancela la edición, cambia los botones sin guardar información nueva
function cancelar(){
    document.getElementById("btnOpcionesPerfil").innerHTML = 
    `<button type="submit" class="btn btn-info" onclick="editarInfo()">Editar</button>`

    nombrePerfil.disabled = true;
    apellPerfil.disabled = true;
    edadPerfil.disabled = true;
    telefonoPerfil.disabled = true;
    emailPerfil.disabled = true;
    verDatosPerfil();
}


function verDatosPerfil(){
    //Si existe información la muestra.
    if (localStorage.getItem('datosPerfil')!= null){
        let dataParsed = JSON.parse(localStorage.getItem('datosPerfil'));
        nombrePerfil.value = dataParsed.nombre;
        apellPerfil.value = dataParsed.apellido;
        edadPerfil.value = dataParsed.edad
        telefonoPerfil.value = dataParsed.telefono;
        emailPerfil.value = dataParsed.email;
    }    
}

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("fotoPrincipal").setAttribute("src", localStorage.getItem("imagen"));
    let imagenes = document.getElementsByClassName("imgCambio");

    for(let unaImagen of imagenes) {
        unaImagen.addEventListener("click", function(img){
            let url = unaImagen.getAttribute("src");
            
            document.getElementById("fotoPrincipal").setAttribute("src", url);
            localStorage.setItem("imagen", url);        
        });
    }

    verDatosPerfil();
});