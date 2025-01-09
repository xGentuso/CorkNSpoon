<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Specific CORS headers for localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "X-RapidAPI-Host: tasty.p.rapidapi.com",
            "X-RapidAPI-Key: 20a5449258msh75caf71cc4d39dap1ea7bajsn7b82d1d5e657"
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        throw new Exception("cURL Error #:" . $err);
    }

    // Ensure valid JSON response
    $decoded = json_decode($response);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON response from Tasty API');
    }

    echo $response;

} catch (Exception $e) {
    error_log("Error in tasty-recipes.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?> 