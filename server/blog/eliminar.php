<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_articulo_blog = $_GET['id'];


$error = false;


if(!entero($id_articulo_blog))
	$error = true;


if(!$error)
{

	$sql = "DELETE FROM articulo_blog_coment WHERE id_articulo_blog=$id_articulo_blog";
	$conex->query($sql);

	$sql = "DELETE FROM articulo_blog WHERE id_articulo_blog=$id_articulo_blog";
	$conex->query($sql);


	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';

	header('Content-Type: application/json');
	echo json_encode($resp); 
}


?>