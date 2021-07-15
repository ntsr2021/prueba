<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';
require '../validacion.php';


// Desencriptar codigo

function desencriptarCodigo($codigoEncriptado)
{
	$key = 'djnfd..$';

	$codigoEncriptado = explode('.', $codigoEncriptado);


	$sigRecibida = base64_decode(str_replace(['-', '_', ''], ['+', '/', '='], $codigoEncriptado[2]));
	$sigVerificar = hash_hmac('sha256', $codigoEncriptado[0].'.'.$codigoEncriptado[1], $key, true);

	$codigo = null;
	if($sigRecibida == $sigVerificar)
	{
		$header = json_decode(base64_decode(str_replace(['-', '_', ''], ['+', '/', '='], $codigoEncriptado[0])));
		$payload = json_decode(base64_decode(str_replace(['-', '_', ''], ['+', '/', '='], $codigoEncriptado[1])));


		$codigo = $payload->data->codigo; 
	}

	return $codigo;
}



$json = file_get_contents('php://input');
$datos = json_decode($json);

$nombre = $datos->nombre;
$apellido = $datos->apellido;
$telefono = $datos->telefono;
$correo = $datos->correo;
$contrasena = $datos->contrasena;
$cod_enviado = desencriptarCodigo($datos->cod_enviado);
$cod_ingresado = $datos->cod_ingresado;

$mens = '';


$error = false;
if(!alfanumerico($nombre) || strlen($nombre) > 40)
	$error = true;
elseif(!alfanumerico($apellido) || strlen($apellido) > 40)
	$error = true;
elseif(!telefono($telefono))
	$error = true;
elseif(!correo($correo))
	$error = true;
elseif(!descripcion($contrasena))
	$error = true;

if(!$error)
{
	if($cod_enviado == $cod_ingresado)
	{

		// Encriptar password
		$password_hash = password_hash($contrasena, PASSWORD_DEFAULT, [2]);


		// Registrar cliente y usuario
		$sql = "INSERT INTO user (id_user, username, password, rol) VALUES (default, '$correo', '$password_hash', 'c')";
		$conex->query($sql);

		$sql = "SELECT id_user FROM user ORDER BY id_user DESC LIMIT 1";
		$cons = $conex->query($sql);
		$res = $cons->fetch_array();
		$id_user = $res['id_user'];

		$sql = "INSERT INTO cliente (id_cliente, nombre, apellido, telefono, id_user) VALUES 
									(default, '$nombre', '$apellido', '$telefono', $id_user)";
		$conex->query($sql);



		// REGISTRAR NOTIFICACION

		// Eliminar la notificacion mas vieja si la cantidad de estas es igual a 6
		// $sql = "SELECT COUNT(*) AS cantidad FROM notificacion";
		// $cons = $conex->query($sql);
		// $res = $cons->fetch_array();
		// $canNotificacion = (int)$res['cantidad'];

		// if($canNotificacion == 15)
		// {
		// 	$sql = "DELETE FROM notificacion LIMIT 1";
		// 	$conex->query($sql);
		// }


		// Registrar
		// $id_notificacion = 'default';
		// $estatus = 'n';
		// $tipo = 'registro';
		// $redirect_to = 'usuario';
		// $accion = 'se ha registrado';
		// $fecha = 'CURDATE()';
		// $hora = 'CURTIME()';

		// $sql = "INSERT INTO notificacion (id_notificacion, estatus, tipo, redirect_to, accion, fecha, hora, id_user) 
		// 						  VALUES ($id_notificacion, '$estatus', '$tipo', '$redirect_to', '$accion', $fecha, $hora, $id_user)";
		// $conex->query($sql);


		// Codificar token
		$user = ['id_user' => $id_user, 'rol' => 'c', 'password' => $contrasena];
		$token = codificarToken($user);


		$mens = $token;	

	}else 	 
		$mens = 'codigo';
	


	class Resp {}

	$resp = new Resp();
	$resp->mens = $mens;

	header('Content-Type: application/json');
	echo json_encode($resp); 
}

?>