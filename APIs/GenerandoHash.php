<?php

// Conexión a la base de datos 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contraseña";
$port = 3308;


// Creando la Conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);


// Verificando la Conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);

}


// Generando el Hash para la contraseña
$contraseña = {contraseña};
$hash = password_hash($contraseña, PASSWORD_DEFAULT);
echo "Hash de la contraseña Usuario: " . $hash . "<br>";

$conn->close();

?>