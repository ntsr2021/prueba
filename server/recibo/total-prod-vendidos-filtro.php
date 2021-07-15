<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);

$tipo = $datos->tipo_entrega;
$id_punto_entrega = $datos->punto_entrega;


$error = false;
if(!texto($tipo) || strlen($tipo) > 1)
	$error = true;
elseif(!entero($id_punto_entrega))
	$error = true;


if(!$error)
{
	$sql = "SELECT COUNT(*) AS total FROM recibo AS r 
			JOIN recibo_producto AS rp ON r.id_recibo=rp.id_recibo 
			JOIN recibo_entrega AS re ON r.id_recibo=re.id_recibo
			WHERE r.estatus='a' AND re.tipo LIKE '%$tipo' AND re.id_punto_entrega LIKE '%$id_punto_entrega'";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();


	class Resp {}
	$resp = new Resp();
	$resp->total = $res['total'];


	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>