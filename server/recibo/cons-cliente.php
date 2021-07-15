<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);

$token = $datos->token;
$user = decodificarToken($token);
$id_user = $user->id_user;




$sql = "SELECT *, CONCAT('R-', LPAD(id_recibo, 4, '0')) AS codigo -- Este será el código que identificará al recibo  
FROM recibo WHERE id_user = $id_user ORDER BY id_recibo DESC";
$cons = $conex->query($sql);

$i = 0;
while($res = $cons->fetch_array())
{
	$recibo[$i] = $res;

	$sql = "SELECT SUM(precio*cantidad) AS monto, SUM(cantidad) AS productos FROM recibo_producto WHERE id_recibo=$res[id_recibo]";
	$cons2 = $conex->query($sql);
	$res2 = $cons2->fetch_array();


	$recibo[$i]['monto'] = (float)$res2['monto'];
	$recibo[$i]['productos'] = $res2['productos'];

	++$i;
}
 

header('Content-Type: application/json');
if(isset($recibo))
	echo json_encode($recibo); 
else
	echo null;

?>