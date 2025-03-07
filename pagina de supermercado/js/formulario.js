document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalMensaje");
    const modalTexto = document.getElementById("modalTexto");
    const closeModal = document.querySelector(".close");
  
    // Cerrar el modal al hacer clic en la "X"
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    document
      .getElementById("formContacto")
      .addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar recargar la página
  
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get("correo");
  
        // Tiempo de espera (3 minutos en milisegundos)
        const WAIT_TIME = 180000;
        const lastSubmission = localStorage.getItem(`lastSubmission_${email}`);
  
        if (lastSubmission && Date.now() - lastSubmission < WAIT_TIME) {
          mostrarModal("Ya has enviado un mensaje recientemente. Espera 3 minutos antes de enviar otro.", "error");
          return;
        }
  
        // Cambia la dirección de correo a la que se enviarán los datos
        const FORM_SUBMIT_URL = "https://formsubmit.co/carrllodavid19@gmail.com";
  
        try {
          const response = await fetch(FORM_SUBMIT_URL, {
            method: "POST",
            body: formData,
          });
  
          if (response.ok) {
            localStorage.setItem(`lastSubmission_${email}`, Date.now());
            mostrarModal("Mensaje enviado correctamente. ¡Gracias por contactarnos!", "success");
            form.reset();
          } else {
            mostrarModal("Hubo un problema al enviar el mensaje. Intenta nuevamente.", "error");
          }
        } catch (error) {
          console.error("Error en el envío del formulario:", error);
          mostrarModal("No se pudo enviar el mensaje. Verifica tu conexión e intenta de nuevo.", "error");
        }
      });
  
    // Función para mostrar el modal con mensaje
    function mostrarModal(mensaje, tipo) {
      modalTexto.textContent = mensaje;
      modalTexto.style.color = tipo === "success" ? "green" : "red";
      modal.style.display = "block";
    }
  });
  