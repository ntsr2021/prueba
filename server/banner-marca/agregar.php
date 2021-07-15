<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);


$id_banner_marca = 'default';
$id_departamento1 = $datos->departamento1;
$id_departamento2 = $datos->departamento2;
$id_departamento3 = $datos->departamento3;


$error = false;

if(empty($id_departamento1) || !entero($id_departamento1))
	$error = true;
elseif(!empty($id_departamento2) && !entero($id_departamento2))
	$error = true;
elseif(!empty($id_departamento3) && !entero($id_departamento3))
	$error = true;


if(!$error)
{
	// Setear id_departamentos a null para evitar error en el query
	if($id_departamento1 == null)
		$id_departamento1 = 'null';
	if($id_departamento2 == null)
		$id_departamento2 = 'null';
	if($id_departamento3 == null)
		$id_departamento3 = 'null';


	$foto = $datos->foto->nombre; 
	$base64 = base64_decode($datos->foto->base64);

	$path = $path_proy.'assets/img/banner/marca/';


	// Subir archivo
	$pathCompleto = $path.$foto;
	file_put_contents($pathCompleto, $base64);


	// Consultar la ultima posicion 
	$sql = "SELECT posicion FROM banner_marca ORDER BY posicion DESC LIMIT 1";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	$posicion = ((int)$res['posicion'])+1;


	$sql = "INSERT INTO banner_marca (id_banner_marca, foto, id_departamento1, id_departamento2, id_departamento3, posicion) VALUES ($id_banner_marca, '$foto', $id_departamento1, $id_departamento2, $id_departamento3, $posicion)";
	$conex->query($sql);



	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>
