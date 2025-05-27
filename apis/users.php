<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");

    require_once "./dbconnection.php";


// if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
//     try {
//         $userId = $_GET['id'] ;
        
//         if (!$userId) {
//             http_response_code(400);
//             echo json_encode(['error' => 'User ID is required']);
//             exit;
//         }
        
//         $stmt = $pdo->prepare("SELECT id, full_name, email, bio FROM users WHERE id = :id");
//         $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
//         $stmt->execute();
        
//         $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
//         if ($user) {
//             echo json_encode($user);
//         } else {
//             http_response_code(404);
//             echo json_encode(['error' => 'User not found']);
//         }
//     } catch (PDOException $e) {
//         http_response_code(500);
//         echo json_encode(['error' => 'Failed to fetch user profile']);
//     }
//     exit;
// }
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_SESSION['user_id']) ) {
    try {
        $userId = $_SESSION['user_id'] ;
        
        if (!$userId) {
            http_response_code(400);
            echo json_encode(['error' => 'User ID is required']);
            exit;
        }
        
        $stmt = $pdo->prepare("SELECT id, full_name, email, bio FROM users WHERE id = :id");
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch user profile']);
    }
    exit;
}
// GET Endpoint - Fetch user profile
else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // In a real app, you'd get user ID from session/token
        $userId = 1; // Example - replace with actual auth logic
        
        $stmt = $pdo->prepare("SELECT id, full_name, email, bio FROM users WHERE id = :id");
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch user profile']);
    }
    exit;
}

// PUT Endpoint - Update existing user
else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    session_start();
    $userId = $_SESSION['user_id'] ;
    
    if (!$userId) {
        http_response_code(400);
        echo json_encode(['error' => 'User ID is required']);
        exit;
    }
    
    // Validation
    $errors = [];
    if (empty($data['full_name'])) $errors[] = 'Full name is required';
    if (empty($data['email'])) $errors[] = 'Email is required';
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email format';
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['error' => implode(', ', $errors)]);
        exit;
    }
    
    try {
        // Check if email exists for other users
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email AND id != :id");
        $stmt->execute([':email' => $data['email'], ':id' => $userId]);
        if ($stmt->fetch()) {
            http_response_code(400);
            echo json_encode(['error' => 'Email already in use']);
            exit;
        }
        
        // Prepare update query
        $updateFields = [
            ':full_name' => $data['full_name'],
            ':email' => $data['email'],
            ':bio' => $data['bio'] ?? null,
            ':id' => $userId
        ];
        
        $passwordUpdate = '';
        if (!empty($data['password'])) {
            $passwordUpdate = ', password_hash = :password';
            $updateFields[':password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        
        $query = "UPDATE users SET 
                  full_name = :full_name,
                  email = :email,
                  bio = :bio
                  {$passwordUpdate}
                  WHERE id = :id";
        
        $stmt = $pdo->prepare($query);
        $result = $stmt->execute($updateFields);
        
        if ($result) {
            echo json_encode(['message' => 'Profile updated successfully']);
        } else {
            echo json_encode(['message' => 'No changes made or user not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? ''; // This is the plain text password from the form

    try {
        // Get user including the password hash
        $stmt = $pdo->prepare("SELECT id, full_name, email, password_hash FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Verify the submitted password against the stored hash
            if ($password== $user['password_hash']) {
                // Password is correct - set session
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_name'] = $user['full_name'];
                $_SESSION['logged_in'] = true;

                // Regenerate session ID for security
                session_regenerate_id(true);

                echo json_encode([
                    'success' => true, 
                    'redirect' => 'dashboard.html',
                    'message' => 'Login successful'
                ]);
            } else {
                // Password is incorrect
                echo json_encode([
                    'success' => false, 
                    'message' => 'Invalid email or password'
                ]);
            }
        } else {
            // User not found
            echo json_encode([
                'success' => false, 
                'message' => 'Invalid email or password'
            ]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false, 
        'message' => 'Method not allowed'
    ]);
}