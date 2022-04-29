<?php
    require_once("../includes/bd.php");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $nombre = $_POST['nombre'];
      $stock = $_POST['stock'];
      $precioCompra = $_POST['precioCompra'];
      $precioVenta = $_POST['precioVenta'];
      $categoria = $_POST['categoria'];
      $nuevoProducto = crearProducto($nombre,$stock,$precioCompra,$precioVenta,$categoria);
      echo $nuevoProducto;
    }
?>