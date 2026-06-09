<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "wuthering_waves_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) { 
    die("Connection failed: " . $conn->connect_error); 
}

header('Content-Type: application/json');

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == 'get_characters') {
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $element = isset($_GET['element']) ? $_GET['element'] : '';
    $rarity = isset($_GET['rarity']) ? $_GET['rarity'] : '';
    $weapon = isset($_GET['weapon']) ? $_GET['weapon'] : '';
    
    $sql = "SELECT * FROM characters WHERE 1=1";
    
    if (!empty($search)) {
        $keyword = $conn->real_escape_string($search);
        $sql .= " AND name LIKE '%$keyword%'";
    }
    if (!empty($element)) {
        $elem = $conn->real_escape_string($element);
        $sql .= " AND element = '$elem'";
    }
    if (!empty($rarity) && $rarity !== 'All') {
        $rar = $conn->real_escape_string($rarity);
        $sql .= " AND rarity = '$rar'";
    }

    if (!empty($weapon) && $weapon !== 'Any' && $weapon !== 'All') {
        $weap = $conn->real_escape_string($weapon);
        $sql .= " AND weapon = '$weap'";
    }
    
    $result = $conn->query($sql);
    $data = [];
    if ($result) { while($row = $result->fetch_assoc()) { $data[] = $row; } }
    echo json_encode($data);
}

if ($action == 'get_weapons') {
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $type = isset($_GET['type']) ? $_GET['type'] : '';
    $rarity = isset($_GET['rarity']) ? $_GET['rarity'] : '';

    $sql = "SELECT * FROM weapons WHERE 1=1";
    
    if (!empty($search)) {
        $keyword = $conn->real_escape_string($search);
        $sql .= " AND name LIKE '%$keyword%'";
    }
    if (!empty($type) && $type !== 'All') {
        $type_str = $conn->real_escape_string($type);
        $sql .= " AND type = '$type_str'";
    }

    if (!empty($rarity) && $rarity !== 'All') {
        $rar = $conn->real_escape_string($rarity);
        $sql .= " AND rarity = '$rar'";
    }

    $result = $conn->query($sql);
    $data = [];
    if ($result) { while($row = $result->fetch_assoc()) { $data[] = $row; } }
    echo json_encode($data);
}

if ($action == 'get_sonatas') {
    $sql = "SELECT * FROM sonatas";
    $result = $conn->query($sql);
    $sonatas = array();
    
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $sonatas[] = $row;
        }
    }
    
    echo json_encode($sonatas);
    exit;
}

if ($action == 'get_echoes') {
    $search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
    $cost = isset($_GET['cost']) ? $conn->real_escape_string($_GET['cost']) : 'All';
    $sonata = isset($_GET['sonata']) ? $conn->real_escape_string($_GET['sonata']) : 'All';
    
    $sql = "SELECT * FROM echoes WHERE name LIKE '%$search%'";
    
    if ($cost !== 'All') {
        $sql .= " AND cost = '$cost'";
    }
    
    if ($sonata !== 'All') {
        $sql .= " AND sonata_effect LIKE '%$sonata%'";
    }
    
    $sql .= " ORDER BY cost DESC, name ASC";
    
    $result = $conn->query($sql);
    $echoes = array();
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $echoes[] = $row;
        }
    }
    
    echo json_encode($echoes);
    exit;
}

$conn->close();
?>