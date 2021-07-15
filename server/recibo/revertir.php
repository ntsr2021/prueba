<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_recibo = $_GET['id'];


$error = false;
if(!entero($id_recibo))
	$error = true;


if(!$error)
{	
	// Eliminar recibo
	$sql = "DELETE FROM recibo WHERE id_recibo=$id_recibo";
	$conex->query($sql);


	// Retornar productos al inventario
	$sql = "SELECT codigo, cantidad FROM recibo_producto WHERE id_recibo=$id_recibo";
	$cons = $conex->query($sql);

	while($res = $cons->fetch_array())
	{
		$cantidad = (int)$res['cantidad'];

		// Actualizar cantidad producto
		$sql = "UPDATE producto SET cantidad=(cantidad+$cantidad) WHERE codigo='$res[codigo]';";
		$conex->query($sql);
	}

	// Eliminar operacion cliente_demo_operacion
	$sql = "DELETE FROM recibo_producto WHERE id_recibo=$id_recibo";
	$conex->query($sql);
	//////////////


	// Eliminar notificacion cuenta admin
	// $sql = "DELETE FROM notificacion WHERE id_recibo=$id_recibo";
	// $conex->query($sql);


	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>