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
    // 🌟 核心修复点：让数据库同时放过 'Any' 和 'All'
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
    $rarity = isset($_GET['rarity']) ? $_GET['rarity'] : ''; // 🌟 新增

    $sql = "SELECT * FROM weapons WHERE 1=1";
    
    if (!empty($search)) {
        $keyword = $conn->real_escape_string($search);
        $sql .= " AND name LIKE '%$keyword%'";
    }
    if (!empty($type) && $type !== 'All') {
        $type_str = $conn->real_escape_string($type);
        $sql .= " AND type = '$type_str'";
    }
    // 🌟 增加星级过滤逻辑
    if (!empty($rarity) && $rarity !== 'All') {
        $rar = $conn->real_escape_string($rarity);
        $sql .= " AND rarity = '$rar'";
    }

    $result = $conn->query($sql);
    $data = [];
    if ($result) { while($row = $result->fetch_assoc()) { $data[] = $row; } }
    echo json_encode($data);
}

if ($action == 'get_echoes') {
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $cost = isset($_GET['cost']) ? $_GET['cost'] : '';
    $phantom = isset($_GET['phantom']) ? $_GET['phantom'] : '';
    $sql = "SELECT * FROM echoes WHERE 1=1";
    if (!empty($search)) {
        $keyword = $conn->real_escape_string($search);
        $sql .= " AND name LIKE '%$keyword%'";
    }
    if (!empty($cost)) {
        $cost_num = $conn->real_escape_string($cost);
        $sql .= " AND cost = $cost_num";
    }
    if ($phantom === '1') {
        $sql .= " AND is_phantom = 1";
    }
    $result = $conn->query($sql);
    $data = [];
    if ($result) { while($row = $result->fetch_assoc()) { $data[] = $row; } }
    echo json_encode($data);
}

$conn->close();
?>