<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../conexion.php';
require 'producto-multimax.php';
include 'simplexlsx.class.php';

$path = $path_proy.'assets/img/data-multimax/data.xlsx';

$xlsx = new SimpleXLSX($path);


$productoMultimax = new ProductoMultimax();
$productoMultimax->cargarDatos($xlsx);


class Resp {}
$resp = new Resp();
$resp->mens = 'OK';

header('Content-Type: application/json');
echo json_encode($resp); 

?>