<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

require '../conexion.php';
require '../carro-compra/carro-compra.php';

$carroCompraObj = new CarroCompra();


$json = file_get_contents('php://input');
$datos = json_decode($json);


$id_user = $datos->id_user;
$carroCompra = $datos->carroCompra;
$carroCompraNuevo = array(); 


// Verificar si el cliente ya ha creado un carro de compra
if($carroCompraObj->veriExisCarroCliente($id_user))
	$carroCompraObj->retornarProductos($id_user); 


$j = 0;
$veriActualizacion = false;

for($i=0; $i < count($carroCompra); $i++)
{

	$codigo = $carroCompra[$i]->codigo;
	$can_comprar = $carroCompra[$i]->can_comprar;
	$precio = $carroCompra[$i]->precio;


	$sql = "SELECT * FROM producto WHERE codigo='$codigo'";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();


	if($precio != (float)$res['precio'] || $can_comprar > (int)$res['cantidad']) // Verifica si el inventario ha cambiado
		$veriActualizacion = true;


	// LLENAR UN NUEVO CARRO DE COMPRA POR SI HUBO ALGUNA ACTUALIZACION
	if((int)$res['cantidad'] > 0) // Solo incluir productos en existencia
	{	

		if($can_comprar > (int)$res['cantidad'])
			$can_comprar = (int)$res['cantidad'];


		$carroCompraNuevo[$j] = $carroCompra[$i];
		$carroCompraNuevo[$j]->precio = (float)$res['precio'];
		$carroCompraNuevo[$j]->can_comprar = $can_comprar;
		$carroCompraNuevo[$j]->can_original = (int)$res['cantidad'];


		++$j;
	}


}


if(count($carroCompraNuevo) == 0)
	$carroCompraNuevo = null;



header('Content-Type: application/json');

class Resp {}
$resp = new Resp();
$resp->veriActualizacion = $veriActualizacion;
$resp->carroCompraNuevo = $carroCompraNuevo;

echo json_encode($resp); 

?>

