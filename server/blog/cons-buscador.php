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
$limConsulta = 9;


// Validar campos
$error = false;

if(!entero($consInicial))
	$error = true;



if(!$error)
{
	$marcaTiempo = time();

	$sql = "SELECT * FROM articulo_blog 
		WHERE 
		(etiquetas LIKE '%$busquedad%' OR titulo LIKE '%$busquedad%' OR descripcion LIKE '%$busquedad%') 
		ORDER BY id_articulo_blog DESC LIMIT $consInicial, $limConsulta";


	$i = 0;
	$cons = $conex->query($sql);
	while($res = $cons->fetch_array())
	{
		$vec[$i] = $res;
		$vec[$i]['marcaTiempo'] = $marcaTiempo;

		++$i;
	}




	header('Content-Type: application/json');
	if(isset($vec))
		echo json_encode($vec); 
	else
		echo json_encode(null);
}



?>