<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$id_vendedor = 'default';
$nombre = $datos->nombre;
$apellido = $datos->apellido;
$ci = $datos->ci;
$rol = $datos->cargo;
$username = $datos->username;
$password = $datos->password;

$id_user = 'default';


$error = false;
$patronUser = '/^[a-zA-Z0-9@\.-_]{6,100}$/';

if(!entero($id_vendedor))
	$error = true;
elseif(!texto($nombre))
	$error = true;
elseif(!texto($apellido))
	$error = true;
elseif(!doc($ci))
	$error = true;
elseif(!texto($rol) || strlen($rol) > 1)
	$error = true;
elseif(!preg_match($patronUser, $username))
	$error = true;
elseif(!password($password))
	$error = true;


if(!$error)
{
	$mens = '';

	// Validar usuario repetido
	$sql = "SELECT username FROM user WHERE username='$username'";
	$cons = $conex->query($sql);
	if(!$cons->fetch_array())
	{
		$password_hash = password_hash($password, PASSWORD_DEFAULT, [2]);

		$sql = "INSERT INTO user (id_user, username, password, rol) VALUES ($id_user, '$username', '$password_hash', '$rol')";
		$conex->query($sql);

		// Consultar ultimo id_user registrado
		$sql = "SELECT id_user FROM user ORDER BY id_user DESC LIMIT 1";
		$cons = $conex->query($sql);
		$res = $cons->fetch_array();
		$id_user = $res['id_user'];

		// Registrar vendedor
		$sql = "INSERT INTO vendedor (id_vendedor, ci, nombre, apellido, id_user) VALUES ($id_vendedor, '$ci', '$nombre', '$apellido', $id_user)";
		$conex->query($sql);

		$mens = 'OK';
	}
	else 
		$mens = 'usuario';

	


	class Resp {}

	$resp = new Resp();
	$resp->mens = $mens;

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>