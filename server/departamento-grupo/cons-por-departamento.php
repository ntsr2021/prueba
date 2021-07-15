<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_departamento_grupo = $_GET['id'];

$error = false;
if(!entero($id_departamento_grupo))
	$error = true;

if(!$error)
{
	$sql = "SELECT * FROM departamento_grupo WHERE id_departamento_grupo=$id_departamento_grupo ORDER BY nombre";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();

	header('Content-Type: application/json');
	echo json_encode($res); 
}



?>