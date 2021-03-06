/***************Aplicación*********** */

//*gestión de ventas*/

//nueva venta
$(document).on('click', '#nuevaVenta', function(e){
    limpiarPagina();
    document.getElementById('productosVenta').style.display="block";
    mostrarProductosVenta();
})
//eliminar venta
$(document).on('click', '#eliminarVenta', function(e){
    limpiarPagina();
    document.getElementById('ventas').style.display="block";
    document.getElementById('ventaEstado').style.display="block";
    document.getElementById('ventaEstado').innerHTML="Listado de ventas";
    todasLasVentas();
    
})
//**fin gestión de ventas */
//**Informe de ventas */
//Última venta
$(document).on('click', '#ultimaVenta', function(e){
    limpiarPagina();
    document.getElementById('informeVentas').style.display="block";
    informeUltimaVenta();
    
})
//fin últimaventa

//Ventas del día
$(document).on('click', '#ventasDia', function(e){
    limpiarPagina();
    document.getElementById('informeVentas').style.display="block";
    informeVentasDia(fechaBusquedas());
    
})

//fin ventas del día
//Ventas del periodo
$(document).on('click', '#ventasPeriodo', function(e){
    limpiarPagina();
    document.getElementById('informeVentas').style.display="block";
    informeVentasPeriodo();
    
})

//fin ventas del periodo


/**fin informe de ventas */

/**************Acciones del Administrador************** */
/***************Gestión de Usuarios******************* */
//Alta nuevo usuario
$(document).on('click', '#altaNuevoUsuario', function(e){
    limpiarPagina();
    document.getElementById('formularioAltaNuevoUsuario').style.display="block";
    altaNuevoUsuario();
    
});

//Baja usuarios
$(document).on('click', '#bajaUsuario', function(e){
    limpiarPagina();
    document.getElementById('listaUsuarios').style.display="block";
    document.getElementById('bajaEstado').innerHTML="Lista de usuarios";
    mostrarUsuarios();
    
});
/***************Fin Gestión de Usuarios******************* */
/***************Gestión de Productos********************* */
//Alta nuevo producto
$(document).on('click', '#altaProducto', function(e){
    limpiarPagina();
    document.getElementById('formularioAltaNuevoProducto').style.display="block";
    document.getElementById('productoCrear').innerHTML='Introduzca los datos del nuevo producto';
    altaProducto();
   });
//Baja producto
$(document).on('click', '#bajaProducto', function(e){
    limpiarPagina();
    document.getElementById('bajaProductos').style.display="block";
    mostrarProductosBaja();
});
//Compra producto
$(document).on('click', '#compraProducto', function(e){
    limpiarPagina();
    document.getElementById('compraProductos').style.display="block";
    mostrarProductosCompra();
});
//Mostar compras productos
$(document).on('click', '#moastarComprasProducto', function(e){
    limpiarPagina();
    document.getElementById('tablaComprasRealizadas').style.display="block";
    mostrarComprasTodas();
});


/***************Fin Gestión de Productos********************* */
/**************Fin Acciones del Administrador************** */




/*****************Fin Aplicación********* */


/**Función limpiarPagina() */
function limpiarPagina(){
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
    document.getElementById('bajaProductos').style.display="none";
    document.getElementById('compraProductos').style.display="none";
    document.getElementById('compraProductoEstado').style.display="none";
    document.getElementById('tablaCompra').style.display="none";
    document.getElementById('tablaComprasRealizadas').style.display="none";
    document.getElementById('bajaProductoEstado').style.display="none";
    
    
}
/**Fin Función limpiarPagina() */
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
     
    /**Funciones para solicitar datos al sevidor */

/**Función cargarUsuario() */
function cargarUsuario(){
    let xhttp = new XMLHttpRequest();
    //llamada asíncrona
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
                     //los datos llegaron
            let usuario = JSON.parse(this.responseText);
            //fecha y hora del acceso
            let nombre = usuario[0]['nombre'];
            document.getElementById("fecha").innerHTML =`Usuario: ${nombre}.<br>Acceso: ${fecha()}  ${hora()}`;
            
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
    xhttp.open("GET","backend/usuario.php",true);
    xhttp.send();
    return false;
    
}

