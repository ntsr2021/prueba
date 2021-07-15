<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$id_banner_principal = 'default';
$foto = $datos->foto; 
$base64 = base64_decode($datos->base64);

$path = $path_proy.'assets/img/banner/principal/';


// Subir archivo
$pathCompleto = $path.$foto;
file_put_contents($pathCompleto, $base64);


// Consultar la ultima posicion 
$sql = "SELECT posicion FROM banner_principal ORDER BY posicion DESC LIMIT 1";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$posicion = ((int)$res['posicion'])+1;


$sql = "INSERT INTO banner_principal (id_banner_principal, foto, posicion) VALUES ($id_banner_principal, '$foto', $posicion)";
$conex->query($sql);



class Resp {}

$resp = new Resp();
$resp->mens = 'OK';

header('Content-Type: application/json');
echo json_encode($resp); 


?>