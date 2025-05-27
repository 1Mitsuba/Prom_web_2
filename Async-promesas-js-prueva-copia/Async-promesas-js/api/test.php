<?php
// Configura cabeceras para evitar problemas de CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Devuelve un objeto JSON simple para probar
echo json_encode([
    "status" => "ok",
    "message" => "API de prueba funcionando correctamente",
    "timestamp" => time()
]);
?>