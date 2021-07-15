<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);


$busquedad = $datos->busquedad;

$consInicial = $datos->consInicial;
$limConsulta = 16;


// Validar campos
$error = false;

if(!entero($consInicial))
	$error = true;



if(!$error)
{
	$marcaTiempo = time();

	$sql = "SELECT *, pm.precio AS precio FROM producto 
		AS p JOIN producto_multimax AS pm ON p.id_producto=pm.id_producto
		WHERE 
		(p.codigo LIKE '%$busquedad%' OR p.nombre LIKE '%$busquedad%' OR p.descripcion LIKE '%$busquedad%') AND  
		(p.estatus != 'i') ORDER BY pm.id_producto DESC LIMIT $consInicial, $limConsulta";


	$i = 0;
	$cons = $conex->query($sql);
	while($res = $cons->fetch_array())
	{
		$vec[$i] = $res;
		$vec[$i]['marcaTiempo'] = $marcaTiempo;
		$vec[$i]['precio'] = (float)$vec[$i]['precio'];

		++$i;
	}




	header('Content-Type: application/json');
	if(isset($vec))
		echo json_encode($vec); 
	else
		echo json_encode(null);
}



?>