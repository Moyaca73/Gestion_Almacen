/**Funciones para solicitar datos al sevidor */
/**Función fecha */

console.log(fecha());
document.getElementById("fecha").innerHTML = fecha() +'  '+ hora();
function fecha(){
let date = new Date();
let d  = date.getDate();
let day = (d < 10) ? '0' + d : d;
let m = date.getMonth() + 1;
let month = (m < 10) ? '0' + m : m;
let yy = date.getYear();
let year = (yy < 1000) ? yy + 1900 : yy;
let fecha = `${day}/${month}/${year}`;
return fecha;
}
function hora(){
    today=new Date();
    h=today.getHours();
    m=today.getMinutes();
    s=today.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    hora = h+":"+m+":"+s;
    //t=setTimeout('startTime()',500);
    return hora;
}
     function checkTime(i)
     {if (i<10) {i="0" + i;}return i;}
     //window.onload=function(){startTime();}
    

/**Función cargarUsuario() */
function cargarUsuario(){
    let xhttp = new XMLHttpRequest();
    //llamada asíncrona
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.response);
            //los datos llegaron
            let usuario = JSON.parse(this.responseText);
            
            if(usuario[0]['rol'] == 3){
                //mostrar nav usuario
                document.getElementById("navegacion").style.display="inline";

            }else if(usuario[0]['rol']==1){
                //mostrar nav admin
                document.getElementById("navegacion").style.display="inline";
                document.getElementById("admin").style.display="block";
            }
        }
    }
    //petición al servidor
    xhttp.open("GET","usuario.php",true);
    xhttp.send();
    return false;
    
}

//*gestión de ventas*/
//nueva venta
$(document).on('click', '#nuevaVenta', function(e){
    document.getElementById('formularioVenta').style.display="block";
})

//buscar productos 
   


