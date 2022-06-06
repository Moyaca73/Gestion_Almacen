/*funciones para abrir y cerrar las sesiones*/
/**Funcion loguin(formu) para logear al usuario  */ 

function login(formu){
    let xhttp= new XMLHttpRequest();

    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            if(this.responseText === "FALSE"){
                //no existe el usuario
                alert("Resvisar usuario y contraseña");
            }else{
                //el usuario existe
                //borramos el formulario
                $('#loguin').trigger('reset');
                document.getElementById("login").style.display="none";
                //mostramos la sección del usuario que corresponda
               cargarUsuario();
            }
        }
    }
    let usuario = document.getElementById("usuario").value;
    let clave = document.getElementById("clave").value;
    let params = "usuario=" + usuario + "&clave=" +clave;
    
    xhttp.open("POST","backend/login.php",true);
    //cabecera y cadena de parámetros
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send(params);
    return false;

}

