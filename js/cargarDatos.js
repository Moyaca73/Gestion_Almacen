/***************Aplicación*********** */
//fecha y hora del acceso
console.log(fecha());
document.getElementById("fecha").innerHTML = fecha() +'  '+ hora();
//*gestión de ventas*/

//nueva venta
$(document).on('click', '#nuevaVenta', function(e){
    document.getElementById('ventas').style.display="none";
    document.getElementById('ventaEliminada').style.display="none";
    document.getElementById('informeVentas').style.display="none";
    document.getElementById('formularioAltaNuevoUsuario').style.display="none";
    document.getElementById('listaUsuarios').style.display="none";
    document.getElementById('formularioAltaNuevoProducto').style.display="none";
    document.getElementById('productosVenta').style.display="block";
    mostrarProductosVenta();
})
//eliminar venta
$(document).on('click', '#eliminarVenta', function(e){
    document.getElementById('productosVenta').style.display="none";
    document.getElementById('ventaEstado').style.display="none";
    document.getElementById('formularioAltaNuevoUsuario').style.display="none";
    document.getElementById('listaUsuarios').style.display="none";
    document.getElementById('ventas').style.display="block";
    document.getElementById('ventaEliminada').style.display="none";
    document.getElementById('informeVentas').style.display="none";
    document.getElementById('formularioAltaNuevoProducto').style.display="none";
    todasLasVentas();
    
})
//**fin gestión de ventas */
//**Informe de ventas */
//Última venta
$(document).on('click', '#ultimaVenta', function(e){
    document.getElementById('productosVenta').style.display="none";
    document.getElementById('ventaEstado').style.display="none";
    document.getElementById('ventas').style.display="none";
    document.getElementById('ventaEliminada').style.display="none";
    document.getElementById('formularioAltaNuevoUsuario').style.display="none";
    document.getElementById('listaUsuarios').style.display="none";
    document.getElementById('formularioAltaNuevoProducto').style.display="none";
    document.getElementById('informeVentas').style.display="block";
    informeUltimaVenta();
    
})
//fin últimaventa

//Ventas del día
$(document).on('click', '#ventasDia', function(e){
    document.getElementById('productosVenta').style.display="none";
    document.getElementById('ventaEstado').style.display="none";
    document.getElementById('ventas').style.display="none";
    document.getElementById('ventaEliminada').style.display="none";
    document.getElementById('formularioAltaNuevoUsuario').style.display="none";
    document.getElementById('listaUsuarios').style.display="none";
    document.getElementById('formularioAltaNuevoProducto').style.display="none";
    document.getElementById('informeVentas').style.display="block";
    informeVentasDia(fechaBusquedas());
    
})

//fin ventas del día
//Ventas del periodo
$(document).on('click', '#ventasPeriodo', function(e){
    document.getElementById('productosVenta').style.display="none";
    document.getElementById('ventaEstado').style.display="none";
    document.getElementById('ventas').style.display="none";
    document.getElementById('ventaEliminada').style.display="none";
    document.getElementById('tablaInformeVentas').style.display="none";
    document.getElementById('cabeceraInforme').style.display="none";
    document.getElementById('formularioAltaNuevoUsuario').style.display="none";
    document.getElementById('listaUsuarios').style.display="none";
    document.getElementById('formularioAltaNuevoProducto').style.display="none";
    document.getElementById('informeVentas').style.display="block";
    informeVentasPeriodo();
    
})

//fin ventas del periodo


/**fin informe de ventas */

/**************Acciones del Administrador************** */
/***************Gestión de Usuarios******************* */
//Alta nuevo usuario
$(document).on('click', '#altaNuevoUsuario', function(e){
    document.getElementById('productosVenta').style.display="none";
    document.getElementById('ventaEstado').style.display="none";
    document.getElementById('ventas').style.display="none";
    document.getElementById('ventaEliminada').style.display="none";
    document.getElementById('tablaInformeVentas').style.display="none";
    document.getElementById('cabeceraInforme').style.display="none";
    document.getElementById('informeVentas').style.display="none";
    document.getElementById('listaUsuarios').style.display="none";
    document.getElementById('formularioAltaNuevoProducto').style.display="none";
    document.getElementById('formularioAltaNuevoUsuario').style.display="block";
    altaNuevoUsuario();
    
});

