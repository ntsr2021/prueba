<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);

$username = $datos->username;
$password = $datos->password;


$error = false;
$patronUser = '/^[a-zA-Z0-9@\.\-_]{6,100}$/';

if(!preg_match($patronUser, $username))
	$error = true;
elseif(!password($password))
	$error = true;


$rol = '';
$mens = null;

if(!$error)
{	
	$sql = "SELECT * FROM user WHERE username = '$username'";
	$cons = $conex->query($sql);
	
	if($res = $cons->fetch_array())
	{
		$hash = $res['password'];

		if(password_verify($password, $hash))
		{
			$user = ['id_user' => $res['id_user'], 'rol' => $res['rol'], 'password' => $password];

			$token = codificarToken($user);
			$mens = $token;
			$rol = $res['rol'];
		}
	}
}



class Resp {}
$resp = new Resp();
$resp->mens = $mens;
$resp->rol = $rol;

header('Content-Type: application/json');
echo json_encode($resp); 

?>