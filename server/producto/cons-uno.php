<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_producto = $_GET['id_producto'];


$error = false;
if(!entero($id_producto))
	$error = true;

if(!$error)
{

	$sql = "SELECT *,
	
	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento1) AS cat1,
	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento2) AS cat2

	FROM producto WHERE id_producto = $id_producto";
	
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();

	header('Content-Type: application/json');
	echo json_encode($res); 
}

?>