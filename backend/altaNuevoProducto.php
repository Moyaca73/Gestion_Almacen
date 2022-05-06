<?php
    require_once("../includes/bd.php");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $nombre = $_POST['nombre'];
      $stock = $_POST['stock'];
      $precioCompra = $_POST['precioCompra'];
      $precioVenta = $_POST['precioVenta'];
      $categoria = $_POST['categoria'];
      $ruta_carpeta = "../imagenes/";
    $nombre_archivo =  $_POST['nombre'] . '.jpg';
    $ruta_guardar_archivo = $ruta_carpeta . $nombre_archivo;
    move_uploaded_file($_FILES['imagen']['tmp_name'],$ruta_guardar_archivo);
      $nuevoProducto = crearProducto($nombre,$stock,$precioCompra,$precioVenta,$categoria,$nombre_archivo);
      echo $nuevoProducto;
    }
    
?>