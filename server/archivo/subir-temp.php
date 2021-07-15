<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
    
$nombre = $datos->nombre;
$archivo = base64_decode($datos->base64);

$path = $path_proy.'assets/img/temp/';


// Eliminar archivos de la carpeta temp
$files = glob($path.'*');
foreach($files as $f) 
{
	if(is_file($f)) 
		unlink($f);
}
//////////////////


$pathCompleto = $path.$nombre;
file_put_contents($pathCompleto, $archivo);


class Resp {}
$resp = new Resp();
$resp->mens = 'OK';

header('Content-Type: application/json');
echo json_encode($resp); 


?>