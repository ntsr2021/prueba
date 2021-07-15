<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);

$estatus = $datos->activar;
$hora_apertura = $datos->hora_apertura;
$hora_cierre = $datos->hora_cierre;


$error = false;
// if(!empty($hora_apertura) && !hora($hora_apertura))
// 	$error = true;
// elseif(!empty($hora_apertura) && !hora($hora_cierre))
// 	$error = true;


if(!$error)
{
	if($estatus == true)
		$sql = "UPDATE horario_cierre SET estatus='a', hora_apertura='$hora_apertura', hora_cierre='$hora_cierre'";
	else
		$sql = "UPDATE horario_cierre SET estatus='i', hora_apertura=null, hora_cierre=null";
	$conex->query($sql);


	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}

?>