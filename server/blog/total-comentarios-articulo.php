<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$id_articulo_blog = $_GET['id'];


$sql = "SELECT COUNT(*) AS total FROM articulo_blog_coment WHERE id_articulo_blog=$id_articulo_blog";
$cons = $conex->query($sql);
$res = $cons->fetch_array();


header('Content-Type: application/json');
echo json_encode($res);


?>