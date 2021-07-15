<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);

$password_actual = $datos->password_actual;
$password_nuevo = $datos->password_nuevo;
$id_user = $datos->id_user;


$error = false;
if(!password($password_actual))
	$error = true;
elseif(!password($password_nuevo))
	$error = true;
elseif(!entero($id_user))
	$error = true;


if(!$error)
{
	$sql = "SELECT * FROM user WHERE id_user=$id_user";
	$cons = $conex->query($sql);

	$mens = null;
	if($res = $cons->fetch_array())
	{
		if(password_verify($password_actual, $res['password'])) // La contraseña anterior corresponde con la contraseña actual
		{
			$hashNuevo = password_hash($password_nuevo, PASSWORD_DEFAULT, [2]);

			$sql = "UPDATE user SET password='$hashNuevo' WHERE id_user=$id_user"; // Actualizar contraseña
			$conex->query($sql);


			// Crear token 
			$user = ['id_user' => $res['id_user'], 'rol' => $res['rol'], 'password' => $password_nuevo];
			$token = codificarToken($user);

			$mens = $token;
		}
	}


	class Resp {}
	$resp = new Resp();
	$resp->mens = $mens;


	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>