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
	$sql = "SELECT * FROM producto_foto WHERE id_producto=$id_producto ORDER BY id_producto_foto";
	$cons = $conex->query($sql);
	while($res = $cons->fetch_array())
		$vec[] = $res;

	header('Content-Type: application/json');
	if(isset($vec))
		echo json_encode($vec); 
	else 
		echo null;
}


?>