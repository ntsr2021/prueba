<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'resenas.php';



$json = file_get_contents('php://input');
$datos = json_decode($json);
$accion = $datos->accion;
$id_resena_producto = $datos->id_resena_producto;



$resenac = new Resenas();
$res = $resenac->estatusResenaProducto($accion,$id_resena_producto);
header('Content-Type: application/json');
echo json_encode($res);
?>