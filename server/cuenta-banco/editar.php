<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$json = file_get_contents('php://input');
$params = json_decode($json);


$sql = "UPDATE cuenta_banco SET numero='$params->numero', tipo='$params->tipo', id_banco=$params->banco WHERE id_cuenta_banco=$params->id_cuenta_banco"; 
$conex->query($sql);


class Result {}
$response = new Result();
$response->resultado = 'OK';

header('Content-Type: application/json');
echo json_encode($response); 

?>