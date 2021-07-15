<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$asignado = $_GET['id'];

$error = false;
if(!entero($asignado))
	$error = true;


if(!$error)
{
	$sql = "SELECT COUNT(*) AS cantidad FROM recibo WHERE asignado=$asignado AND estatus='p'";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	 

	class Resp {}
	$resp = new Resp();
	$resp->mens = $res['cantidad'];

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>