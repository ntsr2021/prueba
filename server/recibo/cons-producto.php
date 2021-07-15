<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$id_recibo = $_GET['id'];


$sql = "SELECT * FROM recibo_producto WHERE id_recibo = $id_recibo";
$cons = $conex->query($sql);
while($res = $cons->fetch_array())
	$vec[] = $res;


header('Content-Type: application/json');
if(isset($vec))
	echo json_encode($vec); 
else
	echo null;

?>