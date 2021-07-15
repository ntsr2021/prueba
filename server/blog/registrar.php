<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);


$nombre_img = $datos->nombre_img;
$base64_img = $datos->base64_img;
$titulo = $datos->titulo;
$etiquetas = $datos->etiquetas;
$descripcion = $datos->descripcion;
$contenido = $datos->contenido;
$fecha = 'NOW()';
$id_articulo_blog = 'default';


$error = false;


if(!descripcion($titulo))
	$error = true;
if(!descripcion($etiquetas))
	$error = true;
elseif(!descripcion($descripcion))
	$error = true;



if(!$error)
{

	// Subir img principal
	$archivo = base64_decode($base64_img);
	$path = $path_proy.'assets/img/blog/'.$nombre_img.'.jpg';
	file_put_contents($path, $archivo);


	// Guardar articulo
	$sql = "INSERT INTO articulo_blog (id_articulo_blog, img, titulo, etiquetas, descripcion, contenido, fecha) VALUES 
								($id_articulo_blog, '$nombre_img', '$titulo', '$etiquetas', '$descripcion', '$contenido', $fecha)";
	$conex->query($sql);


	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>