<?php
require_once("../includes/bd.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $busqueda = $_POST['busqueda'];
    $producto = busquedaProductos($busqueda);
    if($producto){
        $producto_json = json_encode(iterator_to_array($producto),true);
        echo $producto_json;
        }else{
            echo 'No se hay productos que mostrar';
        }
       
    }else
    return false;
?>