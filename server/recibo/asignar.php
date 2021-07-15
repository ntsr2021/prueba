<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_vendedor = $_GET['id_vendedor'];
$id_recibo = $_GET['id_recibo'];


$error = false;
if(!entero($id_vendedor))
	$error = true;
elseif(!entero($id_recibo))
	$error = true;

if(!$error)
{
	$sql = "UPDATE recibo SET asignado=$id_vendedor WHERE id_recibo=$id_recibo";
	$conex->query($sql);


	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 	
}



?>