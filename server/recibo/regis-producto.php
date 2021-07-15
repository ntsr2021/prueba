<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);


// Consular ultimo recibo
$sql = "SELECT * FROM recibo ORDER BY id_recibo DESC LIMIT 1";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$id_recibo = $res['id_recibo'];


// Restar productos al inventario
$length = count($datos);
for($i=0; $i<$length; $i++)
{
	$id_recibo_producto = 'default';
	$codigo = $datos[$i]->codigo;
	$nombre = $datos[$i]->nombre;
	$precio = $datos[$i]->precio;


	$sql = "UPDATE producto SET cantidad=(cantidad-1) WHERE codigo='$codigo'";
	$conex->query($sql);

	$sql = "INSERT INTO recibo_producto (id_recibo_producto, codigo, nombre, precio, id_recibo) VALUES 
										($id_recibo_producto, '$codigo', '$nombre', $precio, $id_recibo)";
	$conex->query($sql);
}
/////////////


class Resp {}
$resp = new Resp();
$resp->mens = 'OK';

header('Content-Type: application/json');
echo json_encode($resp); 

?>