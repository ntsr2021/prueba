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
	// Eliminar usuario
	$conex->query("DELETE FROM cliente WHERE id_user=$id_user");
	$conex->query("DELETE FROM user WHERE id_user=$id_user");

	// Eliminar recibos del usuario si posee
	$sql = "SELECT * FROM recibo WHERE id_user=$id_user";
	$cons = $conex->query($sql);
	while($res = $cons->fetch_array())
	{
		$id_recibo = $res['id_recibo'];

		$conex->query("DELETE FROM recibo_entrega WHERE id_recibo=$id_recibo");
		$conex->query("DELETE FROM recibo_pago WHERE id_recibo=$id_recibo");
		$conex->query("DELETE FROM recibo_producto WHERE id_recibo=$id_recibo");
		$conex->query("DELETE FROM recibo WHERE id_recibo=$id_recibo");
	}
			


	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';


	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>