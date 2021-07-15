<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$id_recibo = $_GET['id'];

$error = false;
if(!entero($id_recibo))
	$error = true;

if(!$error)
{
	// Checkear recibo como finalizado
	$sql = "UPDATE recibo SET estatus='f' WHERE id_recibo=$id_recibo";
	$conex->query($sql);



	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>

