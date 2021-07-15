<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'gift-card.php';


$json = file_get_contents('php://input');
$datos = json_decode($json);
$codigo = $datos->codTarjeta;
$saldo = $datos->saldo;


$giftCard = new GiftCard();
$res = $giftCard->recargaTarjeta($codigo,$saldo);
header('Content-Type: application/json');
echo json_encode($res); 
?>