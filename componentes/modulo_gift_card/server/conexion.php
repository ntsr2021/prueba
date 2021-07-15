<?php  


class Conexion extends PDO 
{ 

  private $gestor_db = 'mysql';

  private $host = 'localhost';
  private $user = 'root';
  private $password = '';
  private $db = 'nts_store2';



  public function __construct() {
      
    try {
      parent::__construct("{$this->gestor_db}:dbname={$this->db}; host={$this->host}; charset=utf8", $this->user, $this->password);
    }

    catch(PDOException $e) {
      echo 'Ha surgido un error y no se puede conectar a la base de datos. Detalle: ' . $e->getMessage();
      exit;
    }
  
  } 

} 


?>