//Baja usuarios
$(document).on('click', '#bajaUsuario', function(e){
    document.getElementById('productosVenta').style.display="none";
    document.getElementById('ventaEstado').style.display="none";
    document.getElementById('ventas').style.display="none";
    document.getElementById('ventaEliminada').style.display="none";
    document.getElementById('tablaInformeVentas').style.display="none";
    document.getElementById('cabeceraInforme').style.display="none";
    document.getElementById('informeVentas').style.display="none";
    document.getElementById('formularioAltaNuevoUsuario').style.display="none";
    document.getElementById('formularioAltaNuevoProducto').style.display="none";
    document.getElementById('listaUsuarios').style.display="block";
    mostrarUsuarios();
    
})
/***************Fin Gestión de Usuarios******************* */
/***************Gestión de Productos********************* */
//Alta nuevo producto
$(document).on('click', '#altaProducto', function(e){
    document.getElementById('productosVenta').style.display="none";
    document.getElementById('ventaEstado').style.display="none";
    document.getElementById('ventas').style.display="none";
    document.getElementById('ventaEliminada').style.display="none";
    document.getElementById('tablaInformeVentas').style.display="none";
    document.getElementById('cabeceraInforme').style.display="none";
    document.getElementById('informeVentas').style.display="none";
    document.getElementById('formularioAltaNuevoUsuario').style.display="none";
    document.getElementById('listaUsuarios').style.display="none";
    document.getElementById('formularioAltaNuevoProducto').style.display="block";
    altaProducto();
    
})
//Baja producto
$(document).on('click', '#bajaProducto', function(e){
    document.getElementById('productosVenta').style.display="none";
    document.getElementById('ventaEstado').style.display="none";
    document.getElementById('ventas').style.display="none";
    document.getElementById('ventaEliminada').style.display="none";
    document.getElementById('tablaInformeVentas').style.display="none";
    document.getElementById('cabeceraInforme').style.display="none";
    document.getElementById('informeVentas').style.display="none";
    document.getElementById('formularioAltaNuevoUsuario').style.display="none";
    document.getElementById('listaUsuarios').style.display="none";
    document.getElementById('formularioAltaNuevoProducto').style.display="none";
    document.getElementById('bajaProductos').style.display="block";
    mostrarProductosBaja();
    
})

/***************Fin Gestión de Productos********************* */
/**************Fin Acciones del Administrador************** */




/*****************Fin Aplicación********* */

/**Funciones para solicitar datos al sevidor */
/**Función fechaBusquedas() 
 * Esta función es para obtener la fecha en el formato 
 * requerido para las búsquedas en la base de datos
*/
function fechaBusquedas(){
    let date = new Date();
    let d  = date.getDate();
    let day = (d < 10) ? '0' + d : d;
    let m = date.getMonth() + 1;
    let month = (m < 10) ? '0' + m : m;
    let yy = date.getYear();
    let year = (yy < 1000) ? yy + 1900 : yy;
    let fecha = `${year}-${month}-${day}`;
    return fecha;
    }
/**Fin fechaBusquedas */

/**Función fecha */
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
    return hora;
}
     function checkTime(i)
     {if (i<10) {i="0" + i;}return i;}
     
    

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

