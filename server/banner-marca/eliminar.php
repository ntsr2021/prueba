<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_banner_marca = $_GET['id'];

$error = false;

if(empty($id_banner_marca) || !entero($id_banner_marca))
	$error = true;

if(!$error)
{
	// Consultar banner principal
	$sql = "SELECT * FROM banner_marca WHERE id_banner_marca=$id_banner_marca";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();


	$foto = $res['foto'];


	// Eliminar archivo
	unlink($path_proy.'assets/img/banner/marca/'.$foto);


	// Eliminar de la BD
	$sql = "DELETE FROM banner_marca WHERE id_banner_marca=$id_banner_marca";
	$conex->query($sql);


	// Reordenar posiciones 
	$sql = "SELECT * FROM banner_marca ORDER BY posicion";
	$cons = $conex->query($sql);
	$posicion = 1;
	while($res = $cons->fetch_array())
	{
		$sql = "UPDATE banner_marca SET posicion=$posicion WHERE id_banner_marca=$res[id_banner_marca]";
		$conex->query($sql);
		++$posicion;
	}
	

	class Result {}
	$resp = new Result();
	$resp->mens = 'OK';


	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>