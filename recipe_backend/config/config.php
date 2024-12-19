<?php
// Define configuration options
$allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
$allowedHeaders = ['Content-Type', 'Authorization'];
$allowedMethods = ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'];

// Set headers for CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: ' . implode(', ', $allowedMethods));
header('Access-Control-Allow-Headers: ' . implode(', ', $allowedHeaders));

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>