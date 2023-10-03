const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productSale = document.querySelector("#product-sale");
const productAmount = document.querySelector("#product-amount");
const button = document.querySelector("button");
const alert = document.querySelector("div.alert");
const products = new Map();
let id = 1;

function addProduct() {
    if (products.has(productName.value)) return addFailed();
    const tbody = document.querySelector("tbody");
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const priceFormat = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(productPrice.value);
    const saleFormat = productSale.value + "%";

    const product = [
        productName.value,
        priceFormat,
        saleFormat,
        productAmount.value,
    ];
    products.set(productName.value, product);
    th.setAttribute("scope", "row");
    th.textContent = id;
    tr.appendChild(th);
    product.forEach((item) => {
        const td = document.createElement("td");
        td.textContent = item;
        tr.appendChild(td);
    });
    tbody.appendChild(tr);
    id++;
    addSucess();
}
function addFailed() {
    alert.classList.remove("alert-success");
    alert.classList.remove("alert-info");
    alert.classList.remove("alert-danger");
    alert.classList.toggle("alert-danger");
    alert.textContent = "Produto já existe!";
}
function addSucess() {
    alert.classList.remove("alert-danger");
    alert.classList.remove("alert-info");
    alert.classList.remove("alert-success");
    alert.classList.toggle("alert-success");
    alert.textContent = "Produto adicionado com sucesso!";
}
function validateProductName(event) {
    const regex = /^\D{3,32}$/;
    if (regex.test(event.target.value)) {
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
        unlockButton();
        return;
    }
    event.target.classList.add("is-invalid");
    event.target.classList.remove("is-valid");
}
function validateProductPrice(event) {
    const regex = /^\d{1,8}/;
    if (regex.test(event.target.value) && event.target.value > 0) {
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
        unlockButton();
        return;
    }
    event.target.classList.add("is-invalid");
    event.target.classList.remove("is-valid");
}
function validateProductSale(event) {
    const regex = /^\d{1,2}$/;
    if (regex.test(event.target.value) && +event.target.value > 0) {
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
        unlockButton();
        return;
    }
    event.target.classList.add("is-invalid");
    event.target.classList.remove("is-valid");
}
function validateProductAmount(event) {
    const regex = /^\d{1,3}$/;
    if (regex.test(event.target.value) && +event.target.value > 0) {
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
        unlockButton();
        return;
    }
    event.target.classList.add("is-invalid");
    event.target.classList.remove("is-valid");
}
function unlockButton() {
    if (
        productName.value === "" ||
        productPrice.value === "" ||
        productSale.value === "" ||
        productAmount.value === ""
    ) {
        button.classList.add("disabled");
        return;
    }
    button.classList.remove("disabled");
}

productName.addEventListener("input", validateProductName);
productPrice.addEventListener("input", validateProductPrice);
productSale.addEventListener("input", validateProductSale);
productAmount.addEventListener("input", validateProductAmount);
button.addEventListener("click", addProduct);
