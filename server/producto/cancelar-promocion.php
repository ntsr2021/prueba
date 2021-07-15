<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "UPDATE producto SET estatus='a' WHERE estatus='d'";
$conex->query($sql);



class Resp {}
$resp = new Resp();
$resp->mens = 'OK';

header('Content-Type: application/json');
echo json_encode($resp); 

?>