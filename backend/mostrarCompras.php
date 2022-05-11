<?php
require_once("../includes/bd.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $compras =  mosrtarComprasTodas();
    if($compras){
        $compras_json = json_encode(iterator_to_array($compras),true);
        echo $compras_json;
        }else{
            echo 'No se ha realizado ninguna compra';
        }
       
    }else
    return false;
?>