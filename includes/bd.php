<?php
/**Bloque de funciones para la base de datos  */
/**Funcion Leer_config*/ 
function leer_config($ficheroXML,$eschema){

    $config=new DOMDocument();
    $config->load($ficheroXML);
    $res=$config->schemaValidate($eschema);
    if($res=FALSE){
        throw new InvalidArgumentException("Revise ficheros de configuración.");
    }
    
    $datos=simplexml_load_file($ficheroXML);
    $ip=$datos->xpath("//ip");
    $nombre=$datos->xpath("//nombre");
    $usuario=$datos->xpath("//usuario");
    $clave=$datos->xpath("//clave");
    $cad=sprintf("mysql:dbname=%s;host=%s",$nombre[0],$ip[0]);
    $result=[];
    $result[]=$cad;
    $result[]=$usuario[0];
    $result[]=$clave[0];
    return $result;
    
    }
/**Función conexion() */
function conexion(){
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);
    //$host = 'localhost';
    //$dbname = 'id18991333_almacen';
    //$username = 'id18991333_antonio';
    //$password = 'v&-Ws5GNgkKKpTiP';
    //$db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    return $db;
}

/**Función comprobar usuario */
function comprobar_usuario($nombre_usuario,$clave){

$db=conexion();
$select = "SELECT * FROM usuarios WHERE nombre_usuario ='".$nombre_usuario."' and clave = '".$clave."'";

$result= $db->query($select);
if($result->rowCount()===1){
return $result->fetch();

}else{
    
    return FALSE;
}

}
/**función cargar_usuario(nombre_usuario,clave) */
function cargar_usuario($nombre_usuario,$clave){
    $db = conexion();
    $select = "SELECT * FROM usuarios WHERE nombre_usuario ='".$nombre_usuario."' and clave = '".$clave."'";

    $result= $db->query($select);
    if($result->rowCount()===1){
    nuevoAcceso($nombre_usuario);//anotamos el último acceso al sistema
    return $result;

    }else{
        
        return FALSE;
    }

}
/*Función nuevoAcceso(id)*/
function nuevoAcceso($nombre_usuario){
   $db=conexion();
    $query = "UPDATE usuarios SET ultimo_acceso = now() Where nombre_usuario = '$nombre_usuario'";

    $result= $db->query($query);
    if(!$result){
        die ("fallo en la entrada");
    
    }


}

/**Función cargarProductos() */
function cargarProductos(){
   $db = conexion();
    $select = "SELECT p.id, p.estado, p.nombre, p.precio_compra, p.precio_venta, p.stock, p.imagen, c.nombre_categoria FROM productos AS p join categorias AS c WHERE p.categoria_id = c.id and p.estado = 1";

    $result= $db->query($select);
    if($result->rowCount()>=1){
        return $result;

    }else{
        
        return FALSE;
    }
}
/*función venta($producto,$unidades)*/
function venta($producto, $unidades, $usuario){
   
    //conexión
   $db=conexion();
    //comienzo de la transacción
    $db->beginTransaction();
    //comprobar el stock: extraemos los datos de la base de datos
    $select = "SELECT stock, precio_venta, id  FROM productos WHERE id = '$producto'";

    $result = $db->query($select);
    if($result->rowCount()==1){
        foreach ($result as $venta){
            $stock = intval($venta['stock']);
            $idProducto = $venta['id'];
            $precio_venta = $venta['precio_venta'];

        }
        if($stock >= $unidades){
            $nuevoStock  = $stock - $unidades;
            //Si hay suficiente stock, modificamos el stock
            $query = "UPDATE productos SET stock = $nuevoStock Where id = '$producto'";

            $result= $db->query($query);
            if(!$result){
                //si no funciona, anulamos la transacción 
                $db->rollBack();
                return false;
            }

        }
    }
    //generar el registro de la nueva venta
    $insert = "INSERT INTO ventas (`id_vendedor`,`producto_id`, `cantidad`, `precio`, `fecha`) VALUES ($usuario,'$idProducto',$unidades,'$precio_venta',now())";

    $result = $db->query($insert);

    if(!$result){
        //si no funciona, anulamos la transacción 
        $db->rollBack();
        return false;
    
    }
    //cerrar la transacción
    $db->commit();

    $venta = mostrarUltimaVenta();
    return $venta;

}

