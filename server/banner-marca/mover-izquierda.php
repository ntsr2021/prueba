<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
   

$id_banner_marca = $_GET['id'];


// Consultar la posicion actual del banner
$sql = "SELECT posicion FROM banner_marca WHERE id_banner_marca=$id_banner_marca";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$posicion = (int)$res['posicion'];


// Verificar si hai un banner a la izquierda del que se desea mover 
$sql = "SELECT * FROM banner_marca WHERE posicion=($posicion-1)";
$cons = $conex->query($sql);


$mens = '';
if($cons->fetch_array()) // Si hai un banner a la izquierda 
{
	// Mover a la derecha el banner de la izquierda
	$sql = "UPDATE banner_marca SET posicion=($posicion) WHERE posicion=($posicion-1)";
	$conex->query($sql);

	// Mover banner seleccionado
	$sql = "UPDATE banner_marca SET posicion=($posicion-1) WHERE id_banner_marca=$id_banner_marca";
	$conex->query($sql);


	$mens = 'OK';
}



class Resp {}

$resp = new Resp();
$resp->mens = $mens;

header('Content-Type: application/json');
echo json_encode($resp); 


?>