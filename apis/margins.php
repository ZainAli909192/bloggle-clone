<?php
header('Content-Type: application/json');
require_once 'dbconnection.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Fetch margin settings
        try {
            $stmt = $pdo->query("SELECT * FROM margins WHERE id = 1");
            $margins = $stmt->fetch();
            if ($margins) {
                echo json_encode($margins);
            } else {
                // Return default if no settings found (should be handled by SQL INSERT)
                echo json_encode([
                    'id' => 1,
                    'top_desktop' => '60', 'bottom_desktop' => '60',
                    'top_tablet' => '60', 'bottom_tablet' => '60',
                    'top_mobile' => '60', 'bottom_mobile' => '60',
                    'left_desktop' => '60', 'right_desktop' => '60',
                    'left_tablet' => '60', 'right_tablet' => '60',
                    'left_mobile' => '60', 'right_mobile' => '60'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch margin settings: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        // Update margin settings (always for ID 1)
        $input = json_decode(file_get_contents('php://input'), true);

        $updateFields = [];
        $updateValues = [];

        // Dynamically build the UPDATE query
        $marginFields = [
            'top_desktop', 'bottom_desktop', 'top_tablet', 'bottom_tablet',
            'top_mobile', 'bottom_mobile', 'left_desktop', 'right_desktop',
            'left_tablet', 'right_tablet', 'left_mobile', 'right_mobile'
        ];

        foreach ($marginFields as $field) {
            if (isset($input[$field])) {
                $updateFields[] = "`$field` = ?"; // Use backticks for column names
                $updateValues[] = $input[$field];
            }
        }

        if (empty($updateFields)) {
            http_response_code(400);
            echo json_encode(['error' => 'No fields provided for update.']);
            exit();
        }

        $query = "UPDATE margins SET " . implode(', ', $updateFields) . " WHERE id = 1";

        try {
            $stmt = $pdo->prepare($query);
            $stmt->execute($updateValues);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Margin settings updated successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Margin settings not found or no changes made.']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update margin settings: ' . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed.']);
        break;
}
?>