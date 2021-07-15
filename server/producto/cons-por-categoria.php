<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);


$id_departamento1 = $datos->id_departamento1;
$id_departamento2 = $datos->id_departamento2;
$id_departamento3 = $datos->id_departamento3;
$limit1 = $datos->limit1;

$sql_id_departamento2 = null;
$sql_id_departamento3 = null;


$error = false;

if(!entero($id_departamento1))
	$error = true;
elseif(!empty($datos->id_departamento2) && !entero($datos->id_departamento2))
	$error = true;
elseif(!empty($datos->id_departamento3) && !entero($datos->id_departamento3))
	$error = true;
elseif(!entero($limit1))
	$error = true;



if(!$error)
{
	$limit2 = 16;
	$marcaTiempo = time();


	// Solo se deben usar los id de departamento 2 y 3 si estos son != null
	if($id_departamento2 != null)
		$sql_id_departamento2 = 'AND id_departamento2 = '.$id_departamento2;
	if($id_departamento3 != null)
		$sql_id_departamento3 = 'AND id_departamento3 = '.$id_departamento3;


	$sql = "SELECT *, 

	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento1) AS cat1,
	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento2) AS cat2

	FROM producto WHERE 

	((estatus = 'a' || estatus = 'd') AND descripcion != '' AND cantidad > 0) AND 
	id_departamento1 = $id_departamento1  $sql_id_departamento2  $sql_id_departamento3
	ORDER BY id_producto DESC LIMIT $limit1, $limit2";



	// Añadir marca de tiempo y pasar precio a float
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