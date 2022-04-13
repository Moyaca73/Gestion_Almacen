/***************Aplicación*********** */
//*gestión de ventas*/
//nueva venta
$(document).on('click', '#nuevaVenta', function(e){
    document.getElementById('ultimaVenta').style.display="none";
    document.getElementById('venta').style.display="block";
    mostarProductos();
})

//buscar productos 
/*****************Fin Aplicación********* */

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
    xhttp.open("GET","../backend/usuario.php",true);
    xhttp.send();
    return false;
    
}

/**Función mostarProductos() */
function mostarProductos(){
    $.ajax({
        type: "Get",
        url: "../backend/productos.php",
        data: "data",
       //cuando recibe la respuesta
        success: function (response) {
            
            let productos = JSON.parse(response);
            console.log(productos);
            let tabla ='';
            productos.forEach(producto => {
                let id = producto.id;
                tabla += `
                    <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.precio_venta}</td>
                    <td>${producto.nombre_categoria}</td>
                    <td>
                        <div class="input-group">
                        <input type="hidden" id="precio_venta${id}" value="${producto.precio_venta}">
                        <input type="hidden" id="stock${id}" value="${producto.stock}">
                        <label>CANTIDAD  </label>
                        <input id="cantidad${id}" type="number" name="cantidad"
                        class="form-control" min="0" placeholder="cantidad" >
                        <span class="input-group-btn">
                            <input  class="btn btn-success btn_venta" type="button " value="Venta" productoId="${id}">
                         </span>
                        </div>
                    </td>
                `
                 $('#tablaVenta').html(tabla);
               
            });
            $(document).on('click','.btn_venta', function(){
                let id = $(this).attr('productoId');
                let cantidad = parseInt($('#cantidad'+id).val());
                let precio_venta = $('#precio_venta'+id).val();
                let stock = parseInt($('#stock'+id).val());
                console.log(`cantidad:${cantidad}`);
                console.log(precio_venta);
                console.log(stock);
                if(stock < cantidad){
                    alert(`Solo dispones del ${stock} unidades`);
                    
                }else if(cantidad == 0){
                    alert('Debes introducir una cantidad mayor que cero');
                }else{
                     procesarVenta(id,cantidad,precio_venta);
                    }
                
                
            })
           
      
        }
    });
}
/**Funcion procesarVenta(producto,unidades,precio_venta) */
function procesarVenta(producto,unidades,precio_venta){
    
    $.ajax({
        type: "POST",
        url: "../backend/venta.php",
        data: {producto,unidades,precio_venta},
        success: function (response) {
            console.log(unidades);
            console.log(response);

            document.getElementById('venta').style.display="none";
            document.getElementById('ultimaVenta').style.display="block";
            document.getElementById('ventaCorrecta').style.display="block";

            
           
        }
    });
    

    
    
    

}

   


