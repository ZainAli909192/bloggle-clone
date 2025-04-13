<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once './dbconnection.php'; // Include your database connection

try {
    // Get total blog count
    $stmt = $pdo->query("SELECT COUNT(*) as total_blogs FROM blogs");
    $totalBlogs = $stmt->fetchColumn();

    // Get top performing blog (most views)
    $stmt = $pdo->query("SELECT title, views FROM blogs ORDER BY views DESC LIMIT 1");
    $topBlog = $stmt->fetch(PDO::FETCH_ASSOC);

    // Get views data for the last 7 days
    $stmt = $pdo->query("SELECT 
    DATE_FORMAT(created_at, '%Y-%m-%d') as date, 
    SUM(views) as daily_views
    FROM blogs 
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY DATE(created_at)
    ORDER BY date");
     $analytics = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'total_blogs' => $totalBlogs,
        'top_blog' => $topBlog,
        'analytics' => $analytics
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}