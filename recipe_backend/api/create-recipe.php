<?php
require_once('../config/config.php');
require_once('../config/database.php');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Enable CORS - Update with your React app's URL
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (empty($data['title']) || empty($data['instructions'])) {
        throw new Exception('Title and instructions are required');
    }

    // Prepare the SQL statement to match your schema
    $query = "INSERT INTO recipes (
        title,
        description,
        instructions,
        prep_time,
        cook_time,
        difficulty,
        author,
        created_at,
        updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";

    $stmt = $conn->prepare($query);
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    // Set default values
    $description = $data['ingredients'] ?? ''; // Using ingredients as description for now
    $prep_time = 0; // Default prep time
    $cook_time = intval($data['cookingTime']);
    $difficulty = $data['difficulty'] ?? 'easy';
    $author = 'Anonymous'; // Default author

    // Bind parameters
    $stmt->bind_param(
        'sssssss',
        $data['title'],
        $description,
        $data['instructions'],
        $prep_time,
        $cook_time,
        $difficulty,
        $author
    );

    // Execute the statement
    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    // Get the ID of the newly created recipe
    $recipeId = $stmt->insert_id;

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Recipe created successfully',
        'recipeId' => $recipeId
    ]);

} catch (Exception $e) {
    error_log("Error in create-recipe.php: " . $e->getMessage());
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