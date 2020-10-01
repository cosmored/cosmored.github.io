class UI {
    constructor (prod) {
        this.prodName = prod.prodName;
        this.prodPrice = prod.prodPrice;
        this.prodImgSrc = prod.prodImgSrc;
    }

    pushToCart(product) {
        let cartSection = document.querySelector("#cart-section");
        cartSection.setAttribute("style", "display:block");

        let cartArea = document.querySelector("#cart-list");
        let row = document.createElement("tr");

        let removeBtnIcon = document.createElement("i");
        removeBtnIcon.classList = "fas fa-times-circle";
        let removeBtn = document.createElement("button");
        removeBtn.id = "remove-btn";
        removeBtn.classList = "btn btn-danger p-0 px-1 m-auto mx-2";
        removeBtn.setAttribute("style", "vertical-align:baseline");
        removeBtn.appendChild(removeBtnIcon);

        function removeItem(e) {
            e.currentTarget.parentElement.parentElement.remove();
            
            let priceMoney = document.querySelector("#price-money");
            let res = UI.calculateTotalPrice();
            priceMoney.textContent = res[0];
            UI.updateCartIconValue(res[1]);

            Storage.removeFromLocal(product);
        }

        removeBtn.addEventListener("click", removeItem);

        let productPic = document.createElement("img");
        productPic.id = "product-pic";
        productPic.setAttribute("src", this.prodImgSrc);
        productPic.classList = "img-fluid mt-2 ml-2";
        productPic.setAttribute("width", "10%");
        productPic.setAttribute("style", "display:inline-block");

        let productName = document.createElement("h4");
        productName.id = "product-name";
        productName.classList = "lead";
        productName.setAttribute("style", "display:inline; padding-left:3rem;");
        productName.textContent = this.prodName;

        let tdProdDetails = document.createElement("td");
        tdProdDetails.appendChild(removeBtn);
        tdProdDetails.appendChild(productPic);
        tdProdDetails.appendChild(productName);

        let productPrice = document.createElement("h4");
        productPrice.id = "product-price";
        productPrice.classList = "lead";
        productPrice.textContent = `${this.prodPrice} BDT`;
        let tdProdPrice = document.createElement("td");
        tdProdPrice.classList = "text-center";
        tdProdPrice.appendChild(productPrice);

        row.appendChild(tdProdDetails);
        row.appendChild(tdProdPrice);

        cartArea.insertBefore(row, document.querySelector("#cart-list tr:last-child")); 

        // total price row 
        if (!document.querySelector("#price-row")) {
            this.addTotalPriceRow(cartArea);
            UI.updateCartIconValue(1);
        } else {
            let priceMoney = document.querySelector("#price-money");
            let res = UI.calculateTotalPrice();
            priceMoney.textContent = res[0];
            
            UI.updateCartIconValue(res[1]);
        }
    }


    static updateCartIconValue(itemCount) {
        let itemCountText = document.querySelector(".cart-icon-count");
        if (itemCount) {
            itemCountText.textContent = itemCount.toString();
        } else {
            itemCountText.textContent = "";
        }
    }

    addTotalPriceRow(cartArea) {
        let priceRow = document.createElement("tr");
        priceRow.id = "price-row";

        let tdPriceText = document.createElement("td");
        let priceText = document.createElement("h4");
        priceText.classList = "text-center";
        priceText.textContent = "Total Price";
        tdPriceText.appendChild(priceText);

        let tdPriceMoney = document.createElement("td");
        let priceMoney = document.createElement("h4");
        priceMoney.id = "price-money";
        priceMoney.classList = "text-center";
        priceMoney.textContent = UI.calculateTotalPrice()[0];
        tdPriceMoney.appendChild(priceMoney);

        priceRow.appendChild(tdPriceText);
        priceRow.appendChild(tdPriceMoney);
        cartArea.appendChild(priceRow);
    }

    static calculateTotalPrice() {
        let prices = document.querySelectorAll("#product-price");
        let totalPrice = 0;

        prices.forEach(price => {
            let itemcost = parseInt(price.textContent.replace(/[^0-9.]/g, ""));
            totalPrice += itemcost;
        });

        if (!totalPrice) {
            let cartSection = document.querySelector("#cart-section");
            cartSection.setAttribute("style", "display:none");
        }

        return [totalPrice.toString(), prices.length];
    }
}