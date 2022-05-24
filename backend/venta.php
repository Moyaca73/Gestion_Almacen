<?php
    require_once("../includes/sesiones.php");
    require_once("../includes/bd.php");
    if ($_SERVER["REQUEST_METHOD"] == "POST" & comprobar_sesion()) {
      $producto = $_POST['producto'];
      $unidades = $_POST['unidades'];
      $precio_venta = $_POST['precio_venta']; 
      $usuario = $_SESSION['usuario']['id'];//par averiguar el id del vendedor es necesario comprobar la sesión
      $venta = venta($producto,$unidades,$usuario);
  
      if($venta){
        $venta_json = json_encode(iterator_to_array($venta),true);
        echo $venta_json;
        }else
       echo 'error en la venta';
       
    }
    return false;
