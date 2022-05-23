<?php
require_once("../includes/bd.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $usuarios = usuariosTodos();
    if($usuarios){
        $usuarios_json = json_encode(iterator_to_array($usuarios),true);
        echo $usuarios_json;
        }else
        echo 'error al mostar los usuarios';
    }else{
    
    echo 'error al mostar los usuarios';
    }
