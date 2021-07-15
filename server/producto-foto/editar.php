<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   
$id_producto_foto = $datos->id_producto;
$nombre = $datos->nombre;
$archivo = base64_decode($datos->base64);
$path = $path_proy.'assets\img\producto/';


$error = false;

if(!entero($id_producto_foto))
	$error = true;

if(!$error)
{
	$pathCompleto = $path.$nombre.'.jpg';
	file_put_contents($pathCompleto, $archivo);


	// Guardar en Base de datos

	$sql = "INSERT INTO producto_foto (id_producto_foto, foto, id_producto) VALUES (default, '$nombre', $id_producto)";
	$conex->query($sql);

	//////////

	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>