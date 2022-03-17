<?php
include_once './includes/cabecera.php';
?>
<!--menú gestión de usuarios-->
<nav class="nav justify-content-center  bg-danger" style="display: ">
        <li class="nav-item" >
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Gestión de usuarios
            </button>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Alta nuevo usuario</a></li>
              <li><a class="dropdown-item" href="#">Baja usuario</a></li>
              <li><a class="dropdown-item" href="#"></a></li>
            </ul>
          </div>
        </li>
        <!--Fin menú gestión de usuarios-->
        <!--menú gestión de productos-->
        <li class="nav-item" >
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Gestión de Productos
            </button>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Alta nuevo producto</a></li>
              <li><a class="dropdown-item" href="#">Baja producto</a></li>
              <li><a class="dropdown-item" href="#">Comprar producto</a></li>
            </ul>
          </div>
        </li>
        <!--Fin menú gestión de productos-->
        </nav>
        <!--Contenido-->
        <div class="jumbotron bg-light text-center">
            <h1>Bienbenido al menú del administrador</h1>
            <p class="lead">Selecciona en el menú</p>
        </div>
        <!--Fin contenido-->

<?php
include_once './includes/footer.php';
?>