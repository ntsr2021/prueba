<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$nombre_img = $datos->nombre;
$archivo = base64_decode($datos->base64);
$path = $path_proy.'assets/img/blog/';


// Subir
file_put_contents($path.$nombre_img, $archivo);



class Resp {}
$resp = new Resp();
$resp->mens = 'OK';
$resp->nombre_img = $nombre_img;

header('Content-Type: application/json');
echo json_encode($resp); 


?>