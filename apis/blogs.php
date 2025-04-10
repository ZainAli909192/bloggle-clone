<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration
$dbHost = 'localhost';
$dbName = 'bloggle-clone';
$dbUser = 'root';
$dbPass = '';

// Connect to database
try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Handle POST request
// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (empty($data['content'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Content is required']);
        exit;
    }
    
    $title = $data['title'] ?? 'Untitled Post';
    $content = $data['content'];
    
    try {
        // Start transaction
        $pdo->beginTransaction();
        
        // Get current maximum ID
        $stmt = $pdo->query("SELECT MAX(id) as max_id FROM blogs");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $newId = ($result['max_id'] ?? 0) + 1;
        
        // Insert with explicit ID
        $stmt = $pdo->prepare("INSERT INTO blogs (id, title, content) VALUES (:id, :title, :content)");
        $stmt->bindParam(':id', $newId, PDO::PARAM_INT);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $content);
        $stmt->execute();
        
        // Commit transaction
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Blog post created successfully',
            'id' => $newId
        ]);
    } catch (PDOException $e) {
        // Rollback on error
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save blog post: ' . $e->getMessage()]);
    }
}
// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if requesting a specific blog post
    if (isset($_GET['id'])) {
        $blogId = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
        
        try {
            $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = :id");
            $stmt->bindParam(':id', $blogId, PDO::PARAM_INT);
            $stmt->execute();
            
            $blog = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($blog) {
                echo json_encode($blog);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Blog post not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch blog post: ' . $e->getMessage()]);
        }
    } 
    // If no ID provided, return all blog posts (with optional pagination)
    else {
        $page = isset($_GET['page']) ? filter_var($_GET['page'], FILTER_SANITIZE_NUMBER_INT) : 1;
        $limit = isset($_GET['limit']) ? filter_var($_GET['limit'], FILTER_SANITIZE_NUMBER_INT) : 10;
        $offset = ($page - 1) * $limit;
        
        try {
            // Get total count for pagination
            $countStmt = $pdo->query("SELECT COUNT(*) FROM blogs");
            $total = $countStmt->fetchColumn();
            
            // Get paginated results
            $stmt = $pdo->prepare("SELECT id, title, created_at FROM blogs ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            
            $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode([
                'data' => $blogs,
                'meta' => [
                    'total' => $total,
                    'page' => $page,
                    'limit' => $limit,
                    'total_pages' => ceil($total / $limit)
                ]
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch blog posts: ' . $e->getMessage()]);
        }
    }
}
