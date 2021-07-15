<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';



$sql = "SELECT * FROM articulo_blog ORDER BY id_articulo_blog DESC LIMIT 15";
$cons = $conex->query($sql);
$i = 0;
while($res = $cons->fetch_array())
{
	$vec[$i] = $res;

	// Consultar cantidad de comentarios nuevos
	$sql = "SELECT COUNT(*) AS comentarios FROM articulo_blog_coment WHERE id_articulo_blog=$res[id_articulo_blog] AND estatus='nv'";
	$cons2 = $conex->query($sql);
	$res2 = $cons2->fetch_array();
	
	$vec[$i]['comentarios'] = $res2['comentarios'];


	++$i;
}


header('Content-Type: application/json');
if(isset($vec))
	echo json_encode($vec); 
else
	echo null;


?>