<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$id_departamento = $datos->id_departamento;
$nombre = $datos->nombre;


$error = false;
if(!entero($id_departamento))
	$error = true;
elseif(!descripcion($nombre))
	$error = true;

if(!$error)
{
	$sql = "UPDATE departamento SET nombre='$nombre' WHERE id_departamento=$id_departamento";
	$conex->query($sql);



	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>