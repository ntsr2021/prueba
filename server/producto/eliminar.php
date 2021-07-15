<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$id_producto = $_GET['id'];


$error = false;
if(!entero($id_producto))
	$error = true;


if(!$error)
{
	// Eliminar fotos

	// Eliminar foto principal
	$sql = "SELECT foto_prin FROM producto WHERE id_producto=$id_producto";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	unlink($path_proy.'assets/img/producto/'.$res['foto_prin'].'.jpg');

	// Eliminar fotos segundarias
	$sql = "SELECT * FROM producto_foto WHERE id_producto=$id_producto";
	$cons = $conex->query($sql);
	while($res = $cons->fetch_array())
		unlink($path_proy.'assets/img/producto/'.$res['foto'].'.jpg');

	$sql = "DELETE FROM producto_foto WHERE id_producto=$id_producto";
	$conex->query($sql);


	// Inactivar producto
	$sql = "UPDATE producto SET estatus='i' WHERE id_producto=$id_producto";
	$conex->query($sql);


	class Result {}
	$resp = new Result();
	$resp->mens = 'OK';


	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>