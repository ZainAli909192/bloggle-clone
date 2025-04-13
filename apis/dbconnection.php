<?php
// Database configuration
$dbHost = 'localhost';
$dbName = 'bloggle-clone';
$dbUser = 'root';
$dbPass = '';

$pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>