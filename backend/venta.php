<?php
    require_once("../includes/bd.php");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $producto = $_POST['producto'];
      $unidades = $_POST['unidades'];
      $precio_venta = $_POST['precio_venta']; 
      $venta = venta($producto,$unidades,$precio_venta);
  
      if($venta){
        $venta_json = json_encode(iterator_to_array($venta),true);
        echo $venta_json;
        }else
       echo 'error en la venta';
       
    }
?>