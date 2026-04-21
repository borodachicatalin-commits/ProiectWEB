<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "carpshop";

$conn = new mysqli($host, $user, $pass, $db);

// Verificăm conexiunea
if ($conn->connect_error) {
    die("Conexiune eșuată: " . $conn->connect_error);
}

// Aceasta este linia MAGICĂ care rezolvă diacriticele din baza de date:
$conn->set_charset("utf8mb4");
?>