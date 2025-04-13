<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once "./dbconnection.php";
try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
        $templateId = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
        
        try {
            $stmt = $pdo->prepare("SELECT * FROM templates WHERE id = :id");
            $stmt->bindParam(':id', $templateId, PDO::PARAM_INT);
            $stmt->execute();
            
            $template = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($template) {
                // Clean the content to prevent JSON errors
                $template['content'] = htmlspecialchars_decode($template['content']);
                $template['title'] = htmlspecialchars_decode($template['title']);
                // echo json_encode($template, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
                echo json_encode(['title' => $template['title'], 'content' => $template['content']], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);

            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Template not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch template: ' . $e->getMessage()]);
        }
        exit;
    }
    // Handle GET request for a specific template
    else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
        $templateId = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
        
        try {
            $stmt = $pdo->prepare("SELECT * FROM templates WHERE id = :id");
            $stmt->bindParam(':id', $templateId, PDO::PARAM_INT);
            $stmt->execute();
            
            $template = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($template) {
                echo json_encode($template);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Template not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch template: ' . $e->getMessage()]);
        }
        exit;
    }

    // Handle GET request for all templates (with search and sort)
   else  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $search = isset($_GET['search']) ? trim($_GET['search']) : '';
        $sort = isset($_GET['sort']) ? $_GET['sort'] : 'updated_desc';
        
        $query = "SELECT id, title, content, screenshot_path, created_at, updated_at FROM templates";
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
        $templates = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format and clean the data
        foreach ($templates as &$template) {
            $template['content'] = htmlspecialchars_decode($template['content']);
            $template['title'] = htmlspecialchars_decode($template['title']);
            $template['screenshot_path'] = htmlspecialchars_decode($template['screenshot_path']);
            
            // Format the updated_at date for display
            $updated = new DateTime($template['updated_at']);
            $now = new DateTime();
            $interval = $updated->diff($now);
            
            if ($interval->y > 0) {
                $template['last_update'] = "Updated " . $interval->y . " year" . ($interval->y > 1 ? "s" : "") . " ago";
            } elseif ($interval->m > 0) {
                $template['last_update'] = "Updated " . $interval->m . " month" . ($interval->m > 1 ? "s" : "") . " ago";
            } elseif ($interval->d > 0) {
                $template['last_update'] = "Updated " . $interval->d . " day" . ($interval->d > 1 ? "s" : "") . " ago";
            } elseif ($interval->h > 0) {
                $template['last_update'] = "Updated " . $interval->h . " hour" . ($interval->h > 1 ? "s" : "") . " ago";
            } else {
                $template['last_update'] = "Updated just now";
            }
        }
        
        echo json_encode($templates, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Handle POST request to create a new template
else  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['title']) || !isset($data['content'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Title and content are required']);
            exit;
        }
        
        // Save screenshot if provided
        $screenshotPath = null;
        if (isset($data['screenshot']) && !empty($data['screenshot'])) {
            $screenshotPath = saveScreenshot($data['screenshot'], 'template_');
        }
        
        $stmt = $pdo->prepare("INSERT INTO templates (title, content, screenshot_path) VALUES (:title, :content, :screenshot_path)");
        $stmt->execute([
            ':title' => $data['title'],
            ':content' => $data['content'],
            ':screenshot_path' => $screenshotPath
        ]);
        
        $newTemplateId = $pdo->lastInsertId();
        echo json_encode([
            'id' => $newTemplateId,
            'message' => 'Template created successfully',
            'screenshot_path' => $screenshotPath
        ]);
        exit;
}
 
    else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $templateId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        
        if ($templateId <= 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid template ID']);
            exit;
        }
        
        // First, get the screenshot path to delete the file
        $stmt = $pdo->prepare("SELECT screenshot_path FROM templates WHERE id = :id");
        $stmt->execute([':id' => $templateId]);
        $template = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Delete the template from database
        $stmt = $pdo->prepare("DELETE FROM templates WHERE id = :id");
        $stmt->execute([':id' => $templateId]);
        
        // Delete the screenshot file if it exists
        if ($template && !empty($template['screenshot_path']) && file_exists($template['screenshot_path'])) {
            unlink($template['screenshot_path']);
        }
        
        echo json_encode(['success' => true, 'message' => 'Template deleted successfully']);
        exit;
}

else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id']) || !isset($data['title']) || !isset($data['content'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        
        try {
            $stmt = $pdo->prepare("UPDATE templates SET title = :title, content = :content, updated_at = NOW() WHERE id = :id");
            $stmt->execute([
                ':title' => $data['title'],
                ':content' => $data['content'],
                ':id' => $data['id']
            ]);
            
            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Template updated successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Template not found or no changes made']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        exit;
}

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

/**
 * Save screenshot to server
 * 
 * @param string $base64Image Base64 encoded image data
 * @param string $prefix File prefix (default: 'blog_')
 * @return string|null Path to saved image or null on failure
 */
function saveScreenshot($base64Image, $prefix = 'blog_') {
    // Remove the "data:image/png;base64," part
    $base64Image = str_replace('data:image/png;base64,', '', $base64Image);
    $base64Image = str_replace(' ', '+', $base64Image);
    
    $imageData = base64_decode($base64Image);
    
    // Create directory if it doesn't exist
    $uploadDir = './img/templates';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    // Generate unique filename
    $filename = $prefix . uniqid() . '.png';
    $filePath = $uploadDir . $filename;
    
    // Save the file
    if (file_put_contents($filePath, $imageData)) {
        return $filePath;
    }
    
    return null;
}
