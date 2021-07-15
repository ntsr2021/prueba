<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


$sql = "SELECT *, u.nameuser AS correo, c.id_user AS id_usuario FROM cliente AS c JOIN user AS u ON c.id_user=u.id_user ORDER BY c.id_cliente DESC";
$cons = $conex->query($sql);
while ($res=$cons->fetch_array()) 
	$vec[] = $res;

header('Content-Type: application/json');
echo json_encode($vec); 


?>