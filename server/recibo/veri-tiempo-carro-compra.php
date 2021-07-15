<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';


$json = file_get_contents('php://input');
$token = json_decode($json);

$user = decodificarToken($token);


$id_user = $user->id_user;


$sql = "SELECT * FROM carro_compra WHERE id_user=$id_user";
$cons = $conex->query($sql);
$res = $cons->fetch_array();


header('Content-Type: application/json');
echo json_encode($res); 

?>