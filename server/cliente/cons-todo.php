<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$busquedad = $_GET['busquedad'];


$error = false;
if(!descripcion($busquedad))
	$error = true;


if(!$error)
{
	$sql = "SELECT *, u.username AS correo FROM cliente AS c JOIN user AS u ON c.id_user=u.id_user 
			
			WHERE (nombre LIKE '%$busquedad%' OR apellido LIKE '%$busquedad%' OR doc LIKE '%$busquedad%' OR u.username LIKE '%$busquedad%')

			ORDER BY c.id_cliente DESC LIMIT 15";

	$cons = $conex->query($sql);
	while ($res=$cons->fetch_array()) 
		$vec[] = $res;

	header('Content-Type: application/json');

	if(isset($vec))
		echo json_encode($vec); 
	else
		echo json_encode(null);
}



?>