<?php
require_once("../includes/bd.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $fecha = $_GET['fecha'];
    $ventas = mostrarVentasDia($fecha);
    if($ventas){
        $ventas_json = json_encode(iterator_to_array($ventas),true);
        echo $ventas_json;
        }else
       echo 'Hoy: '.$fecha.' no se ha realizado ninguna venta';
       
    }
     
    


?>