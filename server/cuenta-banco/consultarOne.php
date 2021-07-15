<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
// require '../sesion.php';


$sql = "SELECT * FROM cuenta_banco WHERE id_cuenta_banco=1"; // Cambiar por el id del user
$cons = $conex->query($sql);
$res = $cons->fetch_array();

header('Content-Type: application/json');
echo json_encode($res); 


?>