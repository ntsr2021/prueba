<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$id_cuenta_banco = $_GET['id_cuenta_banco'];


$sql = "SELECT * FROM cuenta_banco WHERE id_cuenta_banco=$id_cuenta_banco"; 
$cons = $conex->query($sql);
$res = $cons->fetch_array();

header('Content-Type: application/json');
echo json_encode($res); 


?>