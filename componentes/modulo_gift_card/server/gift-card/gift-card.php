<?php  

class GiftCard
{
	private $titulo = null;
	private $nombreRemitente = null;
	private $mensaje = null;
	private $saldo = null;
	private $img = null;
	private $mensaje0 = "Código Inválido";
	private $mensaje1 = "OK";


	function __construct() { 
		$this->conexion = new Conexion();
	}

	public function consultar(){

		$query = $this->conexion->prepare("select * from gift_card");
		$query->execute();

		while($res = $query->fetch(PDO::FETCH_ASSOC))
			$vec[] = $res;

		return $vec;
	}

	public function registrar($img,$titulo, $nombreRemitente, $mensaje, $saldo,$ntarjetas)
	{
		$aleatorio = $this->codigoAleatorioGiftcard();
		$query = $this->conexion->prepare("insert into gift_card (codigo,img, titulo, nombre_remitente, mensaje, saldo, cantidad, fecha_creacion, fecha_expiracion)
											values('$aleatorio','$img','$titulo','$nombreRemitente','$mensaje',$saldo, $ntarjetas , curdate(), DATE_ADD(CURDATE(), interval 2 month) )");
		$query->bindParam(':titulo', $titulo);
		$query->bindParam(':nombre_remitente', $nombreRemitente);
		$query->bindParam(':mensaje', $mensaje);
		$query->bindParam(':saldo', $saldo);

		if ($query->execute()== false){
			return $this->mensaje0;
		}else{
			return $this->mensaje1;
		}

	}

	public function consultarGiftcardPresentacion(){

		$query = $this->conexion->prepare("select * from gift_card_presentacion");
		$query->execute();
		while($res = $query->fetch(PDO::FETCH_ASSOC))
			$vec[] = $res;
		return $vec;
	}

	public function codigoAleatorioGiftcard(){
		$g1 = strtoupper(bin2hex(random_bytes(2)));
		$g2 = strtoupper(bin2hex(random_bytes(2)));
		$g3 = strtoupper(bin2hex(random_bytes(2)));
		$codigo = "$g1-$g2-$g3";
		return $codigo;
	}

	public function recargaTarjeta($codigo, $saldo){
		$codigo = strtoupper($codigo);

		$query = $this->conexion->prepare("select codigo,saldo from gift_card where codigo='$codigo'");
		$query->execute();

		
		if($query->rowCount() > 0){
			$queryUpdate = $this->conexion->prepare("update nts_store.gift_card
													 set saldo=saldo+$saldo
													 where codigo='$codigo';");
			$queryUpdate->execute();
			return $this->mensaje1;
		}else{
			return $this->mensaje0;
		}
	}


}

?>