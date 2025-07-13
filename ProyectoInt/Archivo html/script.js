function validarLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validación básica (solo para demostración)
  if (email === "Danielceron546@gmail.com" && password === "1234") {
    window.location.href = "home.html";
  } else {
    alert("Correo o contraseña incorrectos.");
  }

  return false; // evita que el formulario se recargue
}document.addEventListener("DOMContentLoaded", () => {
  // Función para manejar "Me gusta"
  document.querySelectorAll(".btn-like").forEach(button => {
    button.addEventListener("click", () => {
      const counter = button.querySelector(".like-count");
      let current = parseInt(counter.textContent);
      counter.textContent = current + 1;
    });
  });

  // Mostrar/ocultar comentarios
  document.querySelectorAll(".btn-toggle-comments").forEach(button => {
    button.addEventListener("click", () => {
      const commentSection = button.nextElementSibling;
      commentSection.style.display =
        commentSection.style.display === "none" ? "block" : "none";
    });
  });

  // Agregar nuevos comentarios
  document.querySelectorAll(".btn-add-comment").forEach(button => {
    button.addEventListener("click", () => {
      const input = button.previousElementSibling;
      const text = input.value.trim();
      if (text !== "") {
        const commentList = button.parentElement.querySelector(".comment-list");
        const newComment = document.createElement("p");
        newComment.innerHTML = `<strong>Tú:</strong> ${text}`;
        commentList.appendChild(newComment);
        input.value = "";

        const count = button.parentElement.previousElementSibling.querySelector(".comment-count");
        count.textContent = parseInt(count.textContent) + 1;
      }
      
    });
  });
});
function actualizarHora() {
  const reloj = document.getElementById("hora-actual");
  const ahora = new Date();

  let horas = ahora.getHours().toString().padStart(2, '0');
  let minutos = ahora.getMinutes().toString().padStart(2, '0');

  reloj.textContent = `${horas}:${minutos}`;
}

// Mostrar hora al cargar
actualizarHora();

// Actualizar cada minuto
setInterval(actualizarHora, 60000);

// Funciones para el modal de publicación
function mostrarModalPublicacion() {
  const modal = document.getElementById('modalPublicacion');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevenir scroll
  
  // Animación de entrada
  modal.style.animation = 'fadeIn 0.3s ease-out';
}

function cerrarModal() {
  const modal = document.getElementById('modalPublicacion');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
  const modal = document.getElementById('modalPublicacion');
  if (event.target === modal) {
    cerrarModal();
  }
}

// Manejar envío del formulario
document.addEventListener('DOMContentLoaded', function() {
  const formPublicacion = document.getElementById('formPublicacion');
  if (formPublicacion) {
    formPublicacion.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simular procesamiento de pago
      const btnPublicar = document.querySelector('.btn-publicar');
      btnPublicar.textContent = 'Procesando pago...';
      btnPublicar.disabled = true;
      
      setTimeout(() => {
        alert('¡Publicación creada exitosamente! Se ha cobrado $20.00 MXN de tu cuenta.');
        cerrarModal();
        formPublicacion.reset();
        btnPublicar.textContent = 'Publicar ($20.00)';
        btnPublicar.disabled = false;
      }, 2000);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".chat-input input");
  const button = document.querySelector(".chat-input button");
  const messages = document.querySelector(".chat-messages");

  button.addEventListener("click", () => {
    const text = input.value.trim();
    if (text !== "") {
      const newMessage = document.createElement("div");
      newMessage.classList.add("message", "enviado");
      newMessage.textContent = text;
      messages.appendChild(newMessage);
      input.value = "";
      messages.scrollTop = messages.scrollHeight;
    }
  });
});
// Datos de ejemplo para simular resultados de búsqueda
const personas = [
  { nombre: "María López", ciudad: "Tula", intereses: "Voluntariado, salud" },
  { nombre: "Carlos Pérez", ciudad: "Pachuca", intereses: "Educación, deportes" }
];
const publicaciones = [
  { titulo: "Se busca voluntario para comedor", desc: "Ayuda en comedor comunitario los sábados." },
  { titulo: "Donación de ropa", desc: "Recibimos ropa en buen estado para familias necesitadas." }
];
const voluntarios = [
  { nombre: "Ana Torres", especialidad: "Psicología" },
  { nombre: "Luis Gómez", especialidad: "Enfermería" }
];

// Función para renderizar resultados
function renderResults(arr, container, type) {
  container.innerHTML = "";
  if (arr.length === 0) {
    container.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }
  arr.forEach(item => {
    let html = "";
    if (type === "personas") {
      html = `<div class="search-item"><strong>${item.nombre}</strong><br><span>${item.ciudad}</span><br><small>Intereses: ${item.intereses}</small></div>`;
    } else if (type === "publicaciones") {
      html = `<div class="search-item"><strong>${item.titulo}</strong><br><span>${item.desc}</span></div>`;
    } else if (type === "voluntarios") {
      html = `<div class="search-item"><strong>${item.nombre}</strong><br><small>Especialidad: ${item.especialidad}</small></div>`;
    }
    container.innerHTML += html;
  });
}

// Inicializar con todos los resultados
document.addEventListener("DOMContentLoaded", () => {
  renderResults(personas, document.getElementById("personas-results"), "personas");
  renderResults(publicaciones, document.getElementById("publicaciones-results"), "publicaciones");
  renderResults(voluntarios, document.getElementById("voluntarios-results"), "voluntarios");

  // Tabs animadas
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // Búsqueda en tiempo real
  document.getElementById("searchInput").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    renderResults(
      personas.filter(p => p.nombre.toLowerCase().includes(q) || p.ciudad.toLowerCase().includes(q) || p.intereses.toLowerCase().includes(q)),
      document.getElementById("personas-results"),
      "personas"
    );
    renderResults(
      publicaciones.filter(p => p.titulo.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)),
      document.getElementById("publicaciones-results"),
      "publicaciones"
    );
    renderResults(
      voluntarios.filter(v => v.nombre.toLowerCase().includes(q) || v.especialidad.toLowerCase().includes(q)),
      document.getElementById("voluntarios-results"),
      "voluntarios"
    );
  });
});
