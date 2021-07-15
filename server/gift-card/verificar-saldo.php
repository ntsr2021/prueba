<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';
require '../function.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);


$token = $datos->token;
$codigo = $datos->codigo;
$monto = $datos->monto;
$mens = '';


$error = false;

if(!descripcion($codigo))
	$error = true;
elseif(!decimal($monto))
	$error = true;


if(!$error)
{

	$user = decodificarToken($token);
	$id_user = $user->id_user;


	$sql = "SELECT saldo FROM gift_card WHERE codigo='$codigo' AND id_user_receptor=$id_user";
	$cons = $conex->query($sql);

	if($res = $cons->fetch_array())
	{
		$saldo = (float)$res['saldo'];

		if($saldo < $monto)
			$mens = 'saldo_insuficiente';
		else 
			$mens = 'OK';

	}else
		$mens = 'codigo_inexistente';



	header('Content-Type: application/json');

	class Resp {}
	$resp = new Resp();
	$resp->mens = $mens;

	echo json_encode($resp);
	
}


?>