<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "SELECT CURTIME() AS hora";
$cons = $conex->query($sql);
$res = $cons->fetch_array();


header('Content-Type: application/json');
echo json_encode($res); 

?>