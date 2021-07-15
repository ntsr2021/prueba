<?php  

class Resenas
{
	private $mensaje0 = "Código Inválido";
	private $mensaje1 = "OK";
	


	function __construct() { 
		$this->conexion = new Conexion();
	}

	
	public function registrarResenaCompra($calificacion, $resenacompra){
		$query = $this->conexion->prepare("insert into resena_compra (estatus,puntaje, descripcion) values('P',$calificacion, '$resenacompra')");


		if ($query->execute()== false){
			return 'codigo_inválido';
		}else{
			return 'OK';
		}
	}

	public function registrarResenaProducto($calificacion, $resenaproducto){
		$query = $this->conexion->prepare("insert into resena_producto (estatus,puntaje, descripcion) values('P',$calificacion, '$resenaproducto')");
		if ($query->execute()== false){
			return 'codigo_inválido';
		}else{
			return 'OK';
		}
	}

	public function consResenaCompra($order, $page){

		$paginator = $this->paginatorReturn($page);
		$query = $this->conexion->prepare("select id_resena_compra,
												  puntaje,
												  estatus, 
												  descripcion 
										   from resena_compra
										   order by id_resena_compra $order
										   limit $paginator,20");
		$query->execute();
		$query2 = $this->conexion->prepare("select id_resena_compra,
													puntaje, 
													descripcion 
											from resena_compra");
		$query2->execute();
		$nreg = $query2->rowCount();

		while($res = $query->fetch(PDO::FETCH_ASSOC))
			$vec[] = $res;

		$arr = array('total_count' => $nreg, 'items' => $vec);
		return $arr;
	}

	public function consResenaProducto($order, $page){

		$paginator = $this->paginatorReturn($page);
		$query = $this->conexion->prepare("select id_resena_producto,
												  puntaje,
												  estatus, 
												  descripcion 
										   from resena_producto
										   order by id_resena_producto $order
										   limit $paginator,20");
		$query->execute();
		$query2 = $this->conexion->prepare("select id_resena_producto,
													puntaje, 
													descripcion 
											from resena_producto");
		$query2->execute();
		$nreg = $query2->rowCount();

		while($res = $query->fetch(PDO::FETCH_ASSOC))
			$vec[] = $res;

		$arr = array('total_count' => $nreg, 'items' => $vec);
		return $arr;
	}

	public function estatusResenaCompra($accion,$id_reseña){
		switch ($accion) {
			case 1:
				$query = $this->conexion->prepare("update resena_compra
				set  estatus='A' 
				where id_resena_compra=$id_reseña");
				return $query->execute();
				break;
			case 2:
				$query = $this->conexion->prepare("update resena_compra
				set  estatus='I' 
				where id_resena_compra=$id_reseña");
				return $query->execute();

				break;
			case 3:
				$query = $this->conexion->prepare("delete from resena_compra
				where id_resena_compra=$id_reseña");
				return $query->execute();
				break;
		}

	}
	public function estatusResenaProducto($accion,$id_reseña){
		switch ($accion) {
			case 1:
				$query = $this->conexion->prepare("update resena_producto
				set  estatus='A' 
				where id_resena_producto=$id_reseña");
				return $query->execute();
				break;
			case 2:
				$query = $this->conexion->prepare("update resena_producto
				set  estatus='I' 
				where id_resena_producto=$id_reseña");
				return $query->execute();

				break;
			case 3:
				$query = $this->conexion->prepare("delete from resena_producto
				where id_resena_producto=$id_reseña");
				return $query->execute();

				break;
		}

	}

	

	public function paginatorReturn($page){
		
		return $page = ($page*20)-20;
	}


}

?>