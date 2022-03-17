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

      <!--Barra de navegación-->
      <nav class="nav justify-content-center  bg-dark" style="display: ">
        <li class="nav-item">
          <a class="btn btn-primary" href="index.php">Inicio</a>
        </li>
        
       
        <!--menú gestión de ventas-->
        <li class="nav-item">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Gestión de ventas
            </button>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Nueva venta</a></li>
              <li><a class="dropdown-item" href="#">Eliminar venta</a></li>
            </ul>
          </div>
        </li>
        <!--Fin menú gestión de ventas-->
        <!--menú informe de ventas-->
        <li class="nav-item">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Informe de ventas
            </button>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">última venta</a></li>
              <li><a class="dropdown-item" href="#">ventas del día</a></li>
              <li><a class="dropdown-item" href="#">ventas del periodo</a></li>
            </ul>
          </div>
        </li>
        <!--Fin menú informe de ventas-->
      </nav>
      <!--Fin barra de navegación-->