<?php
require __DIR__ . "/db.php";

// Verificăm dacă primim o categorie specifică din adresa URL (ex: produse.php?categorie=lansete)
$categorie = isset($_GET['categorie']) ? $_GET['categorie'] : '';

// Dacă avem o categorie, facem o cerere pregătită (pentru securitate)
if ($categorie !== '') {
    $stmt = $conn->prepare("SELECT * FROM produse WHERE categorie = ?");
    $stmt->bind_param("s", $categorie); // "s" înseamnă că variabila este de tip string (text)
    $stmt->execute();
    $rez = $stmt->get_result();
} else {
    // Dacă nu cerem nicio categorie, aducem toate produsele
    $rez = $conn->query("SELECT * FROM produse");
}

$produse = [];
while ($row = $rez->fetch_assoc()) {
    $produse[] = $row;
}

header("Content-Type: application/json");
echo json_encode($produse);
?>