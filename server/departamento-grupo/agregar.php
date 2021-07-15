<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$id_departamento_grupo = 'default';
$nombre = $datos->nombre;
$id_departamento = $datos->id_departamento;


$error = false;
if(!entero($id_departamento_grupo))
	$error = true;
elseif(!descripcion($nombre))
	$error = true;
elseif(!entero($id_departamento))
	$error = true;

if(!$error)
{
	// Guardar grupo
	$sql = "INSERT INTO departamento_grupo (id_departamento_grupo, nombre) VALUES ($id_departamento_grupo, '$nombre')";
	$conex->query($sql);

	// Consultar id del ultimo grupo agregado
	$sql = "SELECT * FROM departamento_grupo ORDER BY id_departamento_grupo DESC LIMIT 1";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	$grupo = $res;

	// Añadir id del grupo al departamento vinculado
	$sql = "UPDATE departamento SET id_grupo_apunta=$grupo[id_departamento_grupo] WHERE id_departamento=$id_departamento";
	$conex->query($sql);


	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';
	$resp->grupo = $grupo;

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>