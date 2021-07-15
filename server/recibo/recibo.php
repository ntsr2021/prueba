<?php  


class Recibo extends PDO
{


	function __construct(){ 
		$this->conexion = new Conexion();
	}


	public function registrarProductos($productos, $id_recibo)
	{
		$length = count($productos);


		for($i=0; $i<$length; $i++)
		{
			$codigo = $productos[$i]['codigo'];
			$nombre = $productos[$i]['nombre'];
			$cantidad = (int)$productos[$i]['cantidad'];
			$precio = $productos[$i]['precio'];


			$sql = "INSERT INTO recibo_producto (id_recibo_producto, codigo, nombre, cantidad, precio, id_recibo) VALUES 
																					(default, :codigo, :nombre, :cantidad, :precio, :id_recibo)";
			$query = $this->conexion->prepare($sql);

			$query->bindParam(':codigo', $codigo);
			$query->bindParam(':nombre', $nombre);
			$query->bindParam(':cantidad', $cantidad);
			$query->bindParam(':precio', $precio);
			$query->bindParam(':id_recibo', $id_recibo);


			$query->execute();
		}
	}

}



?>