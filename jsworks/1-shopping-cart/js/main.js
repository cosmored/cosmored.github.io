class Product {
    constructor (prodName, prodPrice, prodImgSrc) {
        this.prodName = prodName;
        this.prodPrice = prodPrice;
        this.prodImgSrc = prodImgSrc;
    }
}

let buttons = document.querySelectorAll(".addtocart");

buttons.forEach(btn => {
    btn.addEventListener("click", addToCart);
});

function addToCart(e) {
    let mainParent = e.currentTarget.parentElement.parentElement.parentElement;
    let mainParentId = mainParent.getAttribute("id");
    
    let prodImg = document.querySelector(`#${mainParentId} img`);
    let prodImgSrc = prodImg.getAttribute("src");

    let prodName = document.querySelector(`#${mainParentId} .prod-name`).textContent;
    let prodPriceElement = document.querySelector(`#${mainParentId} .prod-price`).textContent;
    let prodPrice = prodPriceElement.replace(/[^0-9\.]/g, ""); // remove all letters except 0-9 and \. 

    let product = new Product(prodName, prodPrice, prodImgSrc);
    let ui = new UI(product);
    ui.pushToCart(product);

    Storage.addToLocal(prodName, prodPrice, prodImgSrc);
}

document.addEventListener("DOMContentLoaded", Storage.populateCart);

let checkoutBtn = document.querySelector(".checkoutBtn");
checkoutBtn.addEventListener("click", proceedToCheckout);

function proceedToCheckout() {
    console.log("executing purchase...");
}