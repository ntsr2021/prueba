<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$id_punto_entrega = $_GET['id'];

$error = false;
if(!entero($id_punto_entrega))
	$error = true;


if(!$error)
{
	$sql = "SELECT * FROM punto_entrega WHERE id_punto_entrega=$id_punto_entrega";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();

	header('Content-Type: application/json');
	echo json_encode($res); 
}



?>