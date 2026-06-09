<?php
session_start();
$host = "localhost";
$user = "root";
$pass = "";
$db   = "wuthering_waves_db";

$conn = new mysqli($host, $user, $pass, $db);

if($conn->connect_error)
{
    echo json_encode([
        "success"=>false,
        "message"=>"Database connection failed"
    ]);
    exit;
}

header("Content-Type: application/json");

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$user_id = $_SESSION["user_id"];
$action = $_GET["action"] ?? "";

// 1. 添加 / 取消收藏
if ($action == "toggle") {
    $data = json_decode(file_get_contents("php://input"), true);
    $item_type = $data["item_type"];
    $item_id = $data["item_id"];

    // 检查是否已经收藏
    $stmt = $conn->prepare("SELECT favorite_id FROM favorites WHERE user_id=? AND item_type=? AND item_id=?");
    $stmt->bind_param("isi", $user_id, $item_type, $item_id);
    $stmt->execute();
    
    if ($stmt->get_result()->num_rows > 0) {
        $del = $conn->prepare("DELETE FROM favorites WHERE user_id=? AND item_type=? AND item_id=?");
        $del->bind_param("isi", $user_id, $item_type, $item_id);
        $del->execute();
        echo json_encode(["success" => true, "status" => "removed"]);
    } else {
        $ins = $conn->prepare("INSERT INTO favorites (user_id, item_type, item_id) VALUES (?,?,?)");
        $ins->bind_param("isi", $user_id, $item_type, $item_id);
        $ins->execute();
        echo json_encode(["success" => true, "status" => "added"]);
    }
    exit;
}

// 2. 检查某个物品是否被当前用户收藏了 (用于进入详情页时自动变红)
if ($action == "check") {
    $item_type = $_GET["item_type"];
    $item_id = $_GET["item_id"];
    
    $stmt = $conn->prepare("SELECT favorite_id FROM favorites WHERE user_id=? AND item_type=? AND item_id=?");
    $stmt->bind_param("isi", $user_id, $item_type, $item_id);
    $stmt->execute();
    
    echo json_encode(["is_favorite" => ($stmt->get_result()->num_rows > 0)]);
    exit;
}

// 3. 获取用户所有的收藏 (用于 My Favorites 页面)
if ($action == "get_all") {
    $stmt = $conn->prepare("SELECT item_type, item_id FROM favorites WHERE user_id=? ORDER BY favorite_id DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $favs = [];
    while ($row = $result->fetch_assoc()) { 
        $favs[] = $row; 
    }
    echo json_encode($favs);
    exit;
}

?>