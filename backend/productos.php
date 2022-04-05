<?php
include ('../includes/bd.php');
session_start();
$productos = [];
$productos = cargarProductos();
$productosJson = json_encode(iterator_to_array($productos),true);
echo $productosJson;

?>