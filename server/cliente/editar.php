<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);


$id_user = $datos->id_user;
$tipo_doc = $datos->tipo_doc;
$doc = $datos->doc;
$nombre = $datos->nombre;
$apellido = $datos->apellido;
$telefono = $datos->telefono;
$direccion = $datos->direccion;


$error = false;
if(!entero($id_user))
	$error = true;
elseif(!texto($tipo_doc) || strlen($tipo_doc) > 1)
	$error = true;
elseif(!doc($doc))
	$error = true;
elseif(!alfanumerico($nombre) || strlen($nombre) > 40)
	$error = true;
elseif(!alfanumerico($apellido) || strlen($nombre) > 40)
	$error = true;
elseif(!telefono($telefono))
	$error = true;
elseif(!descripcion($direccion) || strlen($direccion) > 300)
	$error = true;


if(!$error)
{
	$mens = '';


	// Comprobar si el documento o el telefono se encuentran en otra cuenta de usuario
	$cons = $conex->query("SELECT doc FROM cliente WHERE doc = '$doc' AND id_user != $id_user");
	$cons2 = $conex->query("SELECT telefono FROM cliente WHERE telefono = '$telefono' AND id_user != $id_user");
	if($cons->fetch_array())
		$mens = 'documento';
	elseif($cons2->fetch_array())
		$mens = 'telefono';

	else
	{
		$sql = "UPDATE cliente SET tipo_doc='$tipo_doc', doc='$doc', nombre='$nombre', apellido='$apellido', telefono='$telefono', direccion='$direccion' WHERE id_user=$id_user";
		$conex->query($sql);

		$mens = 'OK';
	}



	class Resp {}
	$resp = new Resp();
	$resp->mens = $mens;

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>