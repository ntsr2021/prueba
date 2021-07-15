<?php  


class Conexion extends PDO 
{ 

  private $gestor_db = 'mysql';


  // LOCAL
  private $host = 'localhost';
  private $user = 'root';
  private $password = '';
  private $db = 'nts_store';


  // WEB 
  // private $host = 'localhost';
  // private $user = 'ntsstore_ntsstore';
  // private $password = '$_con1Nt5store..,#';
  // private $db = 'ntsstore_nts_store';


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

