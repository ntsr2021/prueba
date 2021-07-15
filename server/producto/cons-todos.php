<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);

$busquedad = $datos->busquedad;
$id_departamento1 = $datos->departamento1;


$error = false;
if(!empty($busquedad) && !descripcion($busquedad))
	$error = true;
elseif(!empty($id_departamento1) && !entero($id_departamento1))
	$error = true;


if(!$error)
{

	if($id_departamento1 == null)
		$id_departamento1 = 'is null';
	else 
		$id_departamento1 = '='.$id_departamento1;


	$sql = "SELECT * FROM producto WHERE estatus != 'i' 
			AND (codigo LIKE '%$busquedad%' OR nombre LIKE '%$busquedad%' OR descripcion LIKE '%$busquedad%') 
			AND id_departamento1 $id_departamento1 
			ORDER BY estatus LIMIT 15";



	$marcaTiempo = time();

	$cons = $conex->query($sql);
	$i = 0;
	while($res = $cons->fetch_array())
	{
		array_push($res, 'foto', false); // Añade elemento foto al array
		$sql = "SELECT * FROM producto_foto WHERE id_producto=$res[id_producto]";
		$cons2 = $conex->query($sql);
		if($res2 = $cons2->fetch_array())
			$res['foto'] = true; // Verifica si el producto contiene foto

		$vec[$i] = $res;
		$vec[$i]['marcaTiempo'] = $marcaTiempo;
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