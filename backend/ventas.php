<?php
require_once("../includes/bd.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $ventas = ventasTodas();
    if($ventas){
        $ventas_json = json_encode(iterator_to_array($ventas),true);
        echo $ventas_json;
        }else
       echo 'error al mostar las ventas';
       
    }
