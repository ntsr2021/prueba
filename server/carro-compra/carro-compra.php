<?php  


class CarroCompra extends PDO
{

	private $id_carro_compra = null;
	private $fecha = null;
	private $id_user = null;


	function __construct(){ 
		$this->conexion = new Conexion();
	}


	public function retornarProductos($id_user)
	{
		// Obtener id del carro de compra
		$cons = $this->conexion->prepare("
			SELECT id_carro_compra FROM carro_compra WHERE id_user=:id_user");
		$cons->bindParam(':id_user', $id_user);
		$cons->execute();
		$res = $cons->fetch();
		$id_carro_compra = $res['id_carro_compra'];


		// Consultar productos del carro de compra
		$cons = $this->conexion->prepare(
			"SELECT * FROM carro_compra_producto WHERE id_carro_compra=:id_carro_compra"
		);
		$cons->bindParam(':id_carro_compra', $id_carro_compra);
		$cons->execute();
		$res = $cons->fetch();


		// Retornar productos al inventario
		while($res = $cons->fetch())
		{
			$query = $this->conexion->prepare("UPDATE producto SET cantidad=(cantidad+:cantidad) WHERE codigo=:codigo");
			$query->bindParam(':cantidad', (int)$res['cantidad']);
			$query->bindParam(':codigo', $res['codigo']);

			$query->execute();
		}


		// Eliminar carro de compra
		$query = $this->conexion->prepare("DELETE FROM carro_compra_producto WHERE id_carro_compra=:id_carro_compra");
		$query->bindParam(':id_carro_compra', $id_carro_compra);
		$query->execute();

		$query = $this->conexion->prepare("DELETE FROM carro_compra WHERE id_carro_compra=:id_carro_compra");
		$query->bindParam(':id_carro_compra', $id_carro_compra);
		$query->execute();
	}


	public function veriExisCarroCliente($id_user) // Verifica si un cliente posee carro de compra
	{
		$cons = $this->conexion->prepare("SELECT * FROM carro_compra WHERE id_user=:id_user");
		$cons->bindParam(':id_user', $id_user);
		$cons->execute();

		$res = $cons->fetch();

		if($res)
			return true;
		else
			return false;
	}


	public function registrar($id_user, $productos)
	{

		// Crear carro de compra

		$sql = "INSERT INTO carro_compra (id_carro_compra, fecha, id_user) VALUES 
																		 (default, NOW(), :id_user)";
		$query = $this->conexion->prepare($sql);
		$query->bindParam(':id_user', $id_user);
		$query->execute();


		// Consultar id_carro_compra del ultimo carro de compra creado

		$sql = "SELECT id_carro_compra FROM carro_compra ORDER BY id_carro_compra DESC LIMIT 1";
		$cons = $this->conexion->prepare($sql);
		$cons->execute();
		$res = $cons->fetch();
		$id_carro_compra = $res['id_carro_compra'];


		// Recorrer objeto $productos y guardarlos en los productos del carro de compra creado

		$length = count($productos);
		for($i=0; $i<$length; $i++)
		{
			$codigo = $productos[$i]->codigo;
			$nombre = $productos[$i]->nombre;
			$cantidad = (int)$productos[$i]->can_comprar;
			$precio = $productos[$i]->precio;


			// Restar del inventario (tabla producto)
			$sql = "UPDATE producto SET cantidad=(cantidad-:cantidad) WHERE codigo=:codigo";
			$query = $this->conexion->prepare($sql);

			$query->bindParam(':cantidad', $cantidad);
			$query->bindParam(':codigo', $codigo);

			$query->execute();

			
			// Insertar en tabla carro_compra_producto
			$sql = "INSERT INTO carro_compra_producto (id_carro_compra_producto, codigo, nombre, precio, cantidad, id_carro_compra) VALUES 
																								(default, :codigo, :nombre, :precio, :cantidad, :id_carro_compra)";
			$query = $this->conexion->prepare($sql);

			$query->bindParam(':codigo', $codigo);
			$query->bindParam(':nombre', $nombre);
			$query->bindParam(':precio', $precio);
			$query->bindParam(':cantidad', $cantidad);
			$query->bindParam(':id_carro_compra', $id_carro_compra);

			$query->execute();
		}

	}


}



?>