<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "SELECT *, CONCAT('R-', LPAD(id_recibo, 4, '0')) AS codigo -- Este será el código que identificará al recibo  
				FROM recibo AS r JOIN cliente AS c ON r.id_user=c.id_user 
				WHERE r.estatus='a' || r.estatus='f'
				ORDER BY id_recibo DESC";
$cons = $conex->query($sql);
while($res = $cons->fetch_array())
	$vec[] = $res;
 

header('Content-Type: application/json');
if(isset($vec))
	echo json_encode($vec); 
else
	echo null;

?>