<?php  

class NotificacionAdministracion
{
	private $id_notificacion_administracion = null;
	private $estatus = null;
	private $tipo = null;
	private $redirect_to = null;
	private $accion = null;
	private $fecha = null;
	private $id_user_emisor = null;
	private $id_user_receptor = null;


	function __construct() { 
		$this->conexion = new Conexion();
	}


	public function registrar($tipo, $redirect_to, $accion, $id_user_emisor, $id_user_receptor)
	{
		$estatus = 'a';


		$query = $this->conexion->prepare("
									INSERT INTO notificacion_administracion (id_notificacion_administracion, estatus, tipo, redirect_to, accion, fecha, id_user_emisor, id_user_receptor)
											  						VALUES (default, :estatus, :tipo, :redirect_to, :accion, now(), :id_user_emisor, :id_user_receptor)");

		$query->bindParam(':estatus', $estatus);
		$query->bindParam(':tipo', $tipo);
		$query->bindParam(':redirect_to', $redirect_to);
		$query->bindParam(':accion', $accion);
		$query->bindParam(':id_user_emisor', $id_user_emisor);
		$query->bindParam(':id_user_receptor', $id_user_receptor);

		$query->execute();
	}


	public function consultar($id_user)
	{
		$cons = $this->conexion->prepare("SELECT * FROM notificacion_administracion AS na JOIN cliente AS c ON na.id_user_emisor=c.id_user
		 																	WHERE na.id_user_receptor=:id_user ORDER BY na.id_notificacion_administracion DESC");
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
		$query = $this->conexion->prepare("UPDATE notificacion_administracion SET estatus='i' WHERE id_user_receptor=:id_user");
		$query->bindParam(':id_user', $id_user);
		$query->execute();
	}


	public function eliminarInactivas()
	{
		$query = $this->conexion->prepare("DELETE FROM notificacion_administracion WHERE estatus='i' AND HOUR(TIMEDIFF(NOW(), fecha)) >= 48");
		$query->execute();
	}

}

?>