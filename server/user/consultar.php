<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
$token = $datos->token;


if(isset($token) && !empty($token))
{
	$user = decodificarToken($token);


	if($user != null)
	{
		// Verificar datos validos del usuario
		$sql = "SELECT password FROM user WHERE id_user=$user->id_user";
		$cons = $conex->query($sql);

		if($res = $cons->fetch_array())
		{
			if(isset($user->password))
			{
				if(!password_verify($user->password, $res['password']))
					$user = null;
			}else 
				$user = null;
		}else 
			$user = null;
	}
}else
	$user = null;


header('Content-Type: application/json');
echo json_encode($user);

?>