<?php
    require_once("../includes/bd.php");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST['id'];
        $nombreUsuario = $_POST['nombreUsuario'];
        $bajaUsuario = bajaUsuario($id,$nombreUsuario);
        echo true;
      }else{
          echo false;
      }
    
    
?>