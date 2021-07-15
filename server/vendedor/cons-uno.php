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
	$sql = "SELECT * FROM vendedor AS v JOIN user AS u ON v.id_user=u.id_user WHERE v.id_user=$id_user";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();

	header('Content-Type: application/json');
	echo json_encode($res); 
}

?>