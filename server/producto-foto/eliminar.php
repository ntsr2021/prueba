<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_producto_foto = $_GET['id_f'];
$id_producto = $_GET['id_p'];
$foto = $_GET['foto'];


$error = false;
if(!entero($id_producto_foto))
	$error = true;
elseif(!entero($id_producto))
	$error = true;


if(!$error)
{
	// Eliminar archivo
	unlink($path_proy.'assets/img/producto/'.$foto.'.jpg');

	// Eliminar de la BD
	$sql = "DELETE FROM producto_foto WHERE id_producto_foto=$id_producto_foto";
	$conex->query($sql);


	// Obtener codigo
	$sql = "SELECT codigo FROM producto WHERE id_producto=$id_producto";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	$codigo = $res['codigo'];

	// Reordenar tabla
	$sql = "SELECT * FROM producto_foto WHERE id_producto=$id_producto ORDER BY foto";
	$cons = $conex->query($sql);
	$num = 2;
	while($res = $cons->fetch_array())
	{
		$nombre = $res['foto'];
		$nuevo_nombre = $codigo.'-'.$num;

		// Renombrar imagen
		rename($path_proy.'assets/img/producto/'.$nombre.'.jpg', 
				$path_proy.'assets/img/producto/'.$nuevo_nombre.'.jpg');

		// Renombrar registro en la BD
		$sql = "UPDATE producto_foto SET foto='$nuevo_nombre' WHERE id_producto_foto=$res[id_producto_foto]";
		$conex->query($sql);

		++$num;
	}


	class Result {}
	$resp = new Result();
	$resp->mens = 'OK';


	header('Content-Type: application/json');
	echo json_encode($resp); 
}

?>