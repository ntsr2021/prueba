<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conexion.php';
require 'gift-card.php';


$giftCard = new GiftCard();
$res = $giftCard->consultarGiftcardPresentacion();
echo json_encode($res); 

?>