document.addEventListener("DOMContentLoaded", function () {
  // Verificar si es la página de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
      loginForm.addEventListener("submit", loginValidation);
  }

  // Verificar si es la página de registro
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
      registerForm.addEventListener("submit", registerValidation);
  }

  // Mostrar usuario si está autenticado
  showUserInfo();
});

// Obtener usuarios desde localStorage o inicializar con usuarios predefinidos
const users = JSON.parse(localStorage.getItem("users")) || {
  "usuario1": { password: "contraseña123", fullname: "Juan Pérez" },
  "usuario2": { password: "contraseña456", fullname: "Ana Gómez" }
};
localStorage.setItem("users", JSON.stringify(users));

// Mostrar información del usuario
function showUserInfo() {
  const userInfo = document.getElementById("userInfo");
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser) {
      if (userInfo) {
          userInfo.textContent = `Hola, ${loggedUser.fullname}`;
      }
      if (loginLink) {
          loginLink.style.display = "none";
      }
      if (logoutBtn) {
          logoutBtn.style.display = "inline-block";
      }
  } else {
      if (userInfo) {
          userInfo.textContent.display = "none";
      }
      if (loginLink) {
          loginLink.style.display = "inline";
      }
      if (logoutBtn) {
          logoutBtn.style.display = "none";
      }
  }
}

// Validación de inicio de sesión
function loginValidation(event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const storedUsers = JSON.parse(localStorage.getItem("users")) || {};

  if (storedUsers[username] && storedUsers[username].password === password) {
      localStorage.setItem("loggedUser", JSON.stringify({ username, fullname: storedUsers[username].fullname }));
      alert("Inicio de sesión exitoso");
      window.location.href = "index.html";  // Redirige a la página principal (ajusta la ruta según la ubicación)
  } else {
      alert("Usuario o contraseña incorrectos");
  }
}

// Validación de registro
function registerValidation(event) {
  event.preventDefault();

  const username = document.getElementById("registerUsername").value.trim();
  const fullname = document.getElementById("registerFullname").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!username || !fullname || !password) {
      alert("Todos los campos son obligatorios");
      return;
  }

  let storedUsers = JSON.parse(localStorage.getItem("users")) || {};

  if (storedUsers[username]) {
      alert("El usuario ya existe");
  } else {
      storedUsers[username] = { password, fullname };
      localStorage.setItem("users", JSON.stringify(storedUsers));
      alert("Registro exitoso, ahora puedes iniciar sesión");
      window.location.href = "login.html";  // Redirige a la página de login (ajusta la ruta si es necesario)
  }
}

// Cerrar sesión
function logout() {
  localStorage.removeItem("loggedUser");
  alert("Has cerrado sesión");
  window.location.href = "index.html";  // Redirige a la página principal (ajusta la ruta según la ubicación)
}
