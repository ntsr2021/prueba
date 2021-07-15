<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
   

$id_banner_principal = $_GET['id'];


// Consultar la posicion actual del banner
$sql = "SELECT posicion FROM banner_principal WHERE id_banner_principal=$id_banner_principal";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$posicion = (int)$res['posicion'];


// Verificar si hai un banner arriba del que se desea subir posicion
$sql = "SELECT * FROM banner_principal WHERE posicion=($posicion-1)";
$cons = $conex->query($sql);


$mens = '';
if($cons->fetch_array()) // Si hai un banner arriba 
{
	// Bajar el banner que esta arriba
	$sql = "UPDATE banner_principal SET posicion=($posicion) WHERE posicion=($posicion-1)";
	$conex->query($sql);

	// Subir banner seleccionado
	$sql = "UPDATE banner_principal SET posicion=($posicion-1) WHERE id_banner_principal=$id_banner_principal";
	$conex->query($sql);


	$mens = 'OK';
}



class Resp {}

$resp = new Resp();
$resp->mens = $mens;

header('Content-Type: application/json');
echo json_encode($resp); 


?>