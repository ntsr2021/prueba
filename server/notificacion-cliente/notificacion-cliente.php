<?php  

class NotificacionCliente
{
	private $id_notificacion_cliente = null;
	private $estatus = null;
	private $tipo = null;
	private $redirect_to = null;
	private $accion = null;
	private $fecha = null;
	private $id_user = null;


	function __construct() { 
		$this->conexion = new Conexion();
	}


	public function registrar($tipo, $redirect_to, $accion, $id_user)
	{
		$estatus = 'a';


		$query = $this->conexion->prepare("
									INSERT INTO notificacion_cliente (id_notificacion_cliente, estatus, tipo, redirect_to, accion, fecha, id_user)
											  						VALUES (default, :estatus, :tipo, :redirect_to, :accion, now(), :id_user)");

		$query->bindParam(':estatus', $estatus);
		$query->bindParam(':tipo', $tipo);
		$query->bindParam(':redirect_to', $redirect_to);
		$query->bindParam(':accion', $accion);
		$query->bindParam(':id_user', $id_user);

		$query->execute();

	}


	public function consultar($id_user)
	{
		$cons = $this->conexion->prepare("SELECT * FROM notificacion_cliente WHERE id_user=:id_user ORDER BY id_notificacion_cliente DESC");
		$cons->bindParam(':id_user', $id_user);
		$cons->execute();


		while($res = $cons->fetch())
			$vec[] = $res;


		if(isset($vec))
			return $vec;
		else
			return null;
	}


	public function desactivar($id_user)
	{
		$query = $this->conexion->prepare("UPDATE notificacion_cliente SET estatus='i' WHERE id_user=:id_user");
		$query->bindParam(':id_user', $id_user);
		$query->execute();
	}


	public function eliminarInactivas()
	{
		$query = $this->conexion->prepare("DELETE FROM notificacion_cliente WHERE estatus='i' AND HOUR(TIMEDIFF(NOW(), fecha)) >= 48");
		$query->execute();
	}

}

?>