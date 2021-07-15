<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';


class Menu {}
$menu = array();


$sql = "SELECT * FROM departamento_grupo ORDER BY id_departamento_grupo";
$cons = $conex->query($sql);

$i = 0;
while($res = $cons->fetch_array())
{
	$menu[$i] = new Menu();
	$menu[$i]->grupo = $res;


	$sql = "SELECT * FROM departamento WHERE id_grupo_pertenece=$res[id_departamento_grupo] ORDER BY orden";
	$cons2 = $conex->query($sql);

	$j = 0;
	while($res2 = $cons2->fetch_array()) 
	{
		$menu[$i]->dep[$j] = $res2;
		++$j;
	}


	++$i;
}


header('Content-Type: application/json');
if(isset($menu))
	echo json_encode($menu); 
else 
	echo null;

?>