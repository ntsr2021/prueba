<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_departamento = $_GET['id'];

$error = false;
if(!entero($id_departamento))
	$error = true;


if(!$error)
{
	// Vaciar id_departamentos de productos vinculados al departamento
	$sql = "UPDATE producto SET id_departamento1=null WHERE id_departamento1=$id_departamento";
	$conex->query($sql);
	$sql = "UPDATE producto SET id_departamento2=null WHERE id_departamento2=$id_departamento";
	$conex->query($sql);
	$sql = "UPDATE producto SET id_departamento3=null WHERE id_departamento3=$id_departamento";
	$conex->query($sql);


	// Consultar id_grupo_apunta y id_grupo_pertenece
	$sql = "SELECT id_grupo_apunta, id_grupo_pertenece FROM departamento WHERE id_departamento=$id_departamento";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();
	$id_grupo_pertenece = $res['id_grupo_pertenece'];
	$id_grupo_apunta = $res['id_grupo_apunta'];


	// Eliminar departamento 
	$sql = "DELETE FROM departamento WHERE id_departamento=$id_departamento";
	$conex->query($sql);


	// Reordenar posiciones 
	$sql = "SELECT * FROM departamento WHERE id_grupo_pertenece=$id_grupo_pertenece ORDER BY orden";
	$cons = $conex->query($sql);
	$orden = 1;
	while($res = $cons->fetch_array())
	{
		$sql = "UPDATE departamento SET orden=$orden WHERE id_departamento=$res[id_departamento]";
		$conex->query($sql);
		++$orden;
	}


	function elimGrupo($id_departamento_grupo)
	{
		require '../conex.php';


		// Consultar los departamentos a los que pertenece el grupo
		$sql = "SELECT * FROM departamento WHERE id_grupo_pertenece=$id_departamento_grupo";
		$cons = $conex->query($sql);

		while($res = $cons->fetch_array())
		{
			// Vaciar id_departamentos de productos vinculados a los departamentos por eliminar
			$sql = "UPDATE producto SET id_departamento1=null WHERE id_departamento1=$res[id_departamento]";
			$conex->query($sql);
			$sql = "UPDATE producto SET id_departamento2=null WHERE id_departamento2=$res[id_departamento]";
			$conex->query($sql);
			$sql = "UPDATE producto SET id_departamento3=null WHERE id_departamento3=$res[id_departamento]";
			$conex->query($sql);


			// Eliminar departamento 
			$sql = "DELETE FROM departamento WHERE id_departamento=$res[id_departamento]";
			$conex->query($sql);

		
			if($res['id_grupo_apunta'] != null)
				elimGrupo($res['id_grupo_apunta']);
		}

		// Eliminar grupo
		$sql = "DELETE FROM departamento_grupo WHERE id_departamento_grupo=$id_departamento_grupo";
		$conex->query($sql);
	}


	// Eliminar grupo al que apunta el departamento
	if($id_grupo_apunta != null)
		elimGrupo($id_grupo_apunta);



	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';


	header('Content-Type: application/json');
	echo json_encode($resp); 
}



?>