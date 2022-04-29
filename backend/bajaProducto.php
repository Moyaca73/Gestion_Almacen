<?php
    require_once("../includes/bd.php");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST['id'];
        $nombreProducto = $_POST['nombre'];
        $bajaProducto = bajaProducto($id);
        echo true;
      }else{
          echo false;
      }
    
    
?>