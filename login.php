<?php
    require_once("./includes/bd.php");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $usu = comprobar_usuario($_POST["usuario"], $_POST["clave"]);
  
      if ($usu === false) {
        echo "FALSE";
      } else {
        //$usu tiene campos del usuario
        session_start();
        $_SESSION['usuario']=$usu;
        echo "TRUE";
      }
    }
?>
