<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$id_departamento_grupo = $_GET['id'];


$error = false;
if(!entero($id_departamento_grupo))
	$error = true;

if(!$error)
{
	// Vaciar id del departamento que apunta al grupo
	$sql = "UPDATE departamento SET id_grupo_apunta=null WHERE id_grupo_apunta=$id_departamento_grupo";
	$conex->query($sql);


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
	


	elimGrupo($id_departamento_grupo);


	


	class Resp {}
	$resp = new Resp();
	$resp->mens = 'OK';


	header('Content-Type: application/json');
	echo json_encode($resp);
}
 


?>