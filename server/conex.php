<?php 

$key = 'djnfd..$';


// CONEXION NORMAL

// LOCAL
$path_proy = 'C:/node/nts-store/src/'; 

$host = 'localhost';
$user = 'root';
$password = '';
$db = 'nts_store';


// WEB
// $path_proy = './../../'; 

// $host = 'localhost';
// $user = 'ntsstore_ntsstore';
// $password = '$_con1Nt5store..,#';
// $db = 'ntsstore_nts_store';



$conex = new mysqli($host, $user, $password, $db) or die ('Error al conectar con la Base de Datos');
$conex->query('SET CHARACTER SET utf8');



?>
