<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';
require '../validacion.php';
require '../conexion.php';
require '../carro-compra/carro-compra.php';


$carroCompra = new CarroCompra();


$json = file_get_contents('php://input');
$datos = json_decode($json);


// User
$user = decodificarToken($datos->token);
$id_user = $user->id_user;

$productos = $datos->productos;


$carroCompra->registrar($id_user, $productos);



class Resp {}
$resp = new Resp();
$resp->mens = 'OK';


header('Content-Type: application/json');
echo json_encode($resp); 


?>