/**Función mostrarUltimaVenta() */
function mostrarUltimaVenta(){
    $db=conexion();
    $select = "SELECT p.nombre,p.id,p.stock, v.idVenta,v.id_vendedor, v.cantidad, v.precio, DATE_FORMAT(v.fecha, '%d-%m-%Y') as fecha,DATE_FORMAT(v.fecha, '%H:%I:%S') as hora FROM ventas AS v join productos AS p WHERE v.idVenta = (SELECT MAX(idVenta) FROM ventas) AND p.id = v.producto_id";

    $result = $db->query($select);

    if($result->rowCount() == 1){
        return $result;

    }else {
        return FALSE;
    }

    
}

/**Función anularVenta($id,$cantidad) */
function anularVenta($idVenta,$cantidad,$producto){
    //conexión
    $db=conexion();
    //inicio de la transacción
    $db->beginTransaction();
    //borrar la venta de la base de datos
    $delete = "DELETE FROM ventas WHERE idVenta = $idVenta and cantidad = $cantidad";
    $result = $db->query($delete);
    
    if(!$result){
        //si no se ha borrado, anular la transacción
        $db->rollBack();
        $error = "No se ha borrado la venta";
        return $error;
    }
    //Averiguar el stock existente
    $select = "SELECT stock FROM productos WHERE id = '$producto' ";
    $result = $db->query($select);
    if($result->rowCount()==1){
        foreach ($result as $produ){
            $stock = intval($produ['stock']);
        }
    }else{
        $db->rollBack();
        $error =  "No se pudo anular la venta (error al comprobar el stock)";
        return $error;
    }
    $nuevoStock = $cantidad + $stock;

    //Aumentar las unidades al stock
    $update =  "UPDATE productos SET stock = $nuevoStock Where id = '$producto'";    
    
    $result = $db->query($update);

    if(!$result){
        $db->rollBack();
        $error = "No se pudo anular la venta (error al aumentar las unidades)";
        return $error;
    }
     //cerrar la transacción
     $db->commit();
     $ventaAnulada = "Venta $idVenta anulada";
     return $ventaAnulada;

}
/**Fin anularVenta() */

/**Función ventasTodas() */
function ventasTodas(){
    //conexión
$db=conexion();
//consulta
$select = "SELECT p.nombre, p.id, p.stock, v.idVenta,v.id_vendedor, v.cantidad, v.precio, DATE_FORMAT(v.fecha, '%d-%m-%Y') as fecha,DATE_FORMAT(v.fecha, '%H:%I:%S') as hora  FROM ventas AS v join productos AS p WHERE  p.id = v.producto_id ORDER BY v.fecha DESC";

$result = $db->query($select);

if($result->rowCount() > 0){
    return $result;

}else {
    return FALSE;
}


}
/**Fin ventasTodas() */
/**Función  mostrarVentasDia(fecha) */
function  mostrarVentasDia($fecha){
    //conexión
$db=conexion();
//consulta
$select = "SELECT p.nombre, p.id, p.stock, v.idVenta, v.id_vendedor, v.cantidad, v.precio, v.fecha FROM ventas AS v join productos AS p WHERE DATE(v.fecha) = '$fecha' AND  p.id = v.producto_id ";

//para separar la fecha en la consulta
//https://bahiaxip.com/entrada/fechas-en-mysql
$result = $db->query($select);

if($result->rowCount() > 0){
    return $result;

}else {
    return FALSE;
}


}
/**fin  mostrarVentasDia() */
/**Función  mostrarVentasPeriodo(fecha) */
function  mostrarVentasPeriodo($desde,$hasta){
    //conexión
$db=conexion();
//consulta
$select = "SELECT p.nombre, p.id, p.stock, v.idVenta,v.id_vendedor, v.cantidad, v.precio, v.fecha FROM ventas AS v join productos AS p WHERE DATE(v.fecha) >= '$desde' AND DATE(v.fecha) <= '$hasta' AND  p.id = v.producto_id ";

//para separar la fecha en la consulta
//https://bahiaxip.com/entrada/fechas-en-mysql
$result = $db->query($select);

if($result->rowCount() > 0){
    return $result;

}else {
    return FALSE;
}


}
/**fin  mostrarVentasDia() */

