<?php
require_once("../includes/bd.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $desde = $_POST['desde'];
    $hasta = $_POST['hasta'];
    $ventas = mostrarVentasPeriodo($desde,$hasta);
    if($ventas){
        $ventas_json = json_encode(iterator_to_array($ventas),true);
        echo $ventas_json;
        }else
       echo 'No se han realizado ventas en el periodo: ' . $desde . ' hasta: ' . $hasta; 
       
    }
    return false;
    


?>