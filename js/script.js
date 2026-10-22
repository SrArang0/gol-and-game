// busca los elementos del formulario por su id
var formulario = document.getElementById("formulario");
var nombre = document.getElementById("nombre");
var correo = document.getElementById("correo");
var asunto = document.getElementById("asunto");
var mensaje = document.getElementById("mensaje");
var acepto = document.getElementById("acepto");
var exito = document.getElementById("mensaje-exito");

// pone un campo en rojo y escribe el mensaje de error
function mostrarError(campo, idError, texto) {
  campo.classList.add("is-invalid");
  campo.classList.remove("is-valid");
  document.getElementById(idError).textContent = texto;
}

// pone un campo en verde
function mostrarBien(campo) {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
}

// revisa que el nombre tenga minimo 3 letras
function validarNombre() {
  var valor = nombre.value.trim();
  if (valor.length < 3) {
    mostrarError(nombre, "error-nombre", "El nombre debe tener mínimo 3 caracteres.");
    return false;
  }
  mostrarBien(nombre);
  return true;
}

// revisa que el correo tenga un arroba y un punto despues del arroba
function validarCorreo() {
  var valor = correo.value.trim();
  var posArroba = valor.indexOf("@");
  var posPunto = valor.lastIndexOf(".");

  if (valor === "") {
    mostrarError(correo, "error-correo", "Escribe tu correo electrónico.");
    return false;
  }
  // revisa que el arroba no puede estar primero y que el punto debe ir despues con una letra en medio
  if (posArroba < 1 || posPunto < posArroba + 2 || posPunto === valor.length - 1) {
    mostrarError(correo, "error-correo", "El correo no tiene un formato válido, por ejemplo nombre@correo.com.");
    return false;
  }
  mostrarBien(correo);
  return true;
}

// revisa que hayan elegido un tema de la lista
function validarAsunto() {
  if (asunto.value === "") {
    mostrarError(asunto, "error-asunto", "Elige un tema de la lista.");
    return false;
  }
  mostrarBien(asunto);
  return true;
}

// revisa que el mensaje tenga minimo 20 letras
function validarMensaje() {
  var valor = mensaje.value.trim();
  if (valor.length < 20) {
    mostrarError(mensaje, "error-mensaje", "El mensaje debe tener mínimo 20 caracteres.");
    return false;
  }
  mostrarBien(mensaje);
  return true;
}

// revisa que el checkbox este marcado
function validarAcepto() {
  if (!acepto.checked) {
    mostrarError(acepto, "error-acepto", "Debes aceptar para poder enviar el mensaje.");
    return false;
  }
  mostrarBien(acepto);
  return true;
}

// validacion en tiempo real mientras la persona escribe o cambia algo
nombre.addEventListener("input", validarNombre);
correo.addEventListener("input", validarCorreo);
asunto.addEventListener("change", validarAsunto);
mensaje.addEventListener("input", validarMensaje);
acepto.addEventListener("change", validarAcepto);

// cuando le dan al boton enviar
formulario.addEventListener("submit", function (evento) {
  //se evita que la pagina se recargue
  evento.preventDefault();

  // revisa todos los campos para que salgan todos los errores juntos
  var okNombre = validarNombre();
  var okCorreo = validarCorreo();
  var okAsunto = validarAsunto();
  var okMensaje = validarMensaje();
  var okAcepto = validarAcepto();

  if (okNombre && okCorreo && okAsunto && okMensaje && okAcepto) {
    // si todo esta bien, muestra el mensaje de exito y limpia el formulario
    exito.classList.remove("d-none");
    formulario.reset();

    // se quitan los colores verdes de los campos
    var campos = [nombre, correo, asunto, mensaje, acepto];
    for (var i = 0; i < campos.length; i++) {
      campos[i].classList.remove("is-valid");
    }
  } else {
    // si hay errores, esconde el mensaje de exito
    exito.classList.add("d-none");
  }
});