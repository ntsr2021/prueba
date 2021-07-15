<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$id_departamento = 'default';
$nombre = $datos->nombre;
$id_grupo_pertenece = $datos->id_grupo_pertenece;


$error = false;
if(!descripcion($nombre))
	$error = true;
elseif(empty($id_grupo_pertenece) || !entero($id_grupo_pertenece))
	$error = true;

if(!$error)
{


	// Consultar ultimo orden del grupo al que pertecera el departamento
	$sql = "SELECT orden FROM departamento WHERE id_grupo_pertenece=$id_grupo_pertenece ORDER BY orden DESC LIMIT 1";
	$cons = $conex->query($sql);

	if($res = $cons->fetch_array())
	{
		$ultimo_orden = (int)$res['orden'];
		$orden = $ultimo_orden + 1;
	}else 
		$orden = 1;
	
	
	// Guardar departamento
	$sql = "INSERT INTO departamento (id_departamento, nombre, id_grupo_pertenece, orden) 
							VALUES ($id_departamento, '$nombre', $id_grupo_pertenece, $orden)";
	$conex->query($sql);



	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>