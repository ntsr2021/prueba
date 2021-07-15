<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$json = file_get_contents('php://input');
$params = json_decode($json);


// Consular id sesion
$sql = "SELECT id_user FROM sesion";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$id_user = $res['id_user'];


$sql = "INSERT INTO cuenta_banco (id_cuenta_banco, numero, tipo, id_banco, id_user) VALUES (default, $params->numero, '$params->tipo', $params->banco, $id_user)"; 
$conex->query($sql);


class Result {}
$response = new Result();
$response->resultado = 'OK';

header('Content-Type: application/json');
echo json_encode($response); 

?>