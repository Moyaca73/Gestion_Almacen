<?php
require_once("../includes/bd.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $ventas = mostrarUltimaVenta();
    if($ventas){
        $ventas_json = json_encode(iterator_to_array($ventas),true);
        echo $ventas_json;
        }else
       echo 'No se hay ventas que mostrar';
       
    }
    return false;
