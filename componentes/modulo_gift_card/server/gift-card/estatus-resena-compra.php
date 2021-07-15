<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'resenas.php';



$json = file_get_contents('php://input');
$datos = json_decode($json);
$accion = $datos->accion;
$id_resena_compra = $datos->id_resena_compra;



$resenac = new Resenas();
$res = $resenac->estatusResenaCompra($accion,$id_resena_compra);
header('Content-Type: application/json');
echo json_encode($res);
?>