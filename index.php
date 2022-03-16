<?php
/**Conectamos con la base de datos y comprobamos que el usuario esté registrado y que tipo de usuario es */
require_once("./includes/bd.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usu = (comprobar_usuario($_POST["usuario"], $_POST["clave"]));

    if ($usu === false) {
        $err = true;
        echo "el usuario no existe en la base de datos";
    } else {
        //$usu tiene campos del usuario
        session_start();
        $_SESSION['usuario'] = $usu;
        //Comprovamos que tipo de usuario es para permitirle el acceso a su interfaz
        if (strcmp($_SESSION['usuario']['TIPO'], 'A') == 0) {

            header("Location:usuario_admin.php");
        } else if (strcmp($_SESSION['usuario']['TIPO'], 'N') == 0) {
            header("Location:usuario_normal.php");
        } else {
            echo "<h2>El tipo de usuario" . $_SESSION['usuario']['TIPO'] . " no existe.</h2>";
        }
    }
}
?>
<!doctype html>
<html lang="en">
<head>
  <title>Title</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS v5.0.2 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

</head>

<body>

  <body>
    <div class="container-fluid">
      <!--Cabecera-->
      <header id="header">
        <div class="row">
          <div class="col-6 col-lg-3 text-center border rounded">Inventario</div>
          <div class="col-6 col-lg-9 text-end border rounded"><?php echo date("d/m/Y g:i a"); ?></div>
        </div>

      </header>
      <!--Fin  Cabecera-->

     
      <!--Contenido-->
      <div class="col-md-12">
        <div class="panel">
          <div class="jumbotron text-center">
            <h1>Acceso Usuarios</h1>
            <form method="post" action="" class="clearfix">
        <div class="form-group">
              <label for="usuario" class="control-label">Usario</label>
              <input type="text" class="form-control" name="usuario" placeholder="Usario">
        </div>
        <div class="form-group">
            <label for="clave" class="control-label">Contraseña</label>
            <input type="password" name= "clave" class="form-control" placeholder="Contraseña">
        </div>
        <div class="form-group">
                <button type="submit" class="btn btn-info  pull-right">Acceso</button>
        </div>
    </form>

          </div>
        </div>
      </div>
      <!--Fin Contenido-->
      <!--Pié de página-->
      <footer>
        <div class="text-center p-5 bg-light">
          © 2021 Copyright: Antonio Moya Calvo
        </div>
      </footer>
    </div>
    <!-- Bootstrap JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
  </body>

</html>