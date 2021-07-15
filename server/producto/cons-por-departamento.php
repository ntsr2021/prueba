<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';



$limit1 = $_GET['limit1'];
$limit2 = 5;


// Consultar id del primer grupo
$sql = "SELECT id_departamento_grupo FROM departamento_grupo LIMIT 1";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$id_departamento_grupo = $res['id_departamento_grupo'];


// Consultar departamentos
$sql = "SELECT nombre, id_departamento FROM departamento WHERE id_grupo_pertenece=$id_departamento_grupo ORDER BY orden ASC LIMIT $limit1, $limit2";
$cons = $conex->query($sql);


$i = 0;
$j = 0;
$marcaTiempo = time();


while($res = $cons->fetch_array())
{
	$vec[$i]['nombre'] = $res['nombre'];
	$vec[$i]['id_departamento'] = $res['id_departamento'];

	$id_departamento = $res['id_departamento'];


	$sql = "SELECT *,

		(SELECT nombre FROM departamento WHERE id_departamento=id_departamento1) AS cat1,
		(SELECT nombre FROM departamento WHERE id_departamento=id_departamento2) AS cat2

	 FROM producto 
		WHERE 
		id_departamento1 = $id_departamento AND
		((estatus = 'a' || estatus='d') AND descripcion != '' AND cantidad > 0) ORDER BY id_producto DESC LIMIT 4";
	$cons2 = $conex->query($sql);


	$j = 0;
	while($res2 = $cons2->fetch_array())
	{	
		$vec[$i]['productos'][$j] = $res2;
		$vec[$i]['productos'][$j]['marcaTiempo'] = $marcaTiempo;
		$vec[$i]['productos'][$j]['precio'] = (float)$vec[$i]['productos'][$j]['precio'];

		++$j;
	}


	++$i;
}



header('Content-Type: application/json');
if(isset($vec))
	echo json_encode($vec); 
else
	echo json_encode(null);


?>