/**Función crearUsuario($nombre,$nombreUsuario,$clave,$rol,$status) */
function crearUsuario($nombre,$nombreUsuario,$clave,$rol,$status){
    $db = conexion();
    //transacción
    $db->beginTransaction();
    //comprobar si ya existe el nombre de usuario 
    $select = "SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = '$nombreUsuario'";
    $result = $db->query($select);
    if($result->rowCount() == 1){
        //existe el usuario
        $db->rollBack();
        $error1 = "El usuario <b>$nombreUsuario</b> ya existe";
        return $error1;
    }else{
        //creación del nuevo usuario
        $insert ="INSERT INTO `usuarios`(`nombre`, `nombre_usuario`, `clave`, `rol`, `status`) VALUES ('$nombre', '$nombreUsuario', '$clave', $rol, $status) ";
        $result = $db->query($insert);
        if(!$result){
            $db->rollBack();
            $error2 = "Error en la creación del usuario $nombreUsuario";
            return $error2;
        }else{
            $db->commit();
            $creado = "El usuario $nombreUsuario ha sido creado correctamente";
            return $creado;
        }
        
    }

}
/**Fin crearUsuario */
/**Función usuariosTodos()*/
function usuariosTodos(){
    //conexión
    $db=conexion();
    $select = "SELECT u.*, r.nombre_grupo FROM usuarios AS u JOIN grupos_usuarios AS r 
    WHERE u.rol = r.rol_grupo";
    $result = $db->query($select);
    if($result->rowCount() > 0){
        return $result;
    }else{
    
        return false;
    }

}
/**Fin usuariosTodos() */

/**Función bajaUsuario($id,$nombreUsuario) */
function bajaUsuario($id,$nombreUsuario){
    $db = conexion();
    $delete = "DELETE FROM usuarios WHERE id = $id AND nombre_usuario = '$nombreUsuario'";
    $result = $db->query($delete);
    if($result->rowCount() == 1){
        return true;
    }else{
        return false;
    }
}
/**Fin bajaUsuario() */

