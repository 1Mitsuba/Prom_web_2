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
$servidor = "DESKTOP-APIBR4E\SQLEXPRESS"; 
$baseDatos = "DoguitoPetshop";
$usuario = "";     // Cambia esto a tu usuario de SQL Server
$contrasena = "";   // Cambia esto a tu contraseña

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
        // Obtener un cliente específico o listar todos
        if (isset($_GET['id'])) {
            // Buscar cliente por ID
            $id = $_GET['id'];
            try {
                $stmt = $conn->prepare("SELECT * FROM cliente WHERE id = ?");
                $stmt->execute([$id]);
                $cliente = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($cliente) {
                    echo json_encode($cliente);
                } else {
                    echo json_encode(["error" => "Cliente no encontrado"]);
                }
            } catch(PDOException $e) {
                echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
            }
        } else {
            // Listar todos los clientes
            try {
                $stmt = $conn->query("SELECT * FROM cliente");
                $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($clientes);
            } catch(PDOException $e) {
                echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
            }
        }
        break;
        
    case 'POST':
        // Crear nuevo cliente
        $datos = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($datos['nombre']) || !isset($datos['email'])) {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
            break;
        }
        
        // Generar ID único si no se proporciona
        $id = isset($datos['id']) ? $datos['id'] : uniqid('cl');
        $nombre = $datos['nombre'];
        $email = $datos['email'];
        
        try {
            $stmt = $conn->prepare("INSERT INTO cliente (id, nombre, email) VALUES (?, ?, ?)");
            $result = $stmt->execute([$id, $nombre, $email]);
            
            if ($result) {
                echo json_encode(["mensaje" => "Cliente creado", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al crear cliente"]);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear cliente: " . $e->getMessage()]);
        }
        break;
        
    case 'PUT':
        // Actualizar cliente existente
        $datos = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($datos['id']) || !isset($datos['nombre']) || !isset($datos['email'])) {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
            break;
        }
        
        $id = $datos['id'];
        $nombre = $datos['nombre'];
        $email = $datos['email'];
        
        try {
            $stmt = $conn->prepare("UPDATE cliente SET nombre = ?, email = ? WHERE id = ?");
            $stmt->execute([$nombre, $email, $id]);
            
            // Verificar filas afectadas
            if ($stmt->rowCount() > 0) {
                echo json_encode(["mensaje" => "Cliente actualizado"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Cliente no encontrado"]);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar cliente: " . $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        // Eliminar cliente
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "ID no proporcionado"]);
            break;
        }
        
        $id = $_GET['id'];
        
        try {
            $stmt = $conn->prepare("DELETE FROM cliente WHERE id = ?");
            $stmt->execute([$id]);
            
            // Verificar filas afectadas
            if ($stmt->rowCount() > 0) {
                echo json_encode(["mensaje" => "Cliente eliminado"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Cliente no encontrado"]);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar cliente: " . $e->getMessage()]);
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