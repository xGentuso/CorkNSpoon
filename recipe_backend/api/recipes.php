<?php
require_once('../config/config.php');
require_once('../config/database.php');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Test database connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Check if we're fetching a single recipe
    if (isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        
        // Get single recipe
        $query = "SELECT * FROM recipes WHERE id = ?";
        $stmt = $conn->prepare($query);
        
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param('i', $id);
        
        if (!$stmt->execute()) {
            throw new Exception("Execute failed: " . $stmt->error);
        }

        $result = $stmt->get_result();
        $recipe = $result->fetch_assoc();

        if (!$recipe) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Recipe not found'
            ]);
            exit;
        }

        echo json_encode([
            'success' => true,
            'recipes' => [$recipe]
        ]);
        exit;
    }

    // Get all recipes
    $query = "SELECT * FROM recipes ORDER BY created_at DESC";
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }

    $recipes = [];
    while ($row = $result->fetch_assoc()) {
        $recipes[] = $row;
    }

    echo json_encode([
        'success' => true,
        'recipes' => $recipes
    ]);

} catch (Exception $e) {
    error_log("Error in recipes.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
}
?>