<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_departamento = $_GET['id'];


// Validacion
$error = false;
if(!entero($id_departamento))
	$error = true;


if(!$error) // No hay error
{


	// Consultar orden y id_grupo_pertenece del departamento
	$sql = "SELECT orden, id_grupo_pertenece FROM departamento WHERE id_departamento=$id_departamento";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	$orden = (int)$res['orden'];
	$id_grupo_pertenece = $res['id_grupo_pertenece'];


	// Verificar si es posible subir mas el departamento
	$sql = "SELECT * FROM departamento WHERE orden=($orden+1) AND id_grupo_pertenece=$id_grupo_pertenece";
	$cons = $conex->query($sql);


	if($cons->fetch_array()) // Si es posible subir el departamento
	{
		// Bajar el departamento que esta arriba
		$sql = "UPDATE departamento SET orden=($orden) WHERE orden=($orden+1)";
		$conex->query($sql);

		// Subir departamento seleccionado
		$sql = "UPDATE departamento SET orden=($orden+1) WHERE id_departamento=$id_departamento";
		$conex->query($sql);


		$mens = 'OK';
	}else 
		$mens = 'ERROR';



	// Mensaje de retorno
	class Resp {}

	$resp = new Resp();
	$resp->mens = $mens;

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>