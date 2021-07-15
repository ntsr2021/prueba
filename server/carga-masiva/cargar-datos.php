<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../conexion.php';
require 'data-a2.php';


$dataA2 = new DataA2();


$path = $path_proy.'assets/img/data-a2/data.txt';

$data_a2 = fopen($path, "r") or die("No se pudo abrir el archivo");


$dataA2->cargarDatos($data_a2);



fclose($data_a2);




class Resp {}
$resp = new Resp();
$resp->mens = 'OK';

header('Content-Type: application/json');
echo json_encode($resp); 

?>