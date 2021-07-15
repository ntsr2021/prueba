<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'resenas.php';



$json = file_get_contents('php://input');
$datos = json_decode($json);
$calificacion = $datos->calificacion;
$resenaproducto = $datos->resenaproducto;


$resenap = new Resenas();
$res = $resenap->registrarResenaProducto($calificacion, $resenaproducto);
header('Content-Type: application/json');
echo json_encode($res); 
?>