<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'notificacion-cliente.php';


$id_user = $_GET['id_user'];

$notificacion = new NotificacionCliente();


$notificacion->desactivar($id_user);



header('Content-Type: application/json');

class Resp {}
$resp = new Resp();
$resp->mens = 'OK';

echo json_encode($resp);


?>