<?php  

header("Content-Type: text/plain; charset=iso-8859-1");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require '../conex.php';

$id_articulo_blog = $_GET['id'];


$sql = "SELECT * FROM articulo_blog_coment WHERE id_articulo_blog=$id_articulo_blog AND id_coment_receptor is null";
$cons = $conex->query($sql);

$i = 0;
$j = 0;
$k = 0;


while($res = $cons->fetch_array())
{

	// Verificar si el comentario fue emitido por un cliente o por el administrador
	if($res['id_user'] == 1)
		$res['autor'] = 'Administrador';
	else 
	{
		$sql = "SELECT CONCAT(nombre, ' ', apellido) AS autor FROM cliente WHERE id_user = $res[id_user]";
		$consCliente = $conex->query($sql);
		$resCliente = $consCliente->fetch_array();

		$res['autor'] = $resCliente['autor'];
	}



	$vec[$i] = $res;
	$j = 0;
	$k = 0;


	$sql = "SELECT * FROM articulo_blog_coment WHERE id_coment_receptor=$res[id_articulo_blog_coment]";
	$cons2 = $conex->query($sql);
	while($res2 = $cons2->fetch_array())
	{

		// Verificar si el comentario fue emitido por un cliente o por el administrador
		if($res2['id_user'] == 1)
			$res2['autor'] = 'Administrador';
		else 
		{
			$sql = "SELECT CONCAT(nombre, ' ', apellido) AS autor FROM cliente WHERE id_user = $res2[id_user]";
			$consCliente = $conex->query($sql);
			$resCliente = $consCliente->fetch_array();

			$res2['autor'] = $resCliente['autor'];
		}



		$vec[$i]['coment_respuesta'][$j] = $res2;
		$k = 0;


		$sql = "SELECT * FROM articulo_blog_coment WHERE id_coment_receptor=$res2[id_articulo_blog_coment]";
		$cons3 = $conex->query($sql);
		while($res3 = $cons3->fetch_array())
		{
			// Verificar si el comentario fue emitido por un cliente o por el administrador
			if($res3['id_user'] == 1)
				$res3['autor'] = 'Administrador';
			else 
			{
				$sql = "SELECT CONCAT(nombre, ' ', apellido) AS autor FROM cliente WHERE id_user = $res3[id_user]";
				$consCliente = $conex->query($sql);
				$resCliente = $consCliente->fetch_array();

				$res3['autor'] = $resCliente['autor'];
			}


			$vec[$i]['coment_respuesta'][$j]['coment_respuesta'][$k] = $res3;

			++$k;
		}

		++$j;
	}

	++$i;
}


header('Content-Type: application/json');
if(isset($vec))
	echo json_encode($vec); 
else
	echo null;


?>