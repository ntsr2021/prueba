<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';
require '../validacion.php';
require '../correo/correo.php';



$json = file_get_contents('php://input');
$datos = json_decode($json);

$correo = $datos;
$mens = '';


$error = false;
if(!correo($correo))
	$error = true;


function generarClave()
{
	$key = '';
	$pattern1 = '1234567890'; // Numeros
	$pattern2 = 'ahgy'; // Letras min
	$pattern3 = 'ZXYJ'; // Letras may
	$pattern4 = '.,_*'; // caracteres especiales


	$longitud = 4;
	$max = strlen($pattern1)-1;
	for($i=0;$i<$longitud;$i++)
		$key .= $pattern1{mt_rand(0,$max)};

	$longitud = 2;
	$max = strlen($pattern2)-1;
	for($i=0;$i<$longitud;$i++)
		$key .= $pattern2{mt_rand(0,$max)};

	$longitud = 1;
	$max = strlen($pattern3)-1;
	for($i=0;$i<$longitud;$i++)
		$key .= $pattern3{mt_rand(0,$max)};

	$longitud = 1;
	$max = strlen($pattern4)-1;
	for($i=0;$i<$longitud;$i++)
		$key .= $pattern4{mt_rand(0,$max)};


	return $key;
}



if(!$error)	
{
	$sql = "SELECT username FROM user WHERE username='$correo'";
	$cons = $conex->query($sql);
	if($cons->fetch_array())
	{
		$nue_contrasena = generarClave();

		// Cambiar contraseña

		$password_hash = password_hash($nue_contrasena, PASSWORD_DEFAULT, [2]);

		$sql = "UPDATE user SET password='$password_hash' WHERE username='$correo'";
		$conex->query($sql);




		try {
		    // Destinatarios
		    $mail->addAddress($correo);  // Email y nombre del destinatario

		    $mail->Subject = 'Recuperación de contraseña';


		    $ruta = 'https://www.ntsstore.com/assets/img/logo1.png';

		    $mail->Body = '<div style="text-align: center">
		    					<img src="'.$ruta.'" style="width: 290px;height: 161px">
		    				</div>';

		    $mail->Body  .= '<h3 style="font-weight: normal !important;text-align: center">¡Saludos! su nueva contraseña es: <b>'.$nue_contrasena.'</b></h3>';
		    $mail->Body  .= '<h3 style="text-align: center;font-weight: normal !important">Si desea cambiarla puede hacerlo accediendo a la sesión "Mis datos" de su cuenta de usuario.</h3>';

		    // Contenido del correo en texto plano para los clientes de correo que no soportan HTML
		    $mail->AltBody = "¡Saludos! su nueva contraseña es: ".$nue_contrasena.".\r\n";
		    $mail->AltBody .= "Si desea cambiarla puede hacerlo accediendo a la sesión \"Mis datos\" de su cuenta de usuario."."\r\n";


		    $mail->send();
		    $mens = 'OK';
		} catch (Exception $e) {
		    $mens = 'envio';
		}

	}else
		$mens = 'correo';


	class Resp {}

	$resp = new Resp();
	$resp->mens = $mens;

	header('Content-Type: application/json');
	echo json_encode($resp); 
}

	
?>