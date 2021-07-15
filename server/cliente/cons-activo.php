<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';


$id_user = $_GET['id_user'];


$error = false;
if(empty($id_user) || !entero($id_user))
	$error = true;

if(!$error)
{
	$sql = "SELECT * FROM cliente WHERE id_user=$id_user";
	$cons = $conex->query($sql);
	$res = $cons->fetch_array();


	header('Content-Type: application/json');
	echo json_encode($user);
}
 

?>