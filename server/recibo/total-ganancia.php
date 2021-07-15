<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "SELECT SUM(rp.precio*rp.cantidad) AS total FROM recibo AS r JOIN recibo_producto AS rp ON r.id_recibo=rp.id_recibo WHERE r.estatus='a' OR r.estatus='f'";
$cons = $conex->query($sql);
$res = $cons->fetch_array();


class Resp {}
$resp = new Resp();
$resp->total = $res['total'];


header('Content-Type: application/json');
echo json_encode($resp); 


?>