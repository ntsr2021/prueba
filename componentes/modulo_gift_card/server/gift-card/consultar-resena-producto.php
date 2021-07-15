<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'resenas.php';

$order = $_GET['order'];
$page = $_GET['page'];


$resenac = new Resenas();
$res = $resenac->consResenaProducto($order,$page);

header('Content-Type: application/json');
echo json_encode($res); 
?>