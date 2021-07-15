<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';
require '../conexion.php';
require '../notificacion-administracion/notificacion-administracion.php';

$notificacionAdministracion = new NotificacionAdministracion();


$json = file_get_contents('php://input');
$datos = json_decode($json);


$id_articulo_blog_coment = 'default';
$comentario = $datos->comentario;
$fecha = 'NOW()';
$id_user = $datos->id_user;

$id_coment_receptor = $datos->id_coment_receptor;
if($id_coment_receptor == null)
	$id_coment_receptor = 'null';

$id_articulo_blog = $datos->id_articulo_blog;


$error = false;

if(!descripcion($comentario))
	$error = true;
elseif(!entero($id_user))
	$error = true;
elseif(!entero($id_coment_receptor))
	$error = true;
elseif(!entero($id_articulo_blog))
	$error = true;


if(!$error)
{

	// NOTA: Corregir segun el rol del usuario
	$estatus = '';
	if($id_user == 1)
		$estatus = 'v';
	else
	{
		$estatus = 'nv';

		$tipo = 'comentario_blog';
		$redirect_to = 'blog/comentarios/'.$id_articulo_blog;
		$accion = 'ha realizado un comentario';
		$id_user_emisor = $id_user;
		$id_user_receptor = 1; // Id del admin


		$notificacionAdministracion->registrar($tipo, $redirect_to, $accion, $id_user_emisor, $id_user_receptor);
	}


	// Guardar comentario

	$sql = "INSERT INTO articulo_blog_coment 
					(id_articulo_blog_coment, estatus, comentario, fecha, id_user, id_coment_receptor, id_articulo_blog) 															
	 VALUES ($id_articulo_blog_coment, '$estatus', '$comentario', $fecha, $id_user, $id_coment_receptor, $id_articulo_blog)";
	$conex->query($sql);


	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>