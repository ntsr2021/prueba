<?php  

// Correo electronico
// Mostrar errores PHP (Desactivar en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir la libreria PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


// Envio de correo 
$mail = new PHPMailer(true);


// Configuracion SMTP
/*$mail->SMTPDebug = SMTP::DEBUG_SERVER;                         // Mostrar salida (Desactivar en producción) */

$mail->CharSet = "utf-8";										// Codificacion de caracteres

$mail->isSMTP();                                               // Activar envio SMTP
$mail->Host  = 'mail.ntsstore.com';                     // Servidor SMTP
$mail->SMTPAuth  = true;                                       // Identificacion SMTP
$mail->Username  = 'ntsonline@ntsstore.com';                  // Usuario SMTP
$mail->Password  = '$cor_5tore#';	          // Contraseña SMTP 
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port  = 587;
$mail->setFrom('ntsonline@ntsstore.com', 'NTS Online');                // Remitente del correo
$mail->isHTML(true); 

?>