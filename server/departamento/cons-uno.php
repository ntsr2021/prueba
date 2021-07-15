<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$id_departamento = $_GET['id'];

$error = false;
if(!entero($id_departamento))
	$error = true;

if(!$error)
{
	$sql = "SELECT * FROM departamento WHERE id_departamento=$id_departamento";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();

	header('Content-Type: application/json');
	echo json_encode($res); 
}


?>