<?php
include ('./includes/bd.php');
session_start();
 $nombre_usuario = $_SESSION['usuario']['nombre_usuario'];
 $clave = $_SESSION['usuario']['clave'];
 $usuario = cargar_usuario($nombre_usuario,$clave);
 if($usuario){
 $usuario_json = json_encode(iterator_to_array($usuario),true);
 echo $usuario_json;
 }else
echo 'error al cargar el usuario';
?>