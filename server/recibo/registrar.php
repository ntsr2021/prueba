<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';
require '../validacion.php';

require '../conexion.php';
require '../notificacion-administracion/notificacion-administracion.php';
require 'recibo.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);


$notificacion = new NotificacionAdministracion();
$recibo = new Recibo();


// User
$user = decodificarToken($datos->token);
$id_user = $user->id_user;
$rol = $user->rol;

// $productos = json_decode($datos->productos);


// Obtener productos del carro de compra
$sql = "SELECT * FROM carro_compra WHERE id_user=$id_user";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$id_carro_compra = $res['id_carro_compra'];

$sql = "SELECT * FROM carro_compra_producto WHERE id_carro_compra=$id_carro_compra";
$cons = $conex->query($sql);
while($res = $cons->fetch_array())
	$productos[] = $res;


// Eliminar carro de compra
$sql = "DELETE FROM carro_compra_producto WHERE id_carro_compra=$id_carro_compra";
$conex->query($sql);

$sql = "DELETE FROM carro_compra WHERE id_user=$id_user";
$conex->query($sql);



$tipo = $datos->metodo_entrega->metodo;
$punto_entrega = $datos->metodo_entrega->punto . ': ' . $datos->metodo_entrega->dir_punto;

$forma_pago = $datos->pago->forma_pago;
$nombre_titular = $datos->pago->nombre_titular;
$tipo_doc_titular = $datos->pago->tipo_doc_titular;
$doc_titular = $datos->pago->doc_titular;
$referencia = $datos->pago->referencia;
$monto = $datos->pago->monto;
$descripcion_billete = $datos->pago->descripcion_billete;


if(isset($datos->pago2))
{
	$forma_pago2 = $datos->pago2->forma_pago;
	$nombre_titular2 = $datos->pago2->nombre_titular;
	$tipo_doc_titular2 = $datos->pago2->tipo_doc_titular;
	$doc_titular2 = $datos->pago2->doc_titular;
	$referencia2 = $datos->pago2->referencia;
	$monto2 = $datos->pago2->monto;
	$descripcion_billete2 = $datos->pago2->descripcion_billete;
}


// Validar datos
$error = false;


if(!isset($productos)) // Impide registrar varias veces una misma compra
	$error = true;

if(!entero($id_user))
	$error = true;
elseif(!descripcion($tipo))
	$error = true;
elseif(!empty($id_punto_entrega) && !entero($id_punto_entrega))
	$error = true;


// Validacion del primer metodo de pago
if(!descripcion($forma_pago))
	$error = true;
elseif(!empty($nombre_titular) && (!texto($nombre_titular) || strlen($nombre_titular) > 100))
	$error = true;
elseif(!empty($tipo_doc_titular) && (!texto($tipo_doc_titular) || strlen($tipo_doc_titular) > 1))
	$error = true;
elseif(!empty($doc_titular) && !doc($doc_titular))
	$error = true;
elseif(!empty($referencia) && !descripcion($referencia))
	$error = true;
elseif(!decimal($monto))
	$error = true;
elseif(!descripcion($descripcion_billete) && !empty($descripcion_billete))
	$error = true;


// Validacion del segundo metodo de pago
if(isset($datos->pago2))
{
	if(!descripcion($forma_pago2))
		$error = true;
	elseif(!empty($nombre_titular2) && (!texto($nombre_titular2) || strlen($nombre_titular2) > 100))
		$error = true;
	elseif(!empty($tipo_doc_titular2) && (!texto($tipo_doc_titular2) || strlen($tipo_doc_titular2) > 1))
		$error = true;
	elseif(!empty($doc_titular2) && !doc($doc_titular2))
		$error = true;
	elseif(!empty($referencia2) && !descripcion($referencia2))
		$error = true;
	elseif(!decimal($monto2))
		$error = true;
	elseif(!descripcion($descripcion_billete2) && !empty($descripcion_billete2))
		$error = true;
}



if(!$error)
{


	// RESTAR SALDO DE LA GIFT CARD
	$codigo_gift_card = '';
	if($forma_pago == 'gift_card')
		$codigo_gift_card = $referencia;
	elseif(isset($forma_pago2) && $forma_pago2 == 'gift_card')
		$codigo_gift_card = $referencia2;


	if($codigo_gift_card != '')
	{
		$monto_restar = 0;

		if($forma_pago == 'gift_card')
			$monto_restar = $monto;
		else
			$monto_restar = $monto2;


		$sql = "UPDATE gift_card SET saldo=saldo-$monto_restar WHERE codigo='$codigo_gift_card'";
		$conex->query($sql);
	}
	


	// Consultar tasa dolar
	$sql = "SELECT valor FROM dolar";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	$tasa_dolar = $res['valor'];


	// Insertar en recibo


	$id_recibo = 'default';
	$fecha = 'CURDATE()';
	$hora = 'CURTIME()';
	$estatus = 'p';

	$sql = "INSERT INTO recibo (id_recibo, fecha, hora, tasa_dolar, estatus, id_user) VALUES 
															($id_recibo, $fecha, $hora, $tasa_dolar, '$estatus', $id_user)";
	$conex->query($sql);

	// Consultar id_recibo del ultimo recibo 
	$sql = "SELECT id_recibo FROM recibo ORDER BY id_recibo DESC LIMIT 1";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	$id_recibo = $res['id_recibo'];

	/////////////////////////////



	// Insertar en recibo_producto
	$recibo->registrarProductos($productos, $id_recibo);



	// Insertar en recibo_entrega 

	$id_recibo_entrega = 'default';

	$sql = "INSERT INTO recibo_entrega (id_recibo_entrega, tipo, punto_entrega, id_recibo) 
															VALUES ($id_recibo_entrega, '$tipo', '$punto_entrega', $id_recibo)";
	$conex->query($sql);
	/////////////////////////////



	// Insertar en recibo_pago
	$id_recibo_pago = 'default';

	$sql = "INSERT INTO recibo_pago (id_recibo_pago, forma_pago, nombre_titular, tipo_doc_titular, doc_titular, referencia, monto, descripcion_billete, id_recibo) 
					VALUES ($id_recibo_pago, '$forma_pago', '$nombre_titular', '$tipo_doc_titular', '$doc_titular', '$referencia', $monto, '$descripcion_billete', $id_recibo)";
	$conex->query($sql);


	// Si existe un segundo metodo de pago se debe insertar
	if(isset($datos->pago2))
	{
		$id_recibo_pago2 = 'default';

		$sql = "INSERT INTO recibo_pago (id_recibo_pago, forma_pago, nombre_titular, tipo_doc_titular, doc_titular, referencia, monto, descripcion_billete, id_recibo) 
						VALUES ($id_recibo_pago2, '$forma_pago2', '$nombre_titular2', '$tipo_doc_titular2', '$doc_titular2', '$referencia2', $monto2, '$descripcion_billete2', $id_recibo)";
		$conex->query($sql);
	}

	/////////////////////////////



	// Registrar notificacion para vendedor, supervisor y admin.

	$tipo = 'pedido';
	$redirect_to = 'recibo/consulta/'.$id_recibo.'/'.$id_user;
	$accion = 'ha realizado un pedido';


	$sql = "SELECT id_user FROM user WHERE rol='a' || rol='s'";
	$cons = $conex->query($sql);
	while($res = $cons->fetch_array())
		$notificacion->registrar($tipo, $redirect_to, $accion, $id_user, $res['id_user']);



	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';


	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>