/**Función mostrarProductosVenta() */
function mostrarProductosVenta(){
    $.ajax({
        type: "GET",
        url: "backend/productos.php",
       //cuando recibe la respuesta
        success: function (response) {
            $('#formularioVenta').trigger('reset');
            let productos = JSON.parse(response);
            let fila ='';
            productos.forEach(producto => {
                let id = producto.id;
                fila += `
                    <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td><img class="img-fluid imgProducto" src="imagenes/${producto.imagen}" alt="${producto.imagen}"></td>
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
                document.getElementById('lista_productos').style.display="block";
                 $('#tablaVenta').html(fila);
               
            });
            $(document).on('click','.btn_venta', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                let id = $(this).attr('productoId');
                let cantidad = parseInt($('#cantidad'+id).val());
                let precio_venta = $('#precio_venta'+id).val();
                let stock = parseInt($('#stock'+id).val());
                if(isNaN(cantidad)){
                    alert('introducir un número de unidades válido');
                }else if(stock < cantidad){
                    alert(`Solo dispones del ${stock} unidades`);
                    
                }else if(cantidad == 0){
                    alert('Debes introducir una cantidad mayor que cero');
                }else{
                     procesarVenta(id,cantidad,precio_venta);
                    }
                
                
            })
           
        }
    });
    //cuadro de búsquedas
    $("#productoBuscar").keyup(function (e) { 
        if($('#productoBuscar').val()){
            let busqueda = $('#productoBuscar').val();
        $.ajax({
            type: "post",
            url: "backend/buscarProductos.php",
            data: { busqueda },
            success: function (response) {
                let productos = JSON.parse(response);
                let cuadro = '';
                productos.forEach(producto =>{
                    cuadro += `<li>
                    ${producto.nombre}
                    </li>`
                });
                $('.busquedas').html(cuadro);
            }
        });
    }
    });
    $(document).on('click','#btn_buscar', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        document.getElementById('lista_productos').style.display="none";
        let busqueda = $('#productoBuscar').val();
     
        $.ajax({
            type: "post",
            url: "backend/buscarProductos.php",
            data: { busqueda },
            success: function (response) {
                console.log(response);
                let productos = JSON.parse(response);
            let fila ='';
            productos.forEach(producto => {
                let id = producto.id;
                fila += `
                    <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td><img class="img-fluid imgProducto" src="imagenes/${producto.imagen}" alt="${producto.imagen}"></td>
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
                    </tr>`

                document.getElementById('lista_productos').style.display="block";
                 $('#tablaVenta').html(fila);
                 $('.busquedas').html('');
                 $('#formularioVenta').trigger('reset');
               
            });
            
                
            }
        });
    });

}
/**Fin mostrarProductosVenta() */

/**Funcion procesarVenta(producto,unidades,precio_venta) */
function procesarVenta(producto,unidades,precio_venta){
    
    $.ajax({
        type: "POST",
        url: "backend/venta.php",
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

            }else{ document.getElementById('ventaEstado').innerHTML = response ;}
           
            
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
            <td>${producto.id_vendedor}</td>
            <td>${producto.fecha}</td>
            <td>${producto.hora}</td>
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
        url: "backend/anularVenta.php",
        data: {idVenta,cantidad,producto},
        success: function (response) {

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
        type: "GET",
        url: "backend/ventas.php",
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
    let mensaje = 'Última venta';
    $.ajax({
        type: "GET",
        url: "backend/ultimaVenta.php",
       //cuando recibe la respuesta
        success: function (response) {
            if (validarJson(response)){
                let ventas = JSON.parse(response);
                informeVentas(ventas,mensaje);
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
    let mensaje = 'Ventas del día';
    $.ajax({
        type: "GET",
        url: "backend/ventasDia.php",
        data: {fecha},
       //cuando recibe la respuesta
        success: function (response) {
            if (validarJson(response)){
            let ventas = JSON.parse(response);
            informeVentas(ventas,mensaje);
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
    let mensaje = 'Ventas del periodo';
    document.getElementById('cabeceraInforme').innerHTML = mensaje;
    $('#hasta').val(fechaBusquedas());//ponemos la fecha actual por defecto
   $('#informeVentas').submit(function (e) { 
           e.preventDefault();
           let desde = $('#desde').val();
           let hasta = $('#hasta').val();
           if(desde > hasta){
               alert('La fecha de inicio debe se anterior a la fecha de fin');
           }else{
             mensaje = 'Ventas del periodo desde ' + desde + ' hasta ' + hasta;
           $.ajax({
               type: "post",
               url: "backend/ventasPeriodo.php",
               data: {desde,hasta},
               success: function (response) {

                   if (validarJson(response)){
                    let ventas = JSON.parse(response);
                    informeVentas(ventas,mensaje);
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



/*Función informeVentas(ventas)*/
function informeVentas(ventas,mensaje){
    let totalVentas = 0;
    let fila = '';
    document.getElementById('cabeceraInforme').innerHTML = mensaje;
    document.getElementById('tablaInformeVentas').style.display="block";

    ventas.forEach(producto => {
        let total =parseInt(producto.cantidad) * parseFloat(producto.precio);
        fila += `
            <tr>
            <td>${producto.idVenta}</td>
            <td>${producto.fecha}</td>
            <td>${producto.id_vendedor}</td>
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
    document.getElementById('usuarioCrear').innerHTML="Introduce los datos del nuevo usuario";
    $('#nuevoUsuario').submit(function (e){
        e.preventDefault();
        let nombre = $('#nombre').val();
        let nombreUsuario = $('#nombreUsuario').val();
        let clave = $('#claveNuevoUsuario').val();
        let rol = $('#rol').val();
        let status = $('#status').val();
        $.ajax({
            type: "post",
            url: "backend/altaNuevoUsuario.php",
            data: {nombre, nombreUsuario, clave, rol, status},
            success: function (response) {
                document.getElementById('usuarioCrear').style.display="block";
                document.getElementById('usuarioCrear').innerHTML=response;
                $('#nuevoUsuario').trigger('reset');
                            
            }
        });

    });

}
/**Fin  altaNuevoUsuario()*/
/**Función mostrarUsuarios() */
function mostrarUsuarios(){
    $.ajax({
        type: "get",
        url: "backend/mostrarUsuarios.php",
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
    document.getElementById('bajaEstado').innerHTML='';
    $.ajax({
        type: "post",
        url: "backend/bajaUsuario.php",
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
        e.preventDefault();
        let nombre = $('#nombreProducto').val();
        let stock = parseInt($('#stock').val());
        let precioCompra = $('#precioCompra').val();
        let precioVenta = $('#precioVenta').val();
        let categoria = $('#categoria').val();
        let imagen = $('#imagen')[0].files[0];
        

        $.ajax({
            type: "post",
            url: "backend/altaNuevoProducto.php",
            data: new FormData(this),
            contentType:"json",
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response);
                $("#nuevoProducto")[0].reset();
                document.getElementById('productoCrear').style.display="block";
                document.getElementById('productoCrear').innerHTML=response;
                            
            }
        });

    });

}
/**Fin Función altaProducto() */
/**Función mostrarProductosBaja() */
function mostrarProductosBaja(){
    $.ajax({
        type: "GET",
        url: "backend/productos.php",
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
                    <td><img class="img-fluid imgProducto" src="imagenes/${producto.imagen}" alt="${producto.imagen}"></td>
                    <td>${producto.stock}</td>
                    <td>${producto.precio_compra}</td>
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
                document.getElementById('listaProductosBaja').style.display="block";
                 $('#tablaBaja').html(fila);
               
            });
           
      
        }
    });
     //cuadro de búsquedas
     $("#productoBuscarBaja").keyup(function (e) { 
        if($('#productoBuscarBaja').val()){
            let busqueda = $('#productoBuscarBaja').val();
        
        $.ajax({
            type: "post",
            url: "backend/buscarProductos.php",
            data: { busqueda },
            success: function (response) {
                let productos = JSON.parse(response);
                let cuadro = '';
                productos.forEach(producto =>{
                    cuadro += `<li>
                    ${producto.nombre}
                    </li>`
                });
                $('.busquedas').html(cuadro);
            }
        });
    }
    });
    $(document).on('click','#btn_buscarBaja', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        document.getElementById('listaProductosBaja').style.display="none";
        let busqueda = $('#productoBuscarBaja').val();
       
        $.ajax({
            type: "post",
            url: "backend/buscarProductos.php",
            data: { busqueda },
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
                    <td><img class="img-fluid imgProducto" src="imagenes/${producto.imagen}" alt="${producto.imagen}"></td>
                    <td>${producto.stock}</td>
                    <td>${producto.precio_compra}</td>
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
                document.getElementById('listaProductosBaja').style.display="block";
                 $('#tablaBaja').html(fila);
                 $('.busquedas').html('');
                 $('#formularioBaja').trigger('reset');
               
               
            });
            $(document).on('click','.btn_baja', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                
                let id = $(this).attr('productoId');
                let nombre = $(this).attr('productoNombre');
                alert(`Estás apunto de borrar el producto: ${nombre}`);
               if( confirm('Comfirmación de borrado del producto: ' + nombre)){
              
                bajaProducto(id,nombre);
               }else{
                document.getElementById('bajaProductoEstado').style.display="block";
                document.getElementById('bajaProductoEstado').innerHTML = `El producto id= ${id} nombre: ${nombre} no ha sido eliminado.`
                mostrarProductosBaja();
               }
                
                                       
            });
                
            }
        });
    });
}

