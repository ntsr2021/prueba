<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "SELECT id_cuenta_banco, b.nombre AS banco, numero, tipo FROM cuenta_banco AS cb JOIN sesion AS s ON cb.id_user=s.id_user JOIN banco AS b ON cb.id_banco=b.id_banco ORDER BY id_cuenta_banco DESC"; 
$cons = $conex->query($sql);
while($res = $cons->fetch_array())
	$vec[] = $res;

header('Content-Type: application/json');
echo json_encode($vec); 


?>