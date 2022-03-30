<?PHP
function comprobar_sesion(){
    session_start();
    if(!isset($_SESSION['usuario'])){
        return FALSE;
    }else{
        return TRUE;
    }
}

?>