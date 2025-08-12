/*
 * CHARITY - PLATAFORMA DE TRABAJO
 * Archivo JavaScript principal
 * 
 * Este archivo contiene las funciones comunes utilizadas en toda la aplicación,
 * incluyendo manejo de tiempo, navegación y utilidades generales.
 */

/**
 * Actualiza el reloj en tiempo real
 * Se ejecuta cada segundo para mostrar la hora actual
 */
function actualizarReloj() {
  const ahora = new Date();
  const hora = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  const tiempoString = `${hora}:${minutos}`;
  
  // Buscar elementos de tiempo en todas las páginas
  const elementosTiempo = document.querySelectorAll('.time, #hora-actual');
  elementosTiempo.forEach(elemento => {
    elemento.textContent = tiempoString;
  });
}

/**
 * Inicializa el reloj cuando se carga la página
 * Configura la actualización automática cada segundo
 */
function inicializarReloj() {
  actualizarReloj(); // Actualización inmediata
  setInterval(actualizarReloj, 1000); // Actualización cada segundo
}

/**
 * Navega a una página específica
 * @param {string} pagina - Nombre del archivo HTML de destino
 */
function navegarA(pagina) {
  window.location.href = pagina;
}

/**
 * Valida si un campo de entrada está vacío
 * @param {string} valor - Valor del campo a validar
 * @returns {boolean} - True si está vacío, False si tiene contenido
 */
function campoVacio(valor) {
  return !valor || valor.trim() === '';
}

/**
 * Muestra un mensaje de alerta personalizado
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de mensaje ('success', 'error', 'warning')
 */
