<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$id_punto_entrega = 'default';
$nombre = $datos->nombre;
$direccion = $datos->direccion;


$error = false;
// if(!alfanumerico($direccion))
// 	$error = true;


if(!$error)
{
	$sql = "INSERT INTO punto_entrega (id_punto_entrega, nombre, direccion) VALUES ($id_punto_entrega, '$nombre', '$direccion')";
	$conex->query($sql);



	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>