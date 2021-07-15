<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$json = file_get_contents('php://input');
$datos = json_decode($json);
   
$id_producto = $datos->id_producto;
$nombre = $datos->nombre; // Contiene el codigo del producto.
$archivo = base64_decode($datos->base64);
$path = $path_proy.'assets/img/producto/';


// Nombre foto
$sql = "SELECT COUNT(*) AS num FROM producto_foto WHERE id_producto=$id_producto";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$num = $res['num'];
$num += 2;
$nombre_foto = $nombre.'-'.$num;


$pathCompleto = $path.$nombre_foto.'.jpg';
file_put_contents($pathCompleto, $archivo);


// Guardar en Base de datos

$sql = "INSERT INTO producto_foto (id_producto_foto, foto, id_producto) VALUES (default, '$nombre_foto', $id_producto)";
$conex->query($sql);


// Consultar id del producto insertado
$sql = "SELECT id_producto_foto FROM producto_foto ORDER BY id_producto_foto DESC LIMIT 1";
$cons = $conex->query($sql);
$res = $cons->fetch_array();
$id_producto_foto = $res['id_producto_foto'];
///////////


//////////

class Resp {}
$resp = new Resp();
$resp->mens = 'OK';
$resp->id_producto_foto = $id_producto_foto;

header('Content-Type: application/json');
echo json_encode($resp); 


?>