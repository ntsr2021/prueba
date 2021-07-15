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


if($id_user != null)
{
	$sql = "SELECT * FROM gift_card WHERE id_user_receptor=$id_user";
	$cons = $conex->query($sql);

	$i = 0;
	while($res = $cons->fetch_array())
	{
		$vec[$i] = $res;
		$vec[$i]['saldo'] = (float)$vec[$i]['saldo'];
		++$i;
	}



	header('Content-Type: application/json');
	if(isset($vec))
		echo json_encode($vec); 
	else
		echo json_encode(null);
}


?>



