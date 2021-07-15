<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$id_departamento_grupo = $datos->id_departamento_grupo;
$nombre = $datos->nombre;

$error = false;
if(!entero($id_departamento_grupo))
	$error = true;
elseif(!descripcion($nombre))
	$error = true;


if(!$error)
{
	$sql = "UPDATE departamento_grupo SET nombre='$nombre' WHERE id_departamento_grupo=$id_departamento_grupo";
	$conex->query($sql);



	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>