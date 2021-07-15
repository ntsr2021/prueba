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

$codigo = $datos->codigo;
$nombre = $datos->nombre;
$descripcion = $datos->descripcion;
$cantidad = $datos->cantidad;
$precio = $datos->precio;
$estatus = $datos->estatus;
$id_producto = $datos->id_producto;
$id_departamento1 = $datos->departamento1;
$id_departamento2 = $datos->departamento2;
$id_departamento3 = $datos->departamento3;

$foto_prin = $datos->foto_prin;


$error = false;

if(!codProducto($codigo))
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
	// Setear id_departamentos
	// if($datos->departamento1 != null)
	// 	$id_departamento1 = $datos->departamento1;
	// else 
	// 	$id_departamento1 = 'null';

	// if($datos->departamento2 != null)
	// 	$id_departamento2 = $datos->departamento2;
	// else 
	// 	$id_departamento2 = 'null';

	// if($datos->departamento3 != null)
	// 	$id_departamento3 = $datos->departamento3;
	// else 
	// 	$id_departamento3 = 'null';



	$producto->editar($id_producto, $estatus, $codigo, $nombre, $descripcion, $cantidad, $precio, $foto_prin, $id_departamento1, $id_departamento2, $id_departamento3);



	// Subir foto
	if($datos->foto != null)
	{
		$foto = $datos->foto;
		$archivo = base64_decode($foto->base64);
		$path = $path_proy.'assets/img/producto/'.$foto_prin.'.jpg';
		file_put_contents($path, $archivo);
	}


	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}

?>
