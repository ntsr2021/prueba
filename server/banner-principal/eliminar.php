<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_banner_principal = $_GET['id'];

$error = false;
if(empty($id_banner_principal) || !entero($id_banner_principal))
	$error = true;


if(!$error)
{
	// Consultar banner principal
	$sql = "SELECT * FROM banner_principal WHERE id_banner_principal=$id_banner_principal";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();


	$foto = $res['foto'];


	// Eliminar archivo
	unlink($path_proy.'assets/img/banner/principal/'.$foto);


	// Eliminar de la BD
	$sql = "DELETE FROM banner_principal WHERE id_banner_principal=$id_banner_principal";
	$conex->query($sql);


	// Reordenar posiciones 
	$sql = "SELECT * FROM banner_principal ORDER BY posicion";
	$cons = $conex->query($sql);
	$posicion = 1;
	while($res = $cons->fetch_array())
	{
		$sql = "UPDATE banner_principal SET posicion=$posicion WHERE id_banner_principal=$res[id_banner_principal]";
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