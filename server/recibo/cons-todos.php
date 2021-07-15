<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);

$filtros = $datos->filtros;
$user = $datos->user;


$id_user = $user->id_user;
$rol = $user->rol;

$fecha_inicial = $filtros->fecha_inicial;
$fecha_final = $filtros->fecha_final;

$tipo = $filtros->tipo_entrega;
$punto_entrega = $filtros->punto_entrega;


if($fecha_inicial == '') // Si las fechas estan vacias, estan tomaran la fecha de hoy
{
	$filtro_fecha = 'AND fecha = CURDATE()';
}else 
{
	$filtro_fecha = "AND fecha BETWEEN '".$fecha_inicial."' AND '".$fecha_final."'";
}

// Limitar consulta segun el tipo de usuario
$filtro_usuario = "";
if($rol == 'd')
{
	$filtro_usuario = "AND r.estatus='a' || r.estatus='f'";
}else if($rol == 'v') 
	$filtro_usuario = "AND asignado = ".$id_user;


$sql = "SELECT *, CONCAT('R-', LPAD(r.id_recibo, 4, '0')) AS codigo   
				FROM recibo AS r JOIN cliente AS c ON r.id_user=c.id_user 
				JOIN recibo_entrega AS re ON r.id_recibo=re.id_recibo 
				WHERE 
				re.tipo LIKE '%$tipo' AND re.punto_entrega LIKE '%$punto_entrega' 
				$filtro_usuario 
				$filtro_fecha
				ORDER BY r.id_recibo DESC";

$cons = $conex->query($sql);

$i = 0;
while($res = $cons->fetch_array())
{

	$vec[$i] = $res;

	// Consultar nombre de usuario del vendedor asignado
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


	// Varlidar que solo se sumen cantidades de recibos procesados
	if($res['estatus'] == 'a' || $res['estatus'] == 'f')
	{
		$vec[$i]['monto'] = (float)$res3['monto'];
		$vec[$i]['productos'] = $res3['productos'];
	}
	else 
	{
		$vec[$i]['monto'] = 0;
		$vec[$i]['productos'] = 0;
	}


	++$i;
}



header('Content-Type: application/json');
if(isset($vec))
	echo json_encode($vec); 
else
	echo json_encode(null);

?>



