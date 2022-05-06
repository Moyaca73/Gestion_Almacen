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
    return $db;
}

/**Función comprobar usuario */
function comprobar_usuario($nombre_usuario,$clave){

$res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
$db=new PDO($res[0],$res[1],$res[2]);
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
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);
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
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);
    $query = "UPDATE usuarios SET ultimo_acceso = now() Where nombre_usuario = '$nombre_usuario'";

    $result= $db->query($query);
    if(!$result){
        die ("fallo en la entrada");
    
    }


}

/**Función cargarProductos() */
function cargarProductos(){
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);
    $select = "SELECT p.id, p.nombre, p.precio_compra, p.precio_venta, p.stock, p.imagen, c.nombre_categoria FROM productos AS p join categorias AS c WHERE p.categoria_id = c.id";

    $result= $db->query($select);
    if($result->rowCount()>=1){
        return $result;

    }else{
        
        return FALSE;
    }
}
/*función venta($producto,$unidades)*/
function venta($producto, $unidades){
    //conexión
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);
    //comienzo de la transacción
    $db->beginTransaction();
    //comproBar el stock 
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

        }else{
            //si no funciona, anulamos la transacción 
            $db->rollBack();
            return false;
        }
    }
    //generar el registro de la nueva venta
    $insert = "INSERT INTO ventas (`producto_id`, `cantidad`, `precio`, `fecha`) VALUES ('$idProducto',$unidades,'$precio_venta',now())";

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
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);

    $select = "SELECT p.nombre,p.id,p.stock, v.idVenta, v.cantidad, v.precio, v.fecha FROM ventas AS v join productos AS p WHERE v.idVenta = (SELECT MAX(idVenta) FROM ventas) AND p.id = v.producto_id";

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
$res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);
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
$res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
$db=new PDO($res[0],$res[1],$res[2]);
//consulta
$select = "SELECT p.nombre, p.id, p.stock, v.idVenta, v.cantidad, v.precio, v.fecha FROM ventas AS v join productos AS p WHERE  p.id = v.producto_id";

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
$res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
$db=new PDO($res[0],$res[1],$res[2]);
//consulta
$select = "SELECT p.nombre, p.id, p.stock, v.idVenta, v.cantidad, v.precio, v.fecha FROM ventas AS v join productos AS p WHERE DATE(v.fecha) = '$fecha' AND  p.id = v.producto_id ";

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
$res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
$db=new PDO($res[0],$res[1],$res[2]);
//consulta
$select = "SELECT p.nombre, p.id, p.stock, v.idVenta, v.cantidad, v.precio, v.fecha FROM ventas AS v join productos AS p WHERE DATE(v.fecha) >= '$desde' AND DATE(v.fecha) <= '$hasta' AND  p.id = v.producto_id ";

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
    //comprovar si ya existe el nombre de usuario 
    $select = "SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = '$nombreUsuario'";
    $result = $db->query($select);
    if($result->rowCount() == 1){
        //existe el usuario
        $db->rollBack();
        $error = "El usuario <b>$nombreUsuario</b> ya existe";
        return $error;
    }else{
        //creación del nuevo usuario
        $insert ="INSERT INTO `usuarios`(`nombre`, `nombre_usuario`, `clave`, `rol`, `status`) VALUES ('$nombre', '$nombreUsuario', '$clave', $rol, $status) ";
        $result = $db->query($insert);
        if(!$result){
            $db->rollBack();
            $error = "Error en la creación del usuario $nombreUsuario";
            return $error;
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
function crearProducto($nombre, $stock, $precioCompra, $precioVenta, $categoria,$nombreImagen){
    $db = conexion();
    //comprovar que existe la categoría del producto o crear una nueva
    $db->beginTransaction();
    $select = "SELECT id FROM categorias WHERE nombre_categoria = '$categoria'";
    $result = $db->query($select);
    if($result->rowCount() == 1){
        foreach($result as $id){
            $categoria = $id['id'];
        }  
    }else if($result->rowCount() == 0){
        $insert = "INSERT INTO categorias(nombre_categoria) VALUES ('$categoria')";
        $result = $db->query($insert);
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
    $select = "SELECT nombre FROM productos WHERE nombre ='$nombre'";
    $result = $db->query($select);
    if($result->rowCount() == 1){
        $db->rollBack();
        $error = "El ya existe un producto con el nombre: $nombre";
        return $error;
    }
    //creción del nuevo producto
    $insert = "INSERT INTO productos (nombre, stock, precio_compra, precio_venta, categoria_id, imagen, creado) VALUES ('$nombre', $stock, $precioCompra, $precioVenta, $categoria,'$nombreImagen', NOW()) ";
    $result = $db->query($insert);
    if(!$result){
        $db->rollBack();
        $error = "No se ha podido crear el nuevo producto";
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
    $delete = "DELETE FROM productos WHERE id = $id";
    $result = $db->query($delete);
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
$select = "SELECT * FROM compras WHERE id = (SELECT MAX(id) FROM compras)";
$result = $db->query($select);
if($result->rowCount() == 1){
    return $result;
}else{
    return false;
}
}

/**Fin mostrarUltimaCompra() */


