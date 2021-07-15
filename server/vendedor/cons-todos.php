<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "SELECT * FROM vendedor AS v JOIN user AS u ON v.id_user=u.id_user ORDER BY id_vendedor";
$cons = $conex->query($sql);
while($res = $cons->fetch_array())
	$vec[] = $res;

header('Content-Type: application/json');
if(isset($vec))
	echo json_encode($vec); 
else 
	echo null;

?>