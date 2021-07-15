<?php  


class ProductoMultimax extends PDO
{

	private $id_producto = null;
	private $precio = null;


	function __construct(){ 
		$this->conexion = new Conexion();
	}



	public function cargarDatos($xlsx)
	{

		foreach ($xlsx->rows() as $campos) 
		{	
			$codigo = $campos[0];
			$nombre = $campos[1];
			$precio = (float)(str_replace(',', '.', $campos[2]));


			// Consultar id de los productos q ya esten registrados segun la data multimax
			$sql = "SELECT id_producto FROM producto WHERE codigo=:codigo";
			$cons = $this->conexion->prepare($sql); 
			$cons->bindParam(':codigo', $codigo);
			$cons->execute();


			if($res = $cons->fetch()) // Tomar id del producto existente
				$id_producto = $res['id_producto'];

			else // Registrar nuevo producto
			{
				$sql = "INSERT INTO producto (id_producto, estatus, codigo, nombre, cantidad, precio, descripcion, fecha_registro) VALUES 
																		 (default, :estatus, :codigo, :nombre, :cantidad, :precio, :descripcion, CURDATE())";
				$query = $this->conexion->prepare($sql);
				

				$estatus = 'nv';
				$cantidad = 0;
				$descripcion = '';
				$precio_producto_nts = 0;


				$query->bindParam(':estatus', $estatus);
				$query->bindParam(':codigo', $codigo);
				$query->bindParam(':nombre', $nombre);
				$query->bindParam(':cantidad', $cantidad);
				$query->bindParam(':precio', $precio_producto_nts);
				$query->bindParam(':descripcion', $descripcion);

				$query->execute();


				// Consultar id correspondiente al producto registrado
				$sql = "SELECT id_producto FROM producto ORDER BY id_producto DESC LIMIT 1";
				$cons = $this->conexion->prepare($sql);
				$cons->execute();
				$res = $cons->fetch();

				$id_producto = $res['id_producto'];
			}


			// Verificar precio existente en tabla producto_multimax
			$sql = "SELECT * FROM producto_multimax WHERE id_producto=:id_producto";
			$cons = $this->conexion->prepare($sql);
			$cons->bindParam(':id_producto', $id_producto);
			$cons->execute();


			if($cons->fetch()) // Actualizar precio multimax
			{

				$sql = "UPDATE producto_multimax SET precio=:precio WHERE id_producto=:id_producto";
				$query = $this->conexion->prepare($sql);

				$query->bindParam(':precio', $precio);
				$query->bindParam(':id_producto', $id_producto);

				$query->execute();
			}

			else // Registrar precio nuevo
			{
				$sql = "INSERT INTO producto_multimax (precio, id_producto) VALUES (:precio, :id_producto)";

				$query = $this->conexion->prepare($sql);

				$query->bindParam(':precio', $precio);
				$query->bindParam(':id_producto', $id_producto);

				$query->execute();
			}

		}
	}

}



?>