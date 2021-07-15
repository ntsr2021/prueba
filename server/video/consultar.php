<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "SELECT nombre FROM video ORDER BY rand() LIMIT 1";
$cons = $conex->query($sql);
$res = $cons->fetch_array();


header('Content-Type: application/json');
echo json_encode($res);  


?>