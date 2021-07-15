<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'estados.php';



$json = file_get_contents('php://input');
$datos = json_decode($json);


if(!isset($datos->estado)){
    $id_estado="0";
    

}else{
    $id_estado = $datos->estado;

}
if(!isset($datos->ciudad)){
    $id_ciudad = "0";

}else{
    $id_ciudad = $datos->ciudad;

}
if(!isset($datos->municipio)){
    $id_municipio = "0";
    
}else{
    $id_municipio = $datos->municipio;

}
if(!isset($datos->parroquia)){
    $id_parroquia = "0";
}else{
    $id_parroquia = $datos->parroquia;

}

$direccionD = $datos->direccion;
$pais = $datos->pais;
$id_usuario = $datos->usuario;


$direccion = new Estados();

$res = $direccion->registrarDireccion($id_estado, $id_ciudad, $id_municipio, $id_parroquia, $direccionD, $pais, $id_usuario);


header('Content-Type: application/json');
echo json_encode($res); 

?>