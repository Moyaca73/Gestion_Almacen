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
      <nav class="nav justify-content-center  bg-dark" style="display: none;">
        <li class="nav-item">
          <a class="nav-link active" href="#">Inicio</a>
        </li>
        <li class="nav-item">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown button
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Item 2</a>
        </li>
      </nav>
      <!--Fin barra de navegación-->