<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';
require '../validacion.php';

$password_ant = $_GET['password_ant'];
$password_nue = $_GET['password_nue'];


$error = false;
if(!password($password_ant))
	$error = true;
if(!password($password_nue))
	$error = true;


if(!$error)
{
	$sql = "SELECT password FROM user WHERE password='$password_ant'";
	$cons = $conex->query($sql);


	class Result {}
	$response = new Result();
	if($cons->fetch_array())
	{
		$sql = "UPDATE user SET password='$password_nue' WHERE password='$password_ant'";
		$conex->query($sql);
		$response->resultado = 'OK';
	}
	else
		$response->resultado = 'ERROR';


	header('Content-Type: application/json');
	echo json_encode($response); 
}


?>