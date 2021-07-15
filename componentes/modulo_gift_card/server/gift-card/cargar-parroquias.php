<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'estados.php';


$id_municipio = $_GET['municipio'];

$parroquias = new Estados();

$res = $parroquias->cargarParroquias($id_municipio);

header('Content-Type: application/json');
echo json_encode($res); 

?>