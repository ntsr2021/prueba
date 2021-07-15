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
	$sql = "SELECT *, c.direccion AS cli_direccion, u.username AS correo, CONCAT('R-', LPAD(r.id_recibo, 4, '0')) AS codigo -- Este será el código que identificará al recibo 
			FROM recibo AS r 
			JOIN cliente AS c ON r.id_user=c.id_user
			JOIN user AS u ON c.id_user=u.id_user
			JOIN recibo_entrega AS re ON r.id_recibo=re.id_recibo
			WHERE r.id_recibo=$id_recibo";
	$cons = $conex->query($sql);
	$datos = $cons->fetch_array();
	

	// Consultar pagos realizados
	$sql = "SELECT * FROM recibo_pago WHERE id_recibo = $id_recibo ORDER BY id_recibo_pago ASC";
	$cons = $conex->query($sql);
	while($res = $cons->fetch_array())
		$pagos[] = $res;

	// Consultar productos comprados
	$sql = "SELECT * FROM recibo_producto WHERE id_recibo = $id_recibo";
	$cons = $conex->query($sql);
	while($res = $cons->fetch_array())
		$productos[] = $res;



	class Recibo {}
	$recibo = new Recibo();
	$recibo->datos = $datos;
	$recibo->pagos = $pagos;
	$recibo->productos = $productos;


	header('Content-Type: application/json');
	echo json_encode($recibo);
}


?>