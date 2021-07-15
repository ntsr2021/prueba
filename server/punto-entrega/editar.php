<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);


$id_punto_entrega = $datos->id_punto_entrega;
$nombre = $datos->nombre;
$direccion = $datos->direccion;


$error = false;
// if(!entero($id_punto_entrega))
// 	$error = true;
// elseif(!alfanumerico($direccion))
// 	$error = true;


if(!$error)
{
	$sql = "UPDATE punto_entrega SET nombre='$nombre', direccion='$direccion' WHERE id_punto_entrega=$id_punto_entrega";
	$conex->query($sql);



	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>