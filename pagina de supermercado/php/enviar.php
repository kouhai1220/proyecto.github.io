<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $telefono = $_POST["telefono"]; // Se agrega el teléfono
    $mensaje = $_POST["mensaje"];

    $destinatario = "1455271@senati.pe";
    $asunto = "Nuevo mensaje de contacto";

    // Crear el contenido del correo
    $contenido = "Nombre: " . $nombre . "\n";
    $contenido .= "Correo: " . $correo . "\n";
    $contenido .= "Teléfono: " . $telefono . "\n";
    $contenido .= "Mensaje:\n" . $mensaje;

    // Establecer encabezado del correo
    $headers = "From: " . $correo . "\r\n";
    $headers .= "Correo: " . $correo . "\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

    // Enviar al correo
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        echo "¡Mensaje enviado con éxito!";
    } else {
        echo "Hubo un error al enviar el mensaje.";
    }
}
?>