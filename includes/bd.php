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
return $result;

}else{
    
    return FALSE;
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