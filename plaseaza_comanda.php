<?php
require __DIR__ . "/db.php";

// Setăm headerele pentru a primi JSON
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Citim datele primite de la JavaScript
$date_primite = file_get_contents("php://input");
$data = json_decode($date_primite, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Nu s-au primit date."]);
    exit;
}

$nume = $data['nume'];
$telefon = $data['telefon'];
$adresa = $data['adresa'];
$detalii_cos = json_encode($data['cos']); // Salvăm lista de produse tot ca text
$total = $data['total'];

// Inserăm totul în baza de date
$stmt = $conn->prepare("INSERT INTO comenzi (nume, telefon, adresa, detalii_cos, total) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssssd", $nume, $telefon, $adresa, $detalii_cos, $total);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Comanda plasată cu succes!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Eroare: " . $conn->error]);
}
?>