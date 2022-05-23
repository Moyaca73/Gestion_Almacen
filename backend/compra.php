<?php
    require_once("../includes/bd.php");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $producto = $_POST['producto'];
      $precioVenta = $_POST['precioVenta']; 
      $precioCompra = $_POST['precioCompra'];
      $stock = $_POST['stock'];
      $unidades = $_POST['unidades'];
      $compra = procesarCompra($producto,$unidades,$precioVenta,$precioCompra,$stock);
  
      if($compra){
        $compra_json = json_encode(iterator_to_array($compra),true);
        echo $compra_json;
        }else
       echo $compra;
       
    }
