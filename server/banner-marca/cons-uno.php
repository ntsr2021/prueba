<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$id_banner_marca = $_GET['id'];


$sql = "SELECT * FROM banner_marca WHERE id_banner_marca=$id_banner_marca";
$cons = $conex->query($sql);
$res = $cons->fetch_array();

header('Content-Type: application/json');
echo json_encode($res); 


?>

