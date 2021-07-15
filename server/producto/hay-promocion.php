<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$hayPromocion = false;

$sql = "SELECT * FROM producto WHERE estatus='d'";
$cons = $conex->query($sql);
if($cons->fetch_array())
	$hayPromocion = true;


class Resp {}
$resp = new Resp();
$resp->mens = $hayPromocion;

header('Content-Type: application/json');
echo json_encode($resp); 

?>