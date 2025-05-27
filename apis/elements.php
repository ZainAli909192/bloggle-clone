<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require_once './dbconnection.php';

// Handle GET request to fetch saved elements
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM saved_elements ORDER BY created_at DESC");
        $elements = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $elements
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error fetching elements: ' . $e->getMessage()
        ]);
    }
    exit;
}

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['element_type'], $input['element_html'], $input['element_styles'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

try {
    // Prepare the SQL statement
    $stmt = $pdo->prepare("INSERT INTO saved_elements (element_type, element_html, element_styles, created_at) VALUES (:type, :html, :styles, NOW())");
    
    // Execute the query with named parameters
    $result = $stmt->execute([
        ':type' => $input['element_type'],
        ':html' => $input['element_html'],
        ':styles' => $input['element_styles']
    ]);
    
    if ($result) {
        $elementId = $pdo->lastInsertId();
        echo json_encode([
            'success' => true,
            'message' => 'Element saved successfully',
            'element_id' => $elementId
        ]);
    } else {
        throw new Exception('Failed to save element');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error saving element: ' . $e->getMessage()
    ]);
}

// No need to close PDO connection explicitly in this case
?>