<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Manejar las solicitudes OPTIONS (importante para preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Configuración de la base de datos con PDO (alternativa a sqlsrv)
$servidor = "localhost\\SQLEXPRESS"; 
$baseDatos = "tienda_online";
$usuario = "tu_usuario";     // Cambia esto a tu usuario de SQL Server
$contrasena = "tu_contraseña";   // Cambia esto a tu contraseña

try {
    // Conexión usando PDO para SQL Server
    $conn = new PDO("sqlsrv:Server=$servidor;Database=$baseDatos", $usuario, $contrasena);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit;
}

// Determinar el método HTTP
$metodo = $_SERVER['REQUEST_METHOD'];

// Procesar según el método HTTP
switch ($metodo) {
    case 'GET':
        // Obtener una mascota específica o listar todas
        if (isset($_GET['id'])) {
            // Buscar mascota por ID
            $id = $_GET['id'];
            try {
                $stmt = $conn->prepare("SELECT p.*, c.nombre as dueno_nombre FROM pet p LEFT JOIN cliente c ON p.id = c.id WHERE p.id_pet = ?");
                $stmt->execute([$id]);
                $mascota = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($mascota) {
                    echo json_encode($mascota);
                } else {
                    echo json_encode(["error" => "Mascota no encontrada"]);
                }
            } catch(PDOException $e) {
                echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
            }
        } else {
            // Listar todas las mascotas
            try {
                $stmt = $conn->query("SELECT p.*, c.nombre as dueno_nombre FROM pet p LEFT JOIN cliente c ON p.id = c.id");
                $mascotas = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($mascotas);
            } catch(PDOException $e) {
                echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
            }
        }
        break;
        
    case 'POST':
        // Crear nueva mascota
        $datos = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($datos['nombre']) || !isset($datos['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
            break;
        }
        
        // Generar ID único si no se proporciona
        $id_pet = isset($datos['id_pet']) ? $datos['id_pet'] : uniqid('pet');
        $nombre = $datos['nombre'];
        $raza = isset($datos['raza']) ? $datos['raza'] : null;
        $edad = isset($datos['edad']) ? $datos['edad'] : null;
        $dueno_id = $datos['id']; // ID del cliente (dueño)
        
        try {
            $stmt = $conn->prepare("INSERT INTO pet (id_pet, nombre, raza, edad, id) VALUES (?, ?, ?, ?, ?)");
            $result = $stmt->execute([$id_pet, $nombre, $raza, $edad, $dueno_id]);
            
            if ($result) {
                echo json_encode(["mensaje" => "Mascota creada", "id_pet" => $id_pet]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al crear mascota"]);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear mascota: " . $e->getMessage()]);
        }
        break;
        
    case 'PUT':
        // Actualizar mascota existente
        $datos = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($datos['id_pet']) || !isset($datos['nombre'])) {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
            break;
        }
        
        $id_pet = $datos['id_pet'];
        $nombre = $datos['nombre'];
        $raza = isset($datos['raza']) ? $datos['raza'] : null;
        $edad = isset($datos['edad']) ? $datos['edad'] : null;
        $dueno_id = isset($datos['id']) ? $datos['id'] : null;
        
        try {
            $sql = "UPDATE pet SET nombre = ?, raza = ?, edad = ?";
            $params = [$nombre, $raza, $edad];
            
            // Si se proporciona un dueño, actualizarlo también
            if ($dueno_id) {
                $sql .= ", id = ?";
                $params[] = $dueno_id;
            }
            
            $sql .= " WHERE id_pet = ?";
            $params[] = $id_pet;
            
            $stmt = $conn->prepare($sql);
            $stmt->execute($params);
            
            // Verificar filas afectadas
            if ($stmt->rowCount() > 0) {
                echo json_encode(["mensaje" => "Mascota actualizada"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Mascota no encontrada"]);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar mascota: " . $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        // Eliminar mascota
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "ID no proporcionado"]);
            break;
        }
        
        $id = $_GET['id'];
        
        try {
            $stmt = $conn->prepare("DELETE FROM pet WHERE id_pet = ?");
            $stmt->execute([$id]);
            
            // Verificar filas afectadas
            if ($stmt->rowCount() > 0) {
                echo json_encode(["mensaje" => "Mascota eliminada"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Mascota no encontrada"]);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar mascota: " . $e->getMessage()]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

// Cerrar la conexión
$conn = null;
?>