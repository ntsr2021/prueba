<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "SELECT * FROM banner_marca ORDER BY posicion";
$cons = $conex->query($sql);
while($res = $cons->fetch_array())
	$vec[] = $res;

header('Content-Type: application/json');
if(isset($vec))
	echo json_encode($vec); 
else 
	echo json_encode(null);

?>






