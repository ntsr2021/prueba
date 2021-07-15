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
	$sql = "SELECT *, pm.precio AS precio FROM producto AS p JOIN producto_multimax AS pm ON p.id_producto=pm.id_producto WHERE p.id_producto = $id_producto";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();

	header('Content-Type: application/json');
	echo json_encode($res); 
}

?>