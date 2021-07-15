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


	$sql = "SELECT *, p.codigo AS codigo, p.nombre AS nombre, p.cantidad AS cantidad, p.precio AS precio, SUM(rp.cantidad) AS total,

	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento1) AS cat1,
	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento2) AS cat2

	FROM producto AS p JOIN recibo_producto AS rp ON p.codigo=rp.codigo WHERE 

	((p.estatus = 'a' || p.estatus = 'd') AND p.descripcion != '' AND p.cantidad > 0) 

	GROUP BY p.codigo

	ORDER BY total DESC LIMIT $limit1, $limit2";



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



