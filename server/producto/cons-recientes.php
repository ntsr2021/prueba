<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$limit1 = $_GET['limit1'];


$error = false;
if(!entero($limit1))
	$error = true;



if(!$error)
{
	$limit2 = 16;
	$marcaTiempo = time();


	$sql = "SELECT *, 

	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento1) AS cat1,
	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento2) AS cat2

	FROM producto WHERE 

	((estatus = 'a' || estatus = 'd') AND descripcion != '' AND cantidad > 0) ORDER BY id_producto DESC LIMIT $limit1, $limit2";



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