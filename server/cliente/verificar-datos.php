<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';
require '../validacion.php';
require '../correo/correo.php';


// funcion para encriptar codigo aleatorio
function encriptarCodigo($codigo) 
{
	$key = 'djnfd..$';
	
	$header = array('typ' => 'JWT', 'alg' => 'HS256');
	$header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($header)));


	$payload = array(
    'iat' => time(),
    'exp' => time() + (60*60*24*7), // Tiempo de expiracion una semana
    'data' => [ 
      'codigo' => $codigo
    ]
	);
	$payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));


	$signature = hash_hmac('sha256', $header.'.'.$payload, $key, true); 
	$signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
	

	$codigoEncriptado = $header.'.'.$payload.'.'.$signature;

	return $codigoEncriptado;
}



$json = file_get_contents('php://input');
$datos = json_decode($json);

$telefono = $datos->telefono;
$correo = $datos->correo;

$error = false;
if(!telefono($telefono))
	$error = true;
if(!correo($correo))
	$error = true;


if(!$error)
{
	$mens = '';


	// Comprobar si la cedula, correo o el telefono estan repetidos
	$cons = $conex->query("SELECT username FROM user WHERE username = '$correo'");
	$cons2 = $conex->query("SELECT telefono FROM cliente WHERE telefono = '$telefono'");
	if($cons->fetch_array())
		$mens = 'correo_repetido';
	elseif($cons2->fetch_array())
		$mens = 'telefono';

	else
	{
		$codigo = generarCodigo(6);


		try 
		{
	    // Destinatarios
	    $mail->addAddress($correo);  // Email y nombre del destinatario

	    $mail->Subject = 'Verificación de correo electrónico';

	    $ruta = 'https://www.ntsstore.com/assets/img/logo1.png';

	    $mail->Body = '<div style="text-align: center">
	    					<img src="'.$ruta.'" style="width: 290px;height: 161px">
	    				</div>';

	    $mail->Body  .= '<h3 style="font-weight: normal !important;text-align: center">¡Saludos! para completar el proceso de registro en nuestra Tienda Online, ingrese por favor el siguiente código.</h3>';
	    $mail->Body  .= '<h2 style="text-align: center;font-weight: normal !important">Código de verificación: <b>'.$codigo.'</b>.</h3>';

	    // Contenido del correo en texto plano para los clientes de correo que no soportan HTML
	    $mail->AltBody = "¡Saludos! para completar el proceso de registro en nuestra Tienda Online, ingresé por favor el siguiente codigo. \r\n";
	    $mail->AltBody .= "Codigo de verificación: ".$codigo."\r\n";


	    $mail->send();
	    
	    $mens = encriptarCodigo($codigo); // ENCRIPTACION DE CODIGO

		} catch (Exception $e) {
		    $mens = 'envio';
		}

		////////////////////////////
	}



	class Resp {}
	$resp = new Resp();
	$resp->mens = $mens;

	header('Content-Type: application/json');
	echo json_encode($resp); 
}



	
?>


