<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'gift-card.php';




$json = file_get_contents('php://input');
$datos = json_decode($json);

$img = $datos->gftcard;
$titulo = $datos->titulo;
$nombreRemitente = $datos->nombreRemitente;
$mensaje = $datos->mensaje;
$saldo = $datos->saldo;
$ntarjetas = $datos->ntarjetas;



$giftCard = new GiftCard();

$res = $giftCard->registrar($img,$titulo, $nombreRemitente, $mensaje, $saldo,$ntarjetas);
 

header('Content-Type: application/json');
echo json_encode($res); 




?>