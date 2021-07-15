<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   

$id_banner_principal = $datos->id_banner;

$error = false;

if(empty($id_banner_principal) || !entero($id_banner_principal)) 
	$error = true;


if(!$error)
{
	$foto = $datos->foto; 
	$base64 = base64_decode($datos->base64);

	$path = $path_proy.'assets/img/banner/principal/';



	// Eliminar banner anterior
	$sql = "SELECT * FROM banner_principal WHERE id_banner_principal=$id_banner_principal";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	$foto_anterior = $res['foto'];
	unlink($path.$foto_anterior);



	// Subir nuevo banner
	$pathCompleto = $path.$foto;
	file_put_contents($pathCompleto, $base64);




	$sql = "UPDATE banner_principal SET foto='$foto' WHERE id_banner_principal=$id_banner_principal";
	$conex->query($sql);



	class Resp {}

	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}




?>