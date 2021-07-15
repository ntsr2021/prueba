<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_producto = $_GET['id'];


$error = false;
if(!entero($id_producto))
	$error = true;


if(!$error)
{

	// Consultar categoria a la que pertenece el producto
	$sql = "SELECT * FROM producto WHERE id_producto=$id_producto";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();

	$id_departamento1 = $res['id_departamento1'];

	$sql_id_departamento2 = '';
	if($res['id_departamento2'] != null)
		$sql_id_departamento2 = 'AND id_departamento2='.$res['id_departamento2'];

	$sql_id_departamento3 = '';
	if($res['id_departamento3'] != null)
		$sql_id_departamento3 = 'AND id_departamento3='.$res['id_departamento3'];
		





	$marcaTiempo = time();


	$sql = "SELECT *, 

	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento1) AS cat1,
	(SELECT nombre FROM departamento WHERE id_departamento=id_departamento2) AS cat2

	FROM producto WHERE 

	((estatus = 'a' || estatus = 'd') AND descripcion != '' AND cantidad > 0)
	AND (id_departamento1=$id_departamento1 $sql_id_departamento2 $sql_id_departamento3) 
	AND id_producto != $id_producto
	ORDER BY id_producto DESC LIMIT 8";




	$itemSlide = array();


	$i = 0;
	$j = 0;

	$cons = $conex->query($sql);
	while($res = $cons->fetch_assoc())
	{
		$itemSlide[$i]['productos'][$j] = $res;



		$itemSlide[$i]['productos'][$j]['marcaTiempo'] = $marcaTiempo;
		$itemSlide[$i]['productos'][$j]['precio'] = (float)$itemSlide[$i]['productos'][$j]['precio'];


	
		++$j;

		if($j == 4)
		{
			++$i;
			$j = 0;
		}
	}




	header('Content-Type: application/json');
	if(isset($itemSlide))
		echo json_encode($itemSlide); 
	else
		echo json_encode(null);
}



?>