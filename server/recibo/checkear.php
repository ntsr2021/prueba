<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

require '../conexion.php';
require '../notificacion-administracion/notificacion-administracion.php';
require '../notificacion-cliente/notificacion-cliente.php';

$notificacionAdministracion = new NotificacionAdministracion();
$notificacionCliente = new NotificacionCliente();


$id_recibo = $_GET['id'];

$error = false;
if(!entero($id_recibo))
	$error = true;

if(!$error)
{
	// Obtener datos del recibo
	$sql = "SELECT *, CONCAT('R-', LPAD(id_recibo, 4, '0')) AS codigo FROM recibo WHERE id_recibo=$id_recibo";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();

	$id_user = $res['id_user'];
	$codigo_recibo = $res['codigo'];


	// Checkear recibo como aprobado
	$sql = "UPDATE recibo SET estatus='a' WHERE id_recibo=$id_recibo";
	$conex->query($sql);



	// Registrar notificacion para el cliente

	$tipo = 'pedido_aprobado';
	$redirect_to = './';
	$accion = 'Su pedido '.$codigo_recibo.' ha sido aprobado';

	$notificacionCliente->registrar($tipo, $redirect_to, $accion, $id_user);



	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>

