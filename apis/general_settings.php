<?php
header('Content-Type: application/json');
require_once 'dbconnection.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Fetch general settings
        try {
            $stmt = $pdo->query("SELECT * FROM general_settings WHERE id = 1");
            $settings = $stmt->fetch();
            if ($settings) {
                // Decode colors_json before sending
                $settings['colors_json'] = json_decode($settings['colors_json'], true);
                echo json_encode($settings);
            } else {
                // Return default if no settings found (should be handled by SQL INSERT)
                echo json_encode([
                    'id' => 1,
                    'colors_json' => ["#000000", "#FFFFFF", "", "", "", ""],
                    'personalized_css' => '.bloggle--testament-button {}'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch general settings: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        // Update general settings (always for ID 1)
        $input = json_decode(file_get_contents('php://input'), true);

        $colorsJson = isset($input['colors_json']) ? json_encode($input['colors_json']) : null;
        $personalizedCss = $input['personalized_css'] ?? null;

        if ($colorsJson === null && $personalizedCss === null) {
            http_response_code(400);
            echo json_encode(['error' => 'No fields provided for update.']);
            exit();
        }

        $updateFields = [];
        $updateValues = [];

        if ($colorsJson !== null) { $updateFields[] = 'colors_json = ?'; $updateValues[] = $colorsJson; }
        if ($personalizedCss !== null) { $updateFields[] = 'personalized_css = ?'; $updateValues[] = $personalizedCss; }

        $query = "UPDATE general_settings SET " . implode(', ', $updateFields) . " WHERE id = 1";

        try {
            $stmt = $pdo->prepare($query);
            $stmt->execute($updateValues);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'General settings updated successfully']);
            } else {
                // This case ideally shouldn't happen if the row exists due to ON DUPLICATE KEY
                http_response_code(404);
                echo json_encode(['error' => 'General settings not found or no changes made.']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update general settings: ' . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed.']);
        break;
}
?>