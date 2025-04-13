<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once "./dbconnection.php";

try {
    
    // if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //     if (isset($_GET['id'])) {
    //         $blogId = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
            
    //         $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = :id");
    //         $stmt->bindParam(':id', $blogId, PDO::PARAM_INT);
    //         $stmt->execute();
            
    //         $blog = $stmt->fetch(PDO::FETCH_ASSOC);
            
    //         if ($blog) {
    //             // Clean the content to prevent JSON errors
    //             $blog['content'] = htmlspecialchars_decode($blog['content']);
    //             echo json_encode($blog, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    //         } else {
    //             http_response_code(404);
    //             echo json_encode(['error' => 'Blog post not found']);
    //         }
    //         exit;
    //     }
    // }

        // Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    // Check if requesting a specific blog post
    if (isset($_GET['id'])) {
        $blogId = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
        
        try {
            $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = :id");
            $stmt->bindParam(':id', $blogId, PDO::PARAM_INT);
            $stmt->execute();
            
            $blog = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($blog) {
                // Clean the content to prevent JSON errors
                $blog['content'] = htmlspecialchars_decode($blog['content']);
                $blog['title'] = htmlspecialchars_decode($blog['title']);
                echo json_encode($blog, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
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
    // else {
    //     $page = isset($_GET['page']) ? filter_var($_GET['page'], FILTER_SANITIZE_NUMBER_INT) : 1;
    //     $limit = isset($_GET['limit']) ? filter_var($_GET['limit'], FILTER_SANITIZE_NUMBER_INT) : 10;
    //     $offset = ($page - 1) * $limit;
        
    //     try {
    //         // Get total count for pagination
    //         $countStmt = $pdo->query("SELECT COUNT(*) FROM blogs");
    //         $total = $countStmt->fetchColumn();
            
    //         // Get paginated results
    //         $stmt = $pdo->prepare("SELECT id, title, created_at FROM blogs ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
    //         $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    //         $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    //         $stmt->execute();
            
    //         $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
    //         echo json_encode([
    //             'data' => $blogs,
    //             'meta' => [
    //                 'total' => $total,
    //                 'page' => $page,
    //                 'limit' => $limit,
    //                 'total_pages' => ceil($total / $limit)
    //             ]
    //         ]);
    //     } catch (PDOException $e) {
    //         http_response_code(500);
    //         echo json_encode(['error' => 'Failed to fetch blog posts: ' . $e->getMessage()]);
    //     }
    // }
}

else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $sort = isset($_GET['sort']) ? $_GET['sort'] : 'updated_desc';
    
    $query = "SELECT id, title, content, screenshot_path, created_at, updated_at FROM blogs";
    $params = [];
    
    // Add search condition if provided
    if (!empty($search)) {
        $query .= " WHERE title LIKE :search";
        $params[':search'] = "%$search%";
    }
    
    // Add sorting based on the sort parameter
    switch ($sort) {
        case 'title_asc':
            $query .= " ORDER BY title ASC";
            break;
        case 'title_desc':
            $query .= " ORDER BY title DESC";
            break;
        case 'updated_asc':
            $query .= " ORDER BY updated_at ASC";
            break;
        case 'updated_desc':
        default:
            $query .= " ORDER BY updated_at DESC";
    }
    
    // Prepare and execute the query
    $stmt = $pdo->prepare($query);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->execute();
    $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Format and clean the data
    foreach ($blogs as &$blog) {
        $blog['content'] = htmlspecialchars_decode($blog['content']);
        $blog['title'] = htmlspecialchars_decode($blog['title']);
        $blog['screenshot_path'] = htmlspecialchars_decode($blog['screenshot_path']);
        
        // Format the updated_at date for display
        $updated = new DateTime($blog['updated_at']);
        $now = new DateTime();
        $interval = $updated->diff($now);
        
        if ($interval->y > 0) {
            $blog['last_update'] = "Updated " . $interval->y . " year" . ($interval->y > 1 ? "s" : "") . " ago";
        } elseif ($interval->m > 0) {
            $blog['last_update'] = "Updated " . $interval->m . " month" . ($interval->m > 1 ? "s" : "") . " ago";
        } elseif ($interval->d > 0) {
            $blog['last_update'] = "Updated " . $interval->d . " day" . ($interval->d > 1 ? "s" : "") . " ago";
        } elseif ($interval->h > 0) {
            $blog['last_update'] = "Updated " . $interval->h . " hour" . ($interval->h > 1 ? "s" : "") . " ago";
        } else {
            $blog['last_update'] = "Updated just now";
        }
    }
    
    // Return the JSON response
    echo json_encode($blogs, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    exit;
}

else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['title']) || !isset($data['content'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and content are required']);
        exit;
    }
    
    // Save screenshot if provided
    $screenshotPath = null;
    if (isset($data['screenshot']) && !empty($data['screenshot'])) {
        $screenshotPath = saveScreenshot($data['screenshot']);
    }
    
    // Database connection (adjust as needed)
    
        $stmt = $pdo->prepare("INSERT INTO blogs (title, content, screenshot_path) VALUES (:title, :content, :screenshot_path)");
        $stmt->execute([
            ':title' => $data['title'],
            ':content' => $data['content'],
            ':screenshot_path' => $screenshotPath
        ]);
        
        $newBlogId = $pdo->lastInsertId();
        echo json_encode([
            'id' => $newBlogId,
            'message' => 'Blog created successfully',
            'screenshot_path' => $screenshotPath
        ]);
}

else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get the blog ID from query parameters
    $blogId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    if ($blogId <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid blog ID']);
        exit;
    }
    
        // First, get the screenshot path to delete the file
        $stmt = $pdo->prepare("SELECT screenshot_path FROM blogs WHERE id = :id");
        $stmt->execute([':id' => $blogId]);
        $blog = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Delete the blog from database
        $stmt = $pdo->prepare("DELETE FROM blogs WHERE id = :id");
        $stmt->execute([':id' => $blogId]);
        
        // Delete the screenshot file if it exists
        if ($blog && !empty($blog['screenshot_path']) && file_exists($blog['screenshot_path'])) {
            unlink($blog['screenshot_path']);
        }
        
        echo json_encode(['success' => true, 'message' => 'Blog deleted successfully']);
    
}

else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id']) || !isset($data['title']) || !isset($data['content'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("UPDATE blogs SET title = :title, content = :content, updated_at = NOW() WHERE id = :id");
        $stmt->execute([
            ':title' => $data['title'],
            ':content' => $data['content'],
            ':id' => $data['id']
        ]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Blog updated successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Blog not found or no changes made']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}
}

catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}


function saveScreenshot($base64Image) {
    // Remove the "data:image/png;base64," part
    $base64Image = str_replace('data:image/png;base64,', '', $base64Image);
    $base64Image = str_replace(' ', '+', $base64Image);
    
    $imageData = base64_decode($base64Image);
    
    // Create directory if it doesn't exist
    $uploadDir = './img/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    // Generate unique filename
    $filename = 'blog_' . uniqid() . '.png';
    $filePath = $uploadDir . $filename;
    
    // Save the file
    if (file_put_contents($filePath, $imageData)) {
        return $filePath;
    }
    
    return null;
}


    // Handle POST request


 

