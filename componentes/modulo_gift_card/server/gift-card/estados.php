<?php  

class Estados
{
	private $mensaje0 = "Código Inválido";
	private $mensaje1 = "OK";
	


	function __construct() { 
		$this->conexion = new Conexion();
	}

	public function cargarEstados(){

		$query = $this->conexion->prepare("select * from estados");
		$query->execute();
		
		while($res = $query->fetch(PDO::FETCH_ASSOC))
			$vec[] = $res;

		// $arr = array('total_count' => $nreg, 'items' => $vec);
		return $vec;
	}

	
	public function cargarCiudades($id_estado){

		$query = $this->conexion->prepare("select * from ciudades where id_estado = $id_estado");
		$query->execute();
		
		while($res = $query->fetch(PDO::FETCH_ASSOC))
			$vec[] = $res;
		// $arr = array('total_count' => $nreg, 'items' => $vec);
		return $vec;
	}
	
	public function cargarMunicipios($id_estado){

		$query = $this->conexion->prepare("select * from municipios where id_estado = $id_estado");
		$query->execute();
		
		while($res = $query->fetch(PDO::FETCH_ASSOC))
			$vec[] = $res;
		// $arr = array('total_count' => $nreg, 'items' => $vec);
		return $vec;
	}

	public function cargarParroquias($id_municipio){

		$query = $this->conexion->prepare("select * from parroquias where id_municipio = $id_municipio");
		$query->execute();
		
		while($res = $query->fetch(PDO::FETCH_ASSOC))
			$vec[] = $res;
		// $arr = array('total_count' => $nreg, 'items' => $vec);
		return $vec;
	}

	public function registrarDireccion($id_estado, $id_ciudad, $id_municipio, $id_parroquia, $direccion, $pais,$id_usuario){

	
		if($pais == true)
			$pais = 1;
		else 
			$pais = 0;
		
		$query = $this->conexion->prepare("insert into direccion (id_estado,id_ciudad,id_municipio,id_parroquia,direccion,pais,id_usuario) values($id_estado, $id_ciudad, $id_municipio, $id_parroquia, '$direccion', $pais,$id_usuario);");

		if ($query->execute()== false){
			return 'Código_inválido';
		}else{
			return 'OK';
		}
		//  return $query;
	}

}

?>