/**Función mostrarProductosVenta() */
function mostrarProductosVenta(){
    $.ajax({
        type: "Get",
        url: "../backend/productos.php",
       //cuando recibe la respuesta
        success: function (response) {
            
            let productos = JSON.parse(response);
            let fila ='';
            productos.forEach(producto => {
                let id = producto.id;
                fila += `
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
                        class="form-control" min="0" value="0" required >
                        <span class="input-group-btn ">
                            <input  class="btn btn-success btn_venta" type="button " value="Venta" productoId="${id}">
                         </span>
                        </div>
                    </td>
                    </tr>
                `
                 $('#tablaVenta').html(fila);
               
            });
            $(document).on('click','.btn_venta', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                let id = $(this).attr('productoId');
                let cantidad = parseInt($('#cantidad'+id).val());
                let precio_venta = $('#precio_venta'+id).val();
                let stock = parseInt($('#stock'+id).val());
                // console.log(`cantidad:${cantidad}`);
                // console.log(precio_venta);
                // console.log(stock);
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
/**Fin mostrarProductosVenta() */

/**Funcion procesarVenta(producto,unidades,precio_venta) */
function procesarVenta(producto,unidades,precio_venta){
    
    $.ajax({
        type: "POST",
        url: "../backend/venta.php",
        data: {producto,unidades,precio_venta},
        success: function (response) {
            console.log(response);
            document.getElementById('productosVenta').style.display="none";
            document.getElementById('ventas').style.display="block";
            document.getElementById('ventaEstado').style.display="block";
            if(validarJson(response)){
                let venta = JSON.parse(response);
            mostarVentas(venta);
            document.getElementById('ventaEstado').innerHTML='La venta ha sido realizada correctamente';

            }else{ document.getElementById('ventaEstado').innerHTML='Error en la venta';}
           
            
        }
    
    });
    
}
/**Fin procesarVenta() */


/**Función mostrarVentas(ventas)*/
function mostarVentas(ventas){
    let fila = '';
    ventas.forEach(producto => {
        let idVenta = producto.idVenta;
        let total =parseInt(producto.cantidad) * parseFloat(producto.precio);
       
        fila += `
            <tr>
            <td>${producto.idVenta}</td>
            <td>${producto.fecha}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>${total}</td>
            <td>
                <div class="input-group ">
                <input type="hidden" id="cantidad${idVenta}" value="${producto.cantidad}">
                <input type="hidden" id="nombreProducto${idVenta}" value="${producto.id}">
                <span class="input-group-btn">
                    <input  class="btn btn-success btn_anular" type="button " value=" Anular venta" ventaId="${idVenta}">
                 </span>
                </div>
            </td>
            </tr>
        `
         $('#tablaVentas').html(fila);

    });  
    $(document).on('click','.btn_anular',function(e){
        e.preventDefault();//https://es.stackoverflow.com/questions/121205/evitar-que-el-evento-click-se-ejecute-dos-veces
        e.stopImmediatePropagation();
        let idVenta = $(this).attr('ventaId');
        let cantidad = parseInt($('#cantidad'+idVenta).val());
        let producto = $('#nombreProducto'+idVenta).val();
        console.log(idVenta);
        console.log(cantidad);
        console.log(producto);
        alert("Está a punto de eliminar la venta: " + idVenta);
        if(confirm("Eliminar la venta "+ idVenta)){
        anularVenta(idVenta,cantidad,producto);
        }else{
            document.getElementById('ventaEliminada').style.display="block"; 
            document.getElementById('ventaEliminada').innerHTML='Anulación anulada';
        }
        idVenta = 0;
        cantidad = 0;
        producto = 0;

    });
}

/**Fin mostarVentas */
/**Función anularVenta(id,cantidad)*/
function anularVenta(idVenta,cantidad,producto){
    $.ajax({
        type: "POST",
        url: "../backend/anularVenta.php",
        data: {idVenta,cantidad,producto},
        success: function (response) {
            console.log(response);
            document.getElementById('ventas').style.display="none";
            document.getElementById('eliminarVenta').style.display="block";
            document.getElementById('ventaEliminada').innerHTML=response;
            document.getElementById('ventaEliminada').style.display="block";

        }
    });

}
/**Fin anularVenta */
/**Función todasLasVentas() */
function todasLasVentas(){
    $.ajax({
        type: "Get",
        url: "../backend/ventas.php",
       //cuando recibe la respuesta
        success: function (response) {
            let ventas = JSON.parse(response);
            mostarVentas(ventas);
        }
        })

}
/**Fin todasLasVentas() */
/**Función informeUltimaVenta() */
function informeUltimaVenta(){
    document.getElementById('formularioPeriodo').style.display="none";
    document.getElementById('cabeceraInforme').style.display="block";
    let mensage = 'Última venta';
    $.ajax({
        type: "Get",
        url: "../backend/ultimaVenta.php",
       //cuando recibe la respuesta
        success: function (response) {
            if (validarJson(response)){
                let ventas = JSON.parse(response);
                informeVentas(ventas,mensage);
                }else{
                    document.getElementById('cabeceraInforme').innerHTML = response;
                    document.getElementById('informeVentas').style.display="none";
                }
        }
        })

}
/**Fin informeUltimaVenta() */
/**Función informeVentasDia(fecha) */
function informeVentasDia(fecha){
    document.getElementById('formularioPeriodo').style.display="none";
    document.getElementById('cabeceraInforme').style.display="block";
    let mensage = 'Ventas del día';
    $.ajax({
        type: "Get",
        url: "../backend/ventasDia.php",
        data: {fecha},
       //cuando recibe la respuesta
        success: function (response) {
            if (validarJson(response)){
            let ventas = JSON.parse(response);
            informeVentas(ventas,mensage);
            }else{
                document.getElementById('cabeceraInforme').innerHTML = response;
                document.getElementById('tablaInformeVentas').style.display="none";
            }
        }
        })

}
 
/**Fin informeVentasDia() */


/**Función informeVentasPeriodo() */
function informeVentasPeriodo(){
    document.getElementById('formularioPeriodo').style.display="block";
    document.getElementById('cabeceraInforme').style.display="block";
    let mensage = 'Ventas del periodo';
    document.getElementById('cabeceraInforme').innerHTML = mensage;
    $('#hasta').val(fechaBusquedas());//ponemos la fecha actual por defecto
   $('#informeVentas').submit(function (e) { 
           let desde = $('#desde').val();
           let hasta = $('#hasta').val();
           if(desde > hasta){
               alert('La fecha de inicio debe se anterior a la fecha de fin');
           }else{
             mensage = 'Ventas del periodo desde ' + desde + ' hasta ' + hasta;
           console.log(desde);
           console.log(hasta);
           $.ajax({
               type: "post",
               url: "../backend/ventasPeriodo.php",
               data: {desde,hasta},
               success: function (response) {
                   console.log(response);
                   if (validarJson(response)){
                    let ventas = JSON.parse(response);
                    informeVentas(ventas,mensage);
                    }else{
                        document.getElementById('cabeceraInforme').innerHTML = response;
                        document.getElementById('tablaInformeVentas').style.display="none";
                    }
                   
                   
               }
            
           });
        }

       
       
   });

}

/**Fin informeVentasPeriodo() */

/**Fúnción validarJson(json) 
 * esta función comprueba si el parámetro que se le pasa es un Json (true) o no (false)
 * https://stackoverflow.com/questions/8431415/json-object-validation-in-javascript
*/
function validarJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}
/**FIN Fúnción validarJson()**/

/*Función informeVentas(ventas)*/
function informeVentas(ventas,mensage){
    let totalVentas = 0;
    let fila = '';
    document.getElementById('cabeceraInforme').innerHTML = mensage;
    document.getElementById('tablaInformeVentas').style.display="block";

    ventas.forEach(producto => {
        let total =parseInt(producto.cantidad) * parseFloat(producto.precio);
        fila += `
            <tr>
            <td>${producto.idVenta}</td>
            <td>${producto.fecha}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>${total}</td>
            </tr>
        `
         $('#informeVentasBody').html(fila);
         totalVentas += total;

    });  
    
    document.getElementById('totalVentas').innerHTML = totalVentas;
}

/*fin informeVentas()*/

/******************Funciones del administrador*********** */
/**Función  altaNuevoUsuario()*/
function altaNuevoUsuario(){
    $('#nuevoUsuario').submit(function (e){
        let nombre = $('#nombre').val();
        let nombreUsuario = $('#nombreUsuario').val();
        let clave = $('#claveNuevoUsuario').val();
        let rol = $('#rol').val();
        let status = $('#status').val();
        $.ajax({
            type: "post",
            url: "../backend/altaNuevoUsuario.php",
            data: {nombre, nombreUsuario, clave, rol, status},
            success: function (response) {
                document.getElementById('usuarioCrear').innerHTML=response;
                            
            }
        });

    });

}
/**Fin  altaNuevoUsuario()*/
/**Función mostrarUsuarios() */
function mostrarUsuarios(){
    $.ajax({
        type: "get",
        url: "../backend/mostrarUsuarios.php",
        success: function (response) {
            let usuarios = JSON.parse(response);
            let fila = '';
            usuarios.forEach(usuario =>{
                let id = usuario.id;
                let nombre_usuario = usuario.nombre_usuario;
                fila +=`
                <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.nombre_usuario}</td>
                <td>${usuario.clave}</td>
                <td>${usuario.nombre_grupo}</td>
                <td>${usuario.status}</td>
                <td>${usuario.ultimo_acceso}</td>
                <td>
                        <div class="input-group">
                            <input  class="btn btn-danger btn_baja" type="button " value="Baja usuario" usuarioId="${id}" nombreUsuario="${nombre_usuario}">
                        </div>
                    </td>
                </tr>
                `
                $('#tablaUsuarios').html(fila);
            });
            $(document).on('click', '.btn_baja', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                let id = $(this).attr('usuarioId');
                let nombreUsuario  = $(this).attr('nombreUsuario');
                alert (`¿Seguro que quieres borrar el usuario ${nombreUsuario}?` );
                if(confirm (`¿Pero te lo has pensado bien?`)){
                    bajaUsuario(id,nombreUsuario);
                }else{
                    document.getElementById('bajaEstado').innerHTML = `El usuario ${nombreUsuario} no ha sido eliminado.`;
                mostrarUsuarios();
                }
                
            });
            
        }
    });
}
/**Fin mostrarUsuarios() */
/**Función bajaUsuario(id,nombreUsuario) */
function bajaUsuario(id,nombreUsuario){
    $.ajax({
        type: "post",
        url: "../backend/bajaUsuario.php",
        data: {id,nombreUsuario},
        success: function (response) {
            if(response == 1){
                document.getElementById('bajaEstado').innerHTML = `El usuario ${nombreUsuario} ha sido eliminado.`
                mostrarUsuarios();
            }else{
                document.getElementById('bajaEstado').innerHTML = `El usuario ${nombreUsuario} no ha sido eliminado.`
                mostrarUsuarios();
            }
            
        }
    });
}
/**Fin bajaUsuario() */

/**Función altaProducto() */
function altaProducto(){
    $('#nuevoProducto').submit(function (e){
        let nombre = $('#nombreProducto').val();
        let stock = $('#stock').val();
        let precioCompra = $('#precioCompra').val();
        let precioVenta = $('#precioVenta').val();
        let categoria = $('#categoria').val();

        $.ajax({
            type: "post",
            url: "../backend/altaNuevoProducto.php",
            data: {nombre, stock,precioCompra, precioVenta, categoria },
            success: function (response) {
                $("#nuevoProducto")[0].reset();
                document.getElementById('productoCrear').innerHTML=response;
                            
            }
        });

    });

}
/**Fin Función altaProducto() */
/**Función mostrarProductosBaja() */
function mostrarProductosBaja(){
    $.ajax({
        type: "Get",
        url: "../backend/productos.php",
       //cuando recibe la respuesta
        success: function (response) {
            
            let productos = JSON.parse(response);
            let fila ='';
            productos.forEach(producto => {
                let id = producto.id;
                let nombre = producto.nombre;
                fila += `
                    <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.precio_venta}</td>
                    <td>${producto.nombre_categoria}</td>
                    <td>
                        <div class="input-group">
                        <span class="input-group-btn ">
                            <input  class="btn btn-danger btn_baja" type="button " value="Baja" productoId="${id}" productoNombre="${nombre}">
                         </span>
                        </div>
                    </td>
                    </tr>
                `
                 $('#tablaBaja').html(fila);
               
            });
            $(document).on('click','.btn_baja', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                let id = $(this).attr('productoId');
                let nombre = $(this).attr('productoNombre');
                alert(`Estás apunto de borrar el producto: ${nombre}`);
               if( confirm('Comfirmación de borrado del producto: ' + nombre)){
                bajaProducto(id, nombre);
               }else{
                document.getElementById('bajaProductoEstado').style.display="block";
                document.getElementById('bajaProductoEstado').innerHTML = `El producto id= ${id} nombre: ${nombre} no ha sido eliminado.`
                mostrarProductosBaja();
               }
                
                                       
            });
           
      
        }
    });
}

/**Fin función mostrarProductosBaja()  */
/**Función bajaProducto(id) */
function bajaProducto(id, nombre){
    $.ajax({
        type: "post",
        url: "../backend/bajaProducto.php",
        data: {id, nombre},
        success: function (response) {
            if(response == true){
                document.getElementById('bajaProductoEstado').style.display="block";
                document.getElementById('bajaProductoEstado').innerHTML = `El producto id= ${id} nombre: ${nombre} ha sido eliminado.`
                mostrarProductosBaja();
            }else{
                document.getElementById('bajaProductoEstado').style.display="block";
                document.getElementById('bajaProductoEstado').innerHTML = `El producto id= ${id} nombre: ${nombre} no ha sido eliminado.`
                mostrarProductosBaja();
            }
            
        }
    });
}
/**Fin Función bajaProducto(id) */
/******************Fin Funciones del administrador*********** */


