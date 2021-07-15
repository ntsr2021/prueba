<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$valor = $_GET['valor'];


$error = false;
if(!decimal($valor))
	$error = true;

if(!$error)
{
	$sql = "UPDATE dolar SET valor=$valor";
	$conex->query($sql);


	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>