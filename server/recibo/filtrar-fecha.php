<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);

$fecha_inicial = $datos->fecha_inicial;
$fecha_final = $datos->fecha_final;


$error = false;
if(!fecha($fecha_inicial))
	$error = true;
elseif(!fecha($fecha_final))
	$error = true;


if(!$error)
{
	$sql = "SELECT *, CONCAT('R-', LPAD(r.id_recibo, 4, '0')) AS codigo -- Este será el código que identificará al recibo  
					FROM recibo AS r 
					JOIN cliente AS c ON r.id_user=c.id_user 
					WHERE fecha BETWEEN '$fecha_inicial' AND '$fecha_final'
					ORDER BY r.id_recibo DESC";
	$cons = $conex->query($sql);

	$i = 0;
	while($res = $cons->fetch_array())
	{

		$vec[$i] = $res;

		if($res['asignado'] != null)
		{
			$sql = "SELECT username FROM user WHERE id_user=$res[asignado]";
			$cons2 = $conex->query($sql);
			$res2 = $cons2->fetch_array();

			$vec[$i]['nombre_asignado'] = $res2['username'];
		}


		// Consultar totales de productos vendidos y ganancia 
		$sql = "SELECT SUM(precio*cantidad) AS monto, SUM(cantidad) AS productos FROM recibo_producto WHERE id_recibo=$res[id_recibo]";
		$cons3 = $conex->query($sql);
		$res3 = $cons3->fetch_array();

		$vec[$i]['monto'] = (float)$res3['monto'];
		$vec[$i]['productos'] = $res3['productos'];
		

		++$i;
	}


	header('Content-Type: application/json');

	if(isset($vec))
		echo json_encode($vec); 
	else
		echo json_encode(null);
}


?>