/**Fin función mostrarProductosBaja()  */
/**Función bajaProducto(id) */
function bajaProducto(id, nombre){
    $.ajax({
        type: "post",
        url: "backend/bajaProducto.php",
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
/**Función mostarProductosCompra() */
function mostrarProductosCompra(){
    document.getElementById('formularioCompra').style.display="block";
    $.ajax({
        type: "GET",
        url: "backend/productos.php",
       //cuando recibe la respuesta
        success: function (response) {
            document.getElementById('tablaCompra').style.display="block";
            let productos = JSON.parse(response);
            let fila ='';
            productos.forEach(producto => {
                let id = producto.id;
                fila += `
                    <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.nombre_categoria}</td>
                    <td>${producto.stock}</td>
                    <td><div class="input-group">
                    <input id="precioCompra${id}" type="number" step="0.01" value="${producto.precio_compra}" min="0.01">
                </div></td>
                    <td><div class="input-group">
                    <input id="precioVenta${id}" type="number" step="0.01" value="${producto.precio_venta}" min="0.01">
                </div></td>
                    <td>
                        <div class="input-group">
                        <label>CANTIDAD  </label>
                        <input id="cantidad${id}" type="number" name="cantidad"
                        class="form-control" min="0" value="0" step="1" required >
                        <span class="input-group-btn ">
                            <input  class="btn btn-success btn_compra" type="button " value="Comprar" productoId="${id}" stock="${producto.stock}">
                         </span>
                        </div>
                    </td>
                    </tr>
                `
                 $('#tablaCompraBody').html(fila);
                 document.getElementById('tablaCompraBody').display='block';
               
            });
            $(document).on('click','.btn_compra', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                let id = $(this).attr('productoId');
                let cantidad = parseInt($('#cantidad'+id).val());
                let precioVenta = $('#precioVenta'+id).val();
                let precioCompra = $('#precioCompra'+id).val();
                let stock = cantidad + parseInt($(this).attr('stock'));
                if(isNaN(cantidad)) {
                    alert('introducir un número de unidades válido');
                }else if(precioCompra <= 0){
                    alert('comprobar el precio de compra');
                }else if(precioVenta <= 0){
                    alert('Revisar el precio de venta');
                }else if(cantidad == 0){
                    alert('Debes introducir una cantidad mayor que cero');
                }else{
                     procesarCompra(id,cantidad,precioCompra,precioVenta,stock);
                    }
                
                
            })
           
      
        }
    });
    //cuadro de búsquedas
    $("#productoBuscarCompra").keyup(function (e) { 
        if($('#productoBuscarCompra').val()){
            let busqueda = $('#productoBuscarCompra').val();
        
        $.ajax({
            type: "post",
            url: "backend/buscarProductos.php",
            data: { busqueda },
            success: function (response) {
                let productos = JSON.parse(response);
                let cuadro = '';
                productos.forEach(producto =>{
                    cuadro += `<li>
                    ${producto.nombre}
                    </li>`
                });
                $('.busquedas').html(cuadro);
            }
        });
    }
    });
    $(document).on('click','#btn_buscarCompra', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        document.getElementById('listaProductosBaja').style.display="none";
        let busqueda = $('#productoBuscarCompra').val();
        $.ajax({
            type: "post",
            url: "backend/buscarProductos.php",
            data: { busqueda },
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
                <td>${producto.nombre_categoria}</td>
                <td>${producto.stock}</td>
                <td><div class="input-group">
                <input id="precioCompra${id}" type="number" step="0.01" value="${producto.precio_compra}" min="0.01">
            </div></td>
                <td><div class="input-group">
                <input id="precioVenta${id}" type="number" step="0.01" value="${producto.precio_venta}" min="0.01">
            </div></td>
                <td>
                    <div class="input-group">
                    <label>CANTIDAD  </label>
                    <input id="cantidad${id}" type="number" name="cantidad"
                    class="form-control" min="0" value="0" required >
                    <span class="input-group-btn ">
                        <input  class="btn btn-success btn_compra" type="button " value="Comprar" productoId="${id}" stock="${producto.stock}">
                     </span>
                    </div>
                </td>
                </tr>
            
                `
                document.getElementById('tablaCompra').style.display="block";
                 $('#tablaCompraBody').html(fila);
                 $('.busquedas').html('');
                 $('#formularioCompra').trigger('reset');
               
            });
            
                
            }
        });
    });

}
/**Fin Función mostarProductosCompra() */
/**Función   procesarCompra(id,cantidad,precioCompra,precioVenta)*/
function  procesarCompra(producto,unidades,precioCompra,precioVenta,stock){
    $.ajax({
        type: "POST",
        url: "backend/compra.php",
        data: {producto,unidades,precioCompra,precioVenta,stock},
        success: function (response) {
           console.log(response);
            document.getElementById('compraProductos').style.display="block";
            document.getElementById('compraProductoEstado').style.display="block";
            if(validarJson(response)){
                let compra = JSON.parse(response);
            mostrarCompra(compra);
            document.getElementById('tablaCompra').style.display="none";
            document.getElementById('formularioCompra').style.display="none";
            document.getElementById('tablaComprasRealizadas').style.display="block";
            document.getElementById('compraProductoEstado').innerHTML='La compra ha sido realizada correctamente';

            }else{ 
                document.getElementById('CompraProductoEstado').innerHTML=response;
            }
           
            
        }
    
    });
    
    
}
/**Fin Función procesarCompra() */
/**Función mostrarCompra(compra) */
function mostrarCompra(compra){
 
            console.log(compra);
            let fila = '';
            compra.forEach(producto => {
                fila += `
                <tr>
                    <td>${producto.idCompra}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.unidades}</td>
                    <td>${producto.precio_compra}</td>
                    <td>${producto.precio_venta}</td>
                    <td>${producto.total}</td>
                    <td>${producto.fecha}</td>
                </tr>
                `
                $('#tablaComprasRelizadasBody').html(fila);
            });
            
        }
  
   
    

/**Fin Función mostrarCompra(compra) */
/**Función mostrarComprasTodas() */
function mostrarComprasTodas(){
    $.ajax({
        type: "GET",
        url: "backend/mostrarCompras.php",
        success: function (response) {
            let compras = JSON.parse(response);
            let fila = '';
            compras.forEach(producto => {
                fila += `
                <tr>
                    <td>${producto.idCompra}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.unidades}</td>
                    <td>${producto.precio_compra}</td>
                    <td>${producto.precio_venta}</td>
                    <td>${producto.total}</td>
                    <td>${producto.fecha}</td>
                </tr>
                `
                $('#tablaComprasRelizadasBody').html(fila);
            });
            
        }
    });
   
    
}
/**Fin Función mostrarComprasTodas() */


/******************Fin Funciones del administrador*********** */


