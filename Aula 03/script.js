const tbody = document.querySelector("tbody");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productSale = document.querySelector("#product-sale");
const productAmount = document.querySelector("#product-amount");
const productRemove = document.querySelector("#product-remove");
const submitButton = document.querySelector("#submit-button");
const removeButton = document.querySelector("#remove-button");
const alert = document.querySelector("div.alert");
const products = new Map();
const productsArray = [];
let id = 0;
class Product {
    constructor(name, price, sale, amount) {
        const formatName = name.toLowerCase();
        this.name = formatName;
        this.price = price;
        this.sale = sale;
        this.amount = amount;
        products.set(formatName, this);
    }
}

function addProduct(event, name, price, sale, amount) {
    event.preventDefault();
    if (products.has(name || productName.value)) return addFailed();
    const priceFormat = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(productPrice.value);
    const saleFormat = `${productSale.value}%` || `${sale}%`;
    const product = new Product(
        productName.value || name,
        priceFormat || price,
        saleFormat || sale,
        productAmount.value || amount
    );

    productsArray.push(product);
    localStorage.setItem("products", JSON.stringify(productsArray));
    addProductView(product);
    addSucess();
    location.reload();
}
function addProductView(product) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.textContent = ++id;
    tr.appendChild(th);
    for (const item in product) {
        const td = document.createElement("td");
        td.textContent = product[item];
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}

function timeout(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
function addFailed() {
    alert.classList.remove("alert-success");
    alert.classList.remove("alert-info");
    alert.classList.add("alert-danger");
    alert.textContent = "Produto já existe!";
    const interval = timeout(2000).then(() => {
        resetAddMessage(interval);
    });
}
function addSucess() {
    alert.classList.remove("alert-danger");
    alert.classList.remove("alert-info");
    alert.classList.add("alert-success");
    alert.textContent = "Produto adicionado com sucesso!";
    const interval = timeout(2000).then(() => {
        resetAddMessage(interval);
    });
}
function resetAddMessage(interval) {
    clearInterval(interval);
    alert.classList.remove("alert-success");
    alert.classList.remove("alert-danger");
    alert.classList.add("alert-info");
    alert.textContent = "Preencha os campos para adicionar um novo produto!";
}
function validateProductName(event) {
    const regex = /^[\w\D]{3,32}$/;
    if (regex.test(event.target.value)) {
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
        return;
    }
    event.target.classList.add("is-invalid");
    event.target.classList.remove("is-valid");
}
function validateProductPrice(event) {
    const regex = /^\d{1,8}/;
    if (regex.test(event.target.value) && +event.target.value > 0) {
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
        return;
    }
    event.target.classList.add("is-invalid");
    event.target.classList.remove("is-valid");
}
function validateProductSale(event) {
    const regex = /^\d{1,2}$/;
    if (regex.test(event.target.value) && +event.target.value >= 0) {
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
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
        return;
    }
    event.target.classList.add("is-invalid");
    event.target.classList.remove("is-valid");
}
function unlockButton() {
    const releaseButton =
        productName.classList.contains("is-valid") &&
        productPrice.classList.contains("is-valid") &&
        productSale.classList.contains("is-valid") &&
        productAmount.classList.contains("is-valid");
    if (releaseButton) {
        submitButton.classList.remove("disabled");
        return;
    }
    submitButton.classList.add("disabled");
}
function searchProduct(event) {
    const search = event.target.value.toLowerCase();

    tbody.textContent = "";
    productsArray.forEach((product) => {
        if (product.name.toLowerCase().includes(search)) {
            addProductView(product);
        }
    });
    if (tbody.childElementCount === 1 && !!productRemove.value) {
        removeButton.classList.remove("disabled");
        return;
    }
    removeButton.classList.add("disabled");
}
function removeProduct() {
    const product = productsArray.find((product) => {
        return product.name
            .toLowerCase()
            .includes(productRemove.value.toLowerCase());
    });
    productsArray.splice(productsArray.indexOf(product), 1);
    localStorage.setItem("products", JSON.stringify(productsArray));
    location.reload();
}
window.addEventListener("keydown", unlockButton);
window.addEventListener("keyup", unlockButton);
window.addEventListener("load", () => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products) {
        products.forEach((item) => {
            productsArray.push(item);
            new Product(item.name, item.price, item.sale, item.amount);
            addProductView(item);
        });
    }
});

productName.addEventListener("input", validateProductName);
productPrice.addEventListener("input", validateProductPrice);
productSale.addEventListener("input", validateProductSale);
productAmount.addEventListener("input", validateProductAmount);

submitButton.addEventListener("click", addProduct);

productRemove.addEventListener("input", searchProduct);
removeButton.addEventListener("click", removeProduct);
