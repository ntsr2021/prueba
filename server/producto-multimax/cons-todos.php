<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);

$busquedad = $datos;


$error = false;
if(!empty($busquedad) && !descripcion($busquedad))
	$error = true;


if(!$error)
{

	$sql = "SELECT *, pm.precio AS precio FROM producto_multimax AS pm JOIN producto AS p ON pm.id_producto=p.id_producto
			WHERE 
			codigo LIKE '%$busquedad%' OR nombre LIKE '%$busquedad%'
			ORDER BY pm.id_producto LIMIT 15";
	$cons = $conex->query($sql);

	$i = 0;
	while($res = $cons->fetch_array())
	{
		$vec[$i] = $res;
		$vec[$i]['precio'] = (float)$vec[$i]['precio'];

		++$i;
	}


	header('Content-Type: application/json');
	if(isset($vec))
		echo json_encode($vec); 
	else
		echo null;
}


?>