function mostrarMensaje(mensaje, tipo = 'info') {
  // Crear elemento de mensaje
  const mensajeDiv = document.createElement('div');
  mensajeDiv.className = `mensaje mensaje-${tipo}`;
  mensajeDiv.textContent = mensaje;
  
  // Estilos del mensaje
  mensajeDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  `;
  
  // Colores según el tipo
  switch (tipo) {
    case 'success':
      mensajeDiv.style.background = '#28a745';
      break;
    case 'error':
      mensajeDiv.style.background = '#dc3545';
      break;
    case 'warning':
      mensajeDiv.style.background = '#ffc107';
      mensajeDiv.style.color = '#212529';
      break;
    default:
      mensajeDiv.style.background = '#17a2b8';
  }
  
  // Agregar al DOM
  document.body.appendChild(mensajeDiv);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    mensajeDiv.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (mensajeDiv.parentNode) {
        mensajeDiv.parentNode.removeChild(mensajeDiv);
      }
    }, 300);
  }, 3000);
}

/**
 * Formatea una fecha en formato legible
 * @param {Date} fecha - Fecha a formatear
 * @returns {string} - Fecha formateada como "DD/MM/YYYY, HH:MM"
 */
function formatearFecha(fecha) {
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const año = fecha.getFullYear();
  const hora = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  
  return `${dia}/${mes}/${año}, ${hora}:${minutos}`;
}

/**
 * Genera un ID único para elementos
 * @returns {string} - ID único basado en timestamp y número aleatorio
 */
function generarIdUnico() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Guarda datos en localStorage con manejo de errores
 * @param {string} clave - Clave para almacenar los datos
 * @param {any} datos - Datos a guardar
 * @returns {boolean} - True si se guardó correctamente, False si hubo error
 */
function guardarEnStorage(clave, datos) {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
    return true;
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
    mostrarMensaje('Error al guardar los datos', 'error');
    return false;
  }
}

/**
 * Recupera datos de localStorage con manejo de errores
 * @param {string} clave - Clave de los datos a recuperar
 * @param {any} valorPorDefecto - Valor a retornar si no se encuentran datos
 * @returns {any} - Datos recuperados o valor por defecto
 */
function obtenerDeStorage(clave, valorPorDefecto = null) {
  try {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : valorPorDefecto;
  } catch (error) {
    console.error('Error al obtener de localStorage:', error);
    return valorPorDefecto;
  }
}

/**
 * Valida un formulario verificando campos requeridos
 * @param {HTMLFormElement} formulario - Elemento del formulario a validar
 * @returns {boolean} - True si el formulario es válido, False si hay errores
 */
function validarFormulario(formulario) {
  const camposRequeridos = formulario.querySelectorAll('[required]');
  let esValido = true;
  
  camposRequeridos.forEach(campo => {
    if (campoVacio(campo.value)) {
      campo.style.borderColor = '#dc3545';
      esValido = false;
    } else {
      campo.style.borderColor = '';
    }
  });
  
  return esValido;
}

/**
 * Limpia los estilos de error de un formulario
 * @param {HTMLFormElement} formulario - Formulario a limpiar
 */
function limpiarErroresFormulario(formulario) {
  const campos = formulario.querySelectorAll('input, select, textarea');
  campos.forEach(campo => {
    campo.style.borderColor = '';
  });
}

/**
 * Inicialización cuando se carga el documento
 * Configura funciones básicas de la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar el reloj
  if (typeof inicializarReloj === 'function') inicializarReloj();

  // Configurar navegación por teclado
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const filtrosPanel = document.getElementById('filtros-panel');
      if (filtrosPanel && filtrosPanel.style.display === 'block') {
        if (typeof toggleFiltros === 'function') toggleFiltros();
      }
    }
  });

  // Mensaje de bienvenida solo en home.html
  if (window.location.pathname.includes('home.html') || window.location.pathname.endsWith('/')) {
    setTimeout(() => {
      if (typeof mostrarMensaje === 'function') mostrarMensaje('¡Bienvenido a Charity!', 'success');
    }, 1000);
  }

  // Función para manejar "Me gusta"
  document.querySelectorAll(".btn-like").forEach(button => {
    button.addEventListener("click", () => {
      const counter = button.querySelector(".like-count");
      if (counter) {
        let current = parseInt(counter.textContent);
        counter.textContent = current + 1;
      }
    });
  });

  // Mostrar/ocultar comentarios
  document.querySelectorAll(".btn-toggle-comments").forEach(button => {
    button.addEventListener("click", () => {
      const commentSection = button.nextElementSibling;
      if (commentSection) {
        commentSection.style.display =
          commentSection.style.display === "none" ? "block" : "none";
      }
    });
  });

  // Agregar nuevos comentarios
  document.querySelectorAll(".btn-add-comment").forEach(button => {
    button.addEventListener("click", () => {
      const input = button.previousElementSibling;
      if (!input) return;
      const text = input.value.trim();
      if (text !== "") {
        const commentList = button.parentElement.querySelector(".comment-list");
        if (commentList) {
          const newComment = document.createElement("p");
          newComment.innerHTML = `<strong>Tú:</strong> ${text}`;
          commentList.appendChild(newComment);
        }
        input.value = "";

        const count = button.parentElement.previousElementSibling?.querySelector(".comment-count");
        if (count) count.textContent = parseInt(count.textContent) + 1;
      }
    });
  });

  // Chat input (solo si existe)
  const chatInput = document.querySelector(".chat-input input");
  // Toggle de tema claro/oscuro
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else if (!savedTheme) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    const isBgDark = /rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)/.test(bodyBg) || /#000/i.test(document.body.style.background || '');
    if (prefersDark || isBgDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // Chips de filtros en home
  const chips = document.getElementById('chips-filtros');
  if (chips) {
    chips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const type = chip.dataset.type;
      const value = chip.dataset.value;
      chip.classList.toggle('selected');
      if (typeof aplicarFiltroChip === 'function') {
        aplicarFiltroChip(type, value, chip.classList.contains('selected'));
      }
    });
  }
  const chatButton = document.querySelector(".chat-input button");
  const chatMessages = document.querySelector(".chat-messages");
  if (chatInput && chatButton && chatMessages) {
    chatButton.addEventListener("click", () => {
      const text = chatInput.value.trim();
      if (text !== "") {
        const newMessage = document.createElement("div");
        newMessage.classList.add("message", "enviado");
        newMessage.textContent = text;
        chatMessages.appendChild(newMessage);
        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });
  }

  // Render results (solo si existen los contenedores)
  function safeRenderResults(arr, containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    renderResults(arr, container, type);
  }

  if (document.getElementById("personas-results")) {
    safeRenderResults(personas, "personas-results", "personas");
  }
  if (document.getElementById("publicaciones-results")) {
    safeRenderResults(publicaciones, "publicaciones-results", "publicaciones");
  }
  if (document.getElementById("voluntarios-results")) {
    safeRenderResults(voluntarios, "voluntarios-results", "voluntarios");
  }

  // Tabs animadas (solo si existen)
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
      btn.classList.add("active");
      const tab = document.getElementById(btn.dataset.tab);
      if (tab) tab.classList.add("active");
    });
  });

  // Búsqueda en tiempo real (solo si existe el input)
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const q = e.target.value.toLowerCase();
      safeRenderResults(
        personas.filter(p => p.nombre.toLowerCase().includes(q) || p.ciudad.toLowerCase().includes(q) || p.intereses.toLowerCase().includes(q)),
        "personas-results",
        "personas"
      );
      safeRenderResults(
        publicaciones.filter(p => p.titulo.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)),
        "publicaciones-results",
        "publicaciones"
      );
      safeRenderResults(
        voluntarios.filter(v => v.nombre.toLowerCase().includes(q) || v.especialidad.toLowerCase().includes(q)),
        "voluntarios-results",
        "voluntarios"
      );
    });
  }
});

// Animaciones CSS para mensajes
const estilos = document.createElement('style');
estilos.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(estilos);

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
}

// Mostrar hora al cargar
actualizarReloj();

// Actualizar cada minuto
setInterval(actualizarReloj, 60000);

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
