<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'notificacion-cliente.php';


$id_user = $_GET['id_user'];

$notificacion = new NotificacionCliente();


$res = $notificacion->consultar($id_user);


header('Content-Type: application/json');
echo json_encode($res); 

?>