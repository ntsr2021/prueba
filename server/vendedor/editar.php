<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$id_user = $datos->id_user;
$nombre = $datos->nombre;
$apellido = $datos->apellido;
$ci = $datos->ci;
$rol = $datos->cargo;
$password = $datos->password;


$error = false;
if(!entero($id_user))
	$error = 1;
elseif(!texto($nombre))
	$error = 2;
elseif(!texto($apellido))
	$error = 3;
elseif(!doc($ci))
	$error = 4;
elseif(!texto($rol) || strlen($rol) > 1)
	$error = 5;
elseif(!empty($password) && !password($password))
	$error = 6;


if(!$error)
{
	// Editar vendedor
	$sql = "UPDATE vendedor SET ci='$ci', nombre='$nombre', apellido='$apellido' WHERE id_user=$id_user";
	$conex->query($sql);
	$sql = "UPDATE user SET rol='$rol' WHERE id_user=$id_user";
	$conex->query($sql);


	// Cambiar contraseña
	if($password != null)
	{	
		$password_hash = password_hash($password, PASSWORD_DEFAULT, [2]);

		$sql = "UPDATE user SET password='$password_hash' WHERE id_user=$id_user";
		$conex->query($sql);
	}


	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>