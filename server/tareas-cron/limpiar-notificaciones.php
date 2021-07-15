<?php  

require 'conexion.php';
require 'notificacion-administracion.php';
require 'notificacion-cliente.php';


$notificacionAdministracion = new NotificacionAdministracion();
$NotificacionCliente = new NotificacionCliente();


$notificacionAdministracion->eliminarInactivas();
$notificacionCliente->eliminarInactivas();

?>