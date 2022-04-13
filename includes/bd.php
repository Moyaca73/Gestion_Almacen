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
    $select = "SELECT p.id, p.nombre, p.precio_venta, p.stock, c.nombre_categoria FROM productos AS p join categorias AS c WHERE p.categoria_id = c.id";

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
    //comprovar el stock 
    $select = "SELECT stock, precio_venta, id  FROM productos WHERE id = '$producto'";

    $result = $db->query($select);
    $nuevoStock = 0;
    if($result->rowCount()==1){
        foreach ($result as $venta){
            $stock = intval($venta['stock']);
            $idProducto = $venta['id'];
            $precio_venta = $venta['precio_venta'];

        }
        if($stock >= $unidades){
            $nuevoStock  = $stock - $unidades;
    //Si hay suficiente stock, modificamos el stock
    $query = "UPDATE productos SET stock = '$nuevoStock' Where id = '$producto'";

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
    $insert = "INSERT INTO ventas (`producto_id`, `cantidad`, `precio`, `fecha`) VALUES ('$idProducto','$unidades','$precio_venta',now())";

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
/*función nuevaVenta($producto,$unidades)*/
function nuevaVenta($producto,$unidades,$precio_venta){
    $nuevoStock = comprobarStock($producto,$unidades);
    if($nuevoStock >= 0){
        cambiarStock($producto,$nuevoStock);
        archivarVenta($producto,$unidades,$precio_venta);
       $venta = mostrarUltimaVenta();
        return $venta;
    }else {
        return FALSE;
    }
    
}
/**Función mostrarUltimaVenta() */
function mostrarUltimaVenta(){
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);

    $select = "SELECT p.nombre, v.id, v.cantidad, v.precio FROM ventas AS v join productos AS p WHERE v.id = (SELECT MAX(id) FROM ventas) AND p.id = v.producto_id";

    $result = $db->query($select);

    if($result->rowCount() == 1){
        return $result;

    }else {
        return FALSE;
    }

    
}

/**Función archivarVenta($producto,$unidades,$precio_venta) */
function archivarVenta($producto,$unidades,$precio_venta){
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);

    $insert = "INSERT INTO ventas (`producto_id`, `cantidad`, `precio`, `fecha`) VALUES ('$producto','$unidades','$precio_venta',now())";

    $result = $db->query($insert);

    if(!$result){
        die ("fallo en la entrada del stock");
    
    }
}

/*funcion  comprobarStock($producto,$unidades)*/
function  comprobarStock($producto,$unidades){
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);

    $select = "SELECT stock, precio_venta  FROM productos WHERE id = '$producto'";

    

    $result = $db->query($select);
    $nuevoStock = 0;
    if($result->rowCount()==1){
        foreach ($result as $stock){
        if(intval($stock['stock']) >= intval($unidades)){
            $nuevoStock  = intval($stock['stock']) - intval($unidades);
            return $nuevoStock;
        }else{
            return $stock['stock'];

        }
        }
    }else {
        return FALSE;
    }


}
/**Función  cambiarStock($producto,$nuevoStock)*/
function cambiarStock($producto,$nuevoStock){
    $res=leer_config(dirname(__FILE__)."\configuracion.xml",dirname(__FILE__)."\configuracion.xsd");
    $db=new PDO($res[0],$res[1],$res[2]);
    $query = "UPDATE productos SET stock = '$nuevoStock' Where id = '$producto'";

    $result= $db->query($query);
    if(!$result){
        die ("fallo en la entrada del stock");
    
    }


}
