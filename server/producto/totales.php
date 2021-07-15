<?php 

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$id_departamento1 = $_GET['id'];

$error = false;
if(!empty($id_departamento1) && !entero($id_departamento1))
	$error = true;

if(!$error)
{

	if($id_departamento1 == null)
		$id_departamento1 = 'is null';
	else 
		$id_departamento1 = '='.$id_departamento1;


	$sql = "SELECT COUNT(*) AS pro, SUM(precio) AS dol FROM producto WHERE estatus != 'i' AND id_departamento1 $id_departamento1";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();


	header('Content-Type: application/json');
	echo json_encode($res); 
}


?>



