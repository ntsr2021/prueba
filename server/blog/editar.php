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
$id_articulo_blog = $datos->id_articulo_blog;


$error = false;


if(!descripcion($titulo))
	$error = true;
elseif(!descripcion($etiquetas))
	$error = true;
elseif(!descripcion($descripcion))
	$error = true;


if(!$error)
{


	if($base64_img != null)
	{
		// Subir img principal
		$archivo = base64_decode($base64_img);
		$path = $path_proy.'assets/img/blog/'.$nombre_img.'.jpg';
		file_put_contents($path, $archivo);
	}


	// Guardar articulo
	$sql = "UPDATE articulo_blog SET img='$nombre_img', titulo='$titulo', etiquetas='$etiquetas', descripcion='$descripcion', contenido='$contenido'
					WHERE id_articulo_blog=$id_articulo_blog";
	$conex->query($sql);



	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>