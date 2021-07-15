<?php  


class Producto extends PDO
{


	function __construct(){ 
		$this->conexion = new Conexion();
	}


	public function registrar($estatus, $codigo, $nombre, $descripcion, $cantidad, $precio, $foto_prin, $id_departamento1, $id_departamento2, $id_departamento3)
	{

		$sql = "INSERT INTO producto (id_producto, estatus, codigo, nombre, descripcion, cantidad, precio, foto_prin, fecha_registro, id_departamento1, id_departamento2, id_departamento3) VALUES (default, :estatus, :codigo, :nombre, :descripcion, :cantidad, :precio, :foto_prin, CURDATE(), :id_departamento1, :id_departamento2, :id_departamento3)";
		$query = $this->conexion->prepare($sql);


		$query->bindParam(':estatus', $estatus);
		$query->bindParam(':codigo', $codigo);
		$query->bindParam(':nombre', $nombre);
		$query->bindParam(':descripcion', $descripcion);
		$query->bindParam(':cantidad', $cantidad);
		$query->bindParam(':precio', $precio);
		$query->bindParam(':foto_prin', $foto_prin);
		$query->bindParam(':id_departamento1', $id_departamento1);
		$query->bindParam(':id_departamento2', $id_departamento2);
		$query->bindParam(':id_departamento3', $id_departamento3);


		$query->execute();
	}


	public function editar($id_producto, $estatus, $codigo, $nombre, $descripcion, $cantidad, $precio, $foto_prin, $id_departamento1, $id_departamento2, $id_departamento3)
	{
		
		$sql = "UPDATE producto SET estatus=:estatus, codigo=:codigo, nombre=:nombre, descripcion=:descripcion, cantidad=:cantidad, precio=:precio, foto_prin=:foto_prin, fecha_registro=CURDATE(), id_departamento1=:id_departamento1, id_departamento2=:id_departamento2, id_departamento3=:id_departamento3 WHERE id_producto=:id_producto";
		$query = $this->conexion->prepare($sql);


		$query->bindParam(':id_producto', $id_producto);
		$query->bindParam(':estatus', $estatus);
		$query->bindParam(':codigo', $codigo);
		$query->bindParam(':nombre', $nombre);
		$query->bindParam(':descripcion', $descripcion);
		$query->bindParam(':cantidad', $cantidad);
		$query->bindParam(':precio', $precio);
		$query->bindParam(':foto_prin', $foto_prin);
		$query->bindParam(':id_departamento1', $id_departamento1);
		$query->bindParam(':id_departamento2', $id_departamento2);
		$query->bindParam(':id_departamento3', $id_departamento3);


		$query->execute();
	}

}



?>