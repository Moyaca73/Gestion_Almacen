<?php
    require_once("../includes/bd.php");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST['idVenta'];
        $cantidad = $_POST['cantidad'];
        $producto = $_POST['producto'];
        $anulacion = anularVenta($id,$cantidad,$producto);
        echo $anulacion; 
      }
    return false;
