const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const cpf = document.querySelector("#cpf");
const celular = document.querySelector("#celular");
const enviar = document.querySelector("button[type='submit']");

function validarNome(event) {
    const regexNome = /^[a-zA-Z]{3,32}$/;
    const label = event.target.parentElement;
    if (!regexNome.test(event.target.value)) {
        label.classList.add("invalid");
        event.target.classList.add("invalid");
        event.target.classList.remove("valid");
        return;
    }
    label.classList.remove("invalid");
    event.target.classList.remove("invalid");
    event.target.classList.add("valid");
    return;
}
function validarEmail(event) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const label = event.target.parentElement;
    if (!regexEmail.test(event.target.value)) {
        label.classList.add("invalid");
        event.target.classList.add("invalid");
        event.target.classList.remove("valid");
        return;
    }
    label.classList.remove("invalid");
    event.target.classList.remove("invalid");
    event.target.classList.add("valid");
    return;
}
function validarSenha(event) {
    const regexSenha = /^.{8,16}$/;
    const label = event.target.parentElement;
    if (!regexSenha.test(event.target.value)) {
        label.classList.add("invalid");
        event.target.classList.add("invalid");
        event.target.classList.remove("valid");
        return;
    }
    label.classList.remove("invalid");
    event.target.classList.remove("invalid");
    event.target.classList.add("valid");
    return;
}

function validarCPF(event) {
    const regexCPF = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$|^[0-9]{11}$/;
    const label = event.target.parentElement;
    if (!regexCPF.test(event.target.value)) {
        label.classList.add("invalid");
        event.target.classList.add("invalid");
        event.target.classList.remove("valid");
        return;
    }
    label.classList.remove("invalid");
    event.target.classList.remove("invalid");
    event.target.classList.add("valid");
    return;
}
function validarCelular(event) {
    const regexCelular = /^[0-9]{10}$|^[0-9]{2}9[0-9]{8}$/;
    const label = event.target.parentElement;
    if (!regexCelular.test(event.target.value)) {
        label.classList.add("invalid");
        event.target.classList.add("invalid");
        event.target.classList.remove("valid");
        return;
    }
    label.classList.remove("invalid");
    event.target.classList.remove("invalid");
    event.target.classList.add("valid");
    return;
}
function validarForm(event) {
    if (
        nome.classList.contains("invalid") ||
        email.classList.contains("invalid") ||
        senha.classList.contains("invalid") ||
        cpf.classList.contains("invalid") ||
        celular.classList.contains("invalid")
    ) {
        event.preventDefault();
    }
}

nome.addEventListener("input", validarNome);
email.addEventListener("input", validarEmail);
senha.addEventListener("input", validarSenha);
cpf.addEventListener("input", validarCPF);
celular.addEventListener("input", validarCelular);
enviar.addEventListener("click", validarForm);
