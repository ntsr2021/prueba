<?php  

function codificarToken($user) 
{
	$key = 'djnfd..$';
	
	$header = array('typ' => 'JWT', 'alg' => 'HS256');
	$header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($header)));


	$payload = array(
    'iat' => time(),
    'exp' => time() + (60*60*24*7), // Tiempo de expiracion una semana
    'data' => [ 
      'id_user' => $user['id_user'],
      'rol' => $user['rol'],
      'password' => $user['password']
    ]
	);
	$payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));


	$signature = hash_hmac('sha256', $header.'.'.$payload, $key, true); 
	$signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
	

	$token = $header.'.'.$payload.'.'.$signature;

	return $token;
}


function decodificarToken($token)
{
	$key = 'djnfd..$';

	$token = explode('.', $token);


	$sigRecibida = base64_decode(str_replace(['-', '_', ''], ['+', '/', '='], $token[2]));
	$sigVerificar = hash_hmac('sha256', $token[0].'.'.$token[1], $key, true);

	$user = null;
	if($sigRecibida == $sigVerificar)
	{
		$header = json_decode(base64_decode(str_replace(['-', '_', ''], ['+', '/', '='], $token[0])));
		$payload = json_decode(base64_decode(str_replace(['-', '_', ''], ['+', '/', '='], $token[1])));


		$user = $payload->data; 
	}

	return $user;
}


function generarCodigo($longitud) // Generar codigo aleatorio
{
	$key = '';
	$pattern = '1234567890';
	$max = strlen($pattern)-1;
	for($i=0;$i<$longitud;$i++)
		$key .= $pattern{mt_rand(0,$max)};
	return $key;
}


?>