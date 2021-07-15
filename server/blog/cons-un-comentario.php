<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$id_articulo_blog_coment = $_GET['id'];


$sql = "SELECT * FROM articulo_blog_coment WHERE id_articulo_blog_coment = $id_articulo_blog_coment";
$cons = $conex->query($sql);
$res = $cons->fetch_array();


// Verificar si el comentario fue emitido por un cliente o por el administrador
if($res['id_user'] == 1)
{
	$res['autor'] = 'Administrador';
}

else 
{
	$sql = "SELECT CONCAT(nombre, ' ', apellido) AS autor FROM cliente WHERE id_user = $res[id_user]";
	$cons2 = $conex->query($sql);
	$res2 = $cons2->fetch_array();

	$res['autor'] = $res2['autor'];
}


header('Content-Type: application/json');
echo json_encode($res); 


?>