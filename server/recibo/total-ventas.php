<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "SELECT COUNT(*) AS total FROM recibo WHERE estatus='a' OR estatus='f'";
$cons = $conex->query($sql);
$res = $cons->fetch_array();


class Resp {}
$resp = new Resp();
$resp->total = $res['total'];


header('Content-Type: application/json');
echo json_encode($resp); 


?>