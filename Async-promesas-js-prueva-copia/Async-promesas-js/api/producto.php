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
        // Obtener un producto específico o listar todos
        if (isset($_GET['id'])) {
            // Buscar producto por ID
            $id = $_GET['id'];
            try {
                $stmt = $conn->prepare("SELECT * FROM producto WHERE id_pro = ?");
                $stmt->execute([$id]);
                $producto = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($producto) {
                    echo json_encode($producto);
                } else {
                    echo json_encode(["error" => "Producto no encontrado"]);
                }
            } catch(PDOException $e) {
                echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
            }
        } else {
            // Listar todos los productos
            try {
                $stmt = $conn->query("SELECT * FROM producto");
                $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($productos);
            } catch(PDOException $e) {
                echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
            }
        }
        break;
        
    case 'POST':
        // Crear nuevo producto
        $datos = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($datos['nombre']) || !isset($datos['precio'])) {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
            break;
        }
        
        // Generar ID único si no se proporciona
        $id = isset($datos['id_pro']) ? $datos['id_pro'] : uniqid('prod');
        $nombre = $datos['nombre'];
        $precio = $datos['precio'];
        $descripcion = isset($datos['descripcion']) ? $datos['descripcion'] : null;
        
        try {
            $stmt = $conn->prepare("INSERT INTO producto (id_pro, nombre, precio, descripcion) VALUES (?, ?, ?, ?)");
            $result = $stmt->execute([$id, $nombre, $precio, $descripcion]);
            
            if ($result) {
                echo json_encode(["mensaje" => "Producto creado", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al crear producto"]);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear producto: " . $e->getMessage()]);
        }
        break;
        
    case 'PUT':
        // Actualizar producto existente
        $datos = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($datos['id_pro']) || !isset($datos['nombre'])) {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
            break;
        }
        
        $id = $datos['id_pro'];
        $nombre = $datos['nombre'];
        $precio = isset($datos['precio']) ? $datos['precio'] : 0;
        $descripcion = isset($datos['descripcion']) ? $datos['descripcion'] : null;
        
        try {
            $stmt = $conn->prepare("UPDATE producto SET nombre = ?, precio = ?, descripcion = ? WHERE id_pro = ?");
            $stmt->execute([$nombre, $precio, $descripcion, $id]);
            
            // Verificar filas afectadas
            if ($stmt->rowCount() > 0) {
                echo json_encode(["mensaje" => "Producto actualizado"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Producto no encontrado"]);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar producto: " . $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        // Eliminar producto
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "ID no proporcionado"]);
            break;
        }
        
        $id = $_GET['id'];
        
        try {
            $stmt = $conn->prepare("DELETE FROM producto WHERE id_pro = ?");
            $stmt->execute([$id]);
            
            // Verificar filas afectadas
            if ($stmt->rowCount() > 0) {
                echo json_encode(["mensaje" => "Producto eliminado"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Producto no encontrado"]);
            }
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar producto: " . $e->getMessage()]);
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