<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$id_gift_card = $_GET['id'];


$sql = "SELECT * FROM gift_card WHERE id_gift_card=$id_gift_card";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$res['saldo'] = (float)$res['saldo'];



header('Content-Type: application/json');

echo json_encode($res); 


?>