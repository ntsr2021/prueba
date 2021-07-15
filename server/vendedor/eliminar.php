<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_user = $_GET['id'];


$error = false;
if(!entero($id_user))
	$error = true;

if(!$error)
{
	$sql = "DELETE FROM vendedor WHERE id_user=$id_user";
	$conex->query($sql);



	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';


	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>