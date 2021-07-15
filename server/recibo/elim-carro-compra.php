<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../function.php';
require '../validacion.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);


// User
$user = decodificarToken($datos->token);
$id_user = $user->id_user;



// Consultar id_carro_compra de carro_compra
$sql = "SELECT id_carro_compra FROM carro_compra WHERE id_user=$id_user";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$id_carro_compra = $res['id_carro_compra'];


// Retornar productos al inventario
$sql = "SELECT * FROM carro_compra_producto WHERE id_carro_compra=$id_carro_compra";
$cons = $conex->query($sql);
while($res = $cons->fetch_array())
{
	$cantidad = (int)$res['cantidad'];
	$codigo = $res['codigo'];

	// Actualizar cantidad producto
	$sql = "UPDATE producto SET cantidad=(cantidad+$cantidad) WHERE codigo='$codigo'";
	$conex->query($sql);
}


// Eliminar carro de compra
$sql = "DELETE FROM carro_compra_producto WHERE id_carro_compra=$id_carro_compra";
$conex->query($sql);

$sql = "DELETE FROM carro_compra WHERE id_user=$id_user";
$conex->query($sql);



class Resp {}
$resp = new Resp();
$resp->mens = 'OK';


header('Content-Type: application/json');
echo json_encode($resp); 


?>