/**Función crearProducto($nombre,$stock,$precioCompra,$precioVenta,$categoria) */
function crearProducto($nombre, $stock, $precioCompra, $precioVenta, $categoria, $nombreImagen){
    $db = conexion();
    //comprobar que existe la categoría del producto o crear una nueva
    $db->beginTransaction();
    $select = "SELECT id FROM categorias WHERE nombre_categoria = '$categoria'";
    $result = $db->query($select);
    if($result->rowCount() == 1){//existe la categoría
        foreach($result as $id){
            $categoria = $id['id'];
        }  
    }else if($result->rowCount() == 0){//no existe la categoria y creamos la nueva categoría
        $insert = "INSERT INTO categorias(nombre_categoria) VALUES ('$categoria')";
        $result = $db->query($insert);
        //comprobamos que la categoría se ha creado
        $select = "SELECT id FROM categorias WHERE nombre_categoria = '$categoria'";
    $result = $db->query($select);
    if($result->rowCount() == 1){
        foreach($result as $id){
            $categoria = $id['id'];
        }  
    }else{
        $db->rollBack();
        $error = "no se ha podido crear la nueva categoría";
        return $error;
    }
 }
    
    // comprobar que no existe ya el producto
    $select = "SELECT nombre, estado FROM productos WHERE nombre ='$nombre'";
    $result = $db->query($select);
    if($result->rowCount() == 1){
        foreach ($result as $producto){
            $estado = $producto['estado'];
        }
        //existe el producto y está activo
        if($estado == 1){
            $db->rollBack();
            $error = "Ya existe un producto con el nombre: $nombre";
            return $error;
        //existe el producto y no está activo. En este caso lo activamos
        }else{
            $update = "UPDATE productos SET estado = 1 WHERE nombre ='$nombre'";
            $result = $db->query($update);
            if(!$result){
                $db->rollBack();
                $error = "No se ha podido crear el nuevo producto activar";
                return $error;
            }
         //aumentamos el estock con el nuevo stock
            $update = "UPDATE productos SET stock =(SELECT stock From productos WHERE nombre = '$nombre') + $stock WHERE nombre = '$nombre'";
            $result = $db->query($update);
            if(!$result){
                $db->rollBack();
                $error = "No se ha podido crear el nuevo producto stock";
                return $error;
            }
        //modificamos el precio de compra con el nuevo precio de compra
            $update = "UPDATE productos SET precio_compra = $precioCompra WHERE nombre ='$nombre'";
            $result = $db->query($update);
            if(!$result){
                $db->rollBack();
                $error = "No se ha podido crear el nuevo producto p.compra";
                return $error;
            }
        //modificamos el precio de venta con el nuevo precio de venta
            $update = "UPDATE productos SET precio_venta = $precioVenta WHERE nombre ='$nombre'";
            $result = $db->query($update);
            if(!$result){
                $db->rollBack();
                $error = "No se ha podido crear el nuevo producto p.venta";
                return $error;
            }
        //registramos la compra del producto
            $total = $precioCompra * $stock;
            $insert = "INSERT INTO compras (producto_id,unidades,precio_compra,precio_venta,total,fecha) VALUES ((SELECT id FROM productos WHERE nombre = '$nombre') ,$stock ,$precioCompra,$precioVenta,$total,now())";
            $result = $db->query($insert);
            if(!$result){
                $db->rollBack();
                $error = "No se ha podido crear el nuevo producto fallo en el registro de la compra";
                return $error;
            }
            $db->commit();
            $nuevoProducto = "El producto $nombre está listo para su venta";
            return $nuevoProducto;

        }

    
}
    //creación del nuevo producto
    $insert = "INSERT INTO productos (nombre, estado, stock, precio_compra, precio_venta, categoria_id, imagen, creado) VALUES ('$nombre', 1, $stock, $precioCompra, $precioVenta, $categoria,'$nombreImagen', NOW()) ";
    $result = $db->query($insert);
    if(!$result){
        $db->rollBack();
        $error = $insert; //"No se ha podido crear el nuevo producto";
        return $error;
    }
    $db->commit();
    $nuevoProducto = "El producto $nombre está listo para su venta";
    return $nuevoProducto;
 
}
/**Fin crearProducto() */
/**Función mostrarProducto($nombre) */
function mostrarProducto($nombre){
    $db=conexion();
    $select = "SELECT * FROM productos WHERE nombre = '$nombre'";
    $result = $db->query($select);
    if($result->rowCount() == 1){
        return $result;
    }else{
        $error = "No se ha encontrado el producto $nombre";
        return $error;
    }
}
/**Fin mostrarProducto($nombre) */
/**Función bajaProducto($id) */
function bajaProducto($id){
    $db = conexion();
    $update = "UPDATE productos SET estado = 0 WHERE id = $id";
    $result = $db->query($update);
    if($result->rowCount() == 1){
        return true;
    }else{
        return false;
    }
}
/**Fin bajaProducto($id) */
/**Función procesarCompra($producto,$unidades,$precioVenta,$precioCompra,$stock) */
function procesarCompra($producto,$unidades,$precioVenta,$precioCompra,$stock){
    $total = $unidades * $precioCompra;
    $db = conexion();
    $db->beginTransaction();
    $insert = "INSERT INTO compras (producto_id,unidades,precio_compra,precio_venta,total,fecha) VALUES ($producto,$unidades,$precioCompra,$precioVenta,$total,now())";
    $result = $db->query($insert);
    If(!$result){
        $db->rollBack();
        return false;
    }
    $update = "UPDATE productos SET stock = $stock, precio_compra = $precioCompra, precio_venta = $precioVenta WHERE id = $producto";
    $result = $db->query($update);
    if($result->rowCount() == 1){
        $db->commit();
        $compra = mostrarUltimaCompra();
        return $compra;
    }else{
        return false;
    }
    

}
/**Fin Función procesarCompra() */
/**Función mostrarUltimaCompra() */
function mostrarUltimaCompra(){
    $db = conexion();
$select = "SELECT p.nombre, c.idCompra, c.unidades, c.precio_compra, c.precio_venta, c.fecha, c.total FROM compras AS c join productos AS p WHERE  p.id = c.producto_id AND idCompra = (SELECT MAX(idCompra) FROM compras)";
$result = $db->query($select);
if($result->rowCount() == 1){
    return $result;
}else{
    return false;
}
}

/**Fin mostrarUltimaCompra() */
/**Función mostrarComprasTodas() */
function mosrtarComprasTodas(){
    //conexión
$db=conexion();
//consulta
$select = "SELECT p.nombre, p.id, c.idCompra, c.unidades, c.precio_compra, c.precio_venta, c.fecha, c.total FROM compras AS c join productos AS p  WHERE  p.id = c.producto_id ORDER BY c.fecha DESC";

$result = $db->query($select);

if($result->rowCount() > 0){
    return $result;

}else {
    return FALSE;
}


}
/**Fin ventasTodas() */
/**Función busquedaProductos($busqueda) */
function busquedaProductos($busqueda){
    $db=conexion();
    $select = "SELECT p.id, p.estado, p.nombre, p.precio_compra, p.precio_venta, p.stock, p.imagen, c.nombre_categoria FROM productos AS p join categorias AS c WHERE p.nombre LIKE '$busqueda%' and p.estado = 1 and p.categoria_id = c.id";
    $result = $db->query($select);
    if(!$result){
        die('Query Error');
        return false;
    }else{
        return $result;
    }

    
}
/**Fin Función busquedaProductos($busqueda) */


