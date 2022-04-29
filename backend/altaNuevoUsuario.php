<?php
    require_once("../includes/bd.php");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $nombre = $_POST['nombre'];
      $nombreUsuario = $_POST['nombreUsuario'];
      $clave = $_POST['clave'];
      $rol = $_POST['rol'];
      $status = $_POST['status'];
      $nuevoUsuario = crearUsuario($nombre,$nombreUsuario,$clave,$rol,$status);
    }
?>