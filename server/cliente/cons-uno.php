<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$id_user = $_GET['id'];

$error = false;
if(empty($id_user) || !entero($id_user))
	$error = true;

if(!$error)
{
	$sql = "SELECT *, username AS correo FROM cliente AS c JOIN user AS u ON c.id_user=u.id_user WHERE c.id_user=$id_user";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();

	header('Content-Type: application/json');
	echo json_encode($res); 
}



?>