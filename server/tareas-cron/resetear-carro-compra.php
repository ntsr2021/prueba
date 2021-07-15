<?php  

require 'conex.php';


// Consultar carro_compra
$sql = "SELECT *, HOUR(TIMEDIFF(NOW(), fecha))+2 AS horas_trans FROM carro_compra";
$cons = $conex->query($sql);


while($res = $cons->fetch_array())
{
	$horas_trans = (int)$res['horas_trans'];
	$id_carro_compra = $res['id_carro_compra'];

	if($horas_trans >= 2)
	{
		$sql = "SELECT codigo, cantidad FROM carro_compra_producto WHERE id_carro_compra=$id_carro_compra";
		$cons2 = $conex->query($sql);
		while($res2 = $cons2->fetch_array())
		{
			$codigo = $res2['codigo'];
			$cantidad = (int)$res2['cantidad'];


			$sql = "UPDATE producto SET cantidad=(cantidad+$cantidad) WHERE codigo='$codigo'"; // Retornar productos al inventario
			$conex->query($sql);
		}


		// Eliminar productos del carro de compra
		$sql = "DELETE FROM carro_compra_producto WHERE id_carro_compra=$id_carro_compra";
		$conex->query($sql);

		// Eliminar carro de compra
		$sql = "DELETE FROM carro_compra WHERE id_carro_compra=$id_carro_compra";
		$conex->query($sql);
	}
}


?>