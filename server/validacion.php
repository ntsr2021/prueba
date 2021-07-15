<?php  

function alfanumerico($campo)
{
	$patron = '/^[a-záéíóúÁÉÍÓÚñ\s0-9]+$/i';

	if(preg_match($patron, $campo))
		return true;
	else
		return false;
}

function descripcion($campo)
{
	$patron = '/[<>\']/'; // Valida que las cadenas no tengan caracteres como ';<>'


	if(!preg_match($patron, $campo))
		return true;
	else
		return false;
}

function entero($campo)
{
	if(intval($campo) || (int)$campo == 0)
		return true;
	else
		return false;
}

function decimal($campo)
{
	if(floatval($campo) || (int)$campo == 0)
		return true;
	else
		return false;
}

function texto($campo)
{
	$patron = '/^[a-záéíóúñ\s]+$/i';

	if(preg_match($patron, $campo))
		return true;
	else
		return false;
}

function correo($campo)
{
	$patron = '/^[A-z0-9\\._-]+@[A-z0-9][A-z0-9-]*(\\.[A-z0-9_-]+)*\\.([A-z]{2,6})$/';

	if(preg_match($patron, $campo))
		return true;
	else
		return false;
}

function telefono($campo)
{
	$patron = '/^[0-9]{11}$/';

	if(preg_match($patron, $campo))
		return true;
	else
		return false;
}

function doc($campo)
{
	$patron = '/^[0-9]{5,11}$/';

	if(preg_match($patron, $campo))
		return true;
	else
		return false;
}

function password($campo)
{
	$letMay = preg_match('/[A-Z]{1,}/', $campo);
	$letMin = preg_match('/[a-z]{1,}/', $campo);
	$numeros = preg_match('/[0-9]{1,}/', $campo);
	$carExpec = preg_match('/[!@#$%^&*()_+\.]{1,}/', $campo);
	$cantCarac = (strlen($campo) >= 6 && strlen($campo) <= 20);


	if($letMay && $letMin && $numeros && $carExpec && $cantCarac)
		return true;
	else
		return false;
}

function hora($campo)
{
	$patron = '/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/';

	if(preg_match($patron, $campo))
		return true;
	else
		return false;
}

function fecha($campo)
{
	$patron = '/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/';

	if(preg_match($patron, $campo))
		return true;
	else
		return false;
}

function codProducto($campo)
{
	$patron = '/^[a-záéíóúñ\-\s0-9]+$/i';

	if(preg_match($patron, $campo))
		return true;
	else
		return false;
}



/*
* Para comprobar el min o maximo de caracteres de una cadena usamos strlen($cadena) --> devuelve la longitud de la cadena
* Para verificar q un campo no este vacio !empty($campo) --> devuelve true si el campo esta vacio, pero la falseamos para q sea al contrario
* Para sanitizar campos de espacios en blanco usamos trim($cadena) --> elimina espacios al inicio y final de la cadena
* Para saber si es un numero entero usamos intval($numero)
*/

?>