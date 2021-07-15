<?php  


class DataA2 extends PDO
{


	function __construct(){ 
		$this->conexion = new Conexion();
	}



	public function cargarDatos($data_a2)
	{

		// Setear cantidad de los productos a 0 para luego actualizarlos correctamente, esto debiado a que el A2 mueve reigstros de productos lo que imposibilita detectarlos y actualizar su cantidad.
		$sql = "UPDATE producto SET cantidad=0";
		$query = $this->conexion->prepare($sql); 
		$query->execute();



		$i=0;
		while (!feof($data_a2)) 
		{ 

			$linea = fgets($data_a2);


			if($linea == '') // Rompe el bucle cuando detecta la linea final del carchivo (la cual esta vacia)
				break;


			$lineaCortada = explode("\t", $linea);


			$codigo = $lineaCortada[0];
			$nombre = $lineaCortada[1];
			$precio = (float)(str_replace(',', '.', $lineaCortada[2]));
			$cantidad = (int)$lineaCortada[3];


			// Importar datos a la BD de la pagina
			$sql = "SELECT codigo FROM producto WHERE codigo=:codigo";
			$cons = $this->conexion->prepare($sql);
			$cons->bindParam(':codigo', $codigo);
			$cons->execute();


			if($res = $cons->fetch()) // Si el producto existe actualizar
			{	

				// Verificar si el producto ha sido apartado en el carro de compra
				$sql = "SELECT cantidad FROM carro_compra_producto WHERE codigo=:codigo";
				$cons2 = $this->conexion->prepare($sql);	
				$cons2->bindParam(':codigo', $codigo);
				$cons2->execute();


				if($res2 = $cons2->fetch())
				{
					$can_carro_compra = (int)$res2['cantidad'];
					$cantidad = ($cantidad - $can_carro_compra);


					$sql = "UPDATE producto SET precio=:precio, cantidad=:cantidad, nombre=:nombre WHERE codigo=:codigo";
				}

				else 
					$sql = "UPDATE producto SET precio=:precio, cantidad=:cantidad, nombre=:nombre WHERE codigo=:codigo";
				
			}

			else // Registrar nuevo
			{
				$sql = "INSERT INTO producto (id_producto, estatus, codigo, nombre, descripcion, cantidad, precio, fecha_registro) 
														VALUES (default, 'nv', :codigo, :nombre, '', :cantidad, :precio, CURDATE())";
			}

			
			$query = $this->conexion->prepare($sql);

			$query->bindParam(':codigo', $codigo);
			$query->bindParam(':nombre', $nombre);
			$query->bindParam(':cantidad', $cantidad);
			$query->bindParam(':precio', $precio);

			$query->execute();

			
			++$i;
		}

	}

}



?>