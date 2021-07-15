<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';
require '../conexion.php';
require 'producto.php';


$producto = new Producto();


$json = file_get_contents('php://input');
$datos = json_decode($json);

$id_departamento1 = $datos->departamento1;
$id_departamento2 = $datos->departamento2;
$id_departamento3 = $datos->departamento3;
$codigo = $datos->codigo;
$nombre = $datos->nombre;
$descripcion = $datos->descripcion;
$cantidad = $datos->cantidad;
$precio = $datos->precio;
$estatus = $datos->estatus;
$id_producto = 'default';


$error = false;


if(!entero($id_departamento1))
	$error = true;
elseif(!empty($id_departamento2) && !entero($id_departamento2))
	$error = true;
elseif(!empty($id_departamento2) && !entero($id_departamento3))
	$error = true;
elseif(!codProducto($codigo))
	$error = true;
// elseif(!descripcion($nombre))
// 	$error = true;
// elseif(!descripcion($descripcion))
// 	$error = true;
elseif(!entero($cantidad))
	$error = true;
elseif(!decimal($precio))
	$error = true;
elseif(!texto($estatus) || strlen($estatus) > 2)
	$error = true;
elseif(!entero($id_producto))
	$error = true;


if(!$error)
{
	// Setear campos null
	// if($id_departamento2 == null)
	// 	$id_departamento2 = 'null';
	// if($id_departamento3 == null)
	// 	$id_departamento3 = 'null';


	// Subir foto
	if($datos->foto != null)
	{
		$foto_prin = $codigo.'-1';
		$foto = $datos->foto;
		$archivo = base64_decode($foto->base64);
		$path = $path_proy.'assets/img/producto/'.$foto_prin.'.jpg';
		file_put_contents($path, $archivo);
	}else
		$foto_prin = '';

	

	$producto->registrar($estatus, $codigo, $nombre, $descripcion, $cantidad, $precio, $foto_prin, $id_departamento1, $id_departamento2, $id_departamento3);
	




	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>