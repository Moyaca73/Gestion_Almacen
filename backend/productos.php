<?php
include ('../includes/bd.php');
if ($_SERVER["REQUEST_METHOD"] == "GET"){
    $productos = cargarProductos();
    if($productos){
    $productosJson = json_encode(iterator_to_array($productos),true);
    echo $productosJson;
    }else{
        echo 'No hay productos que mostrar';
    }

}
return false;
