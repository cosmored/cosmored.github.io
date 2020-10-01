const shopsmart = "shopsmart-cart";

class Storage {
    static getData() {
        let cartData = localStorage.getItem(shopsmart) ?
            JSON.parse(localStorage.getItem(shopsmart))
            : [];
        
        return cartData;
    }

    static populateCart() {
        let products = Storage.getData();
        products.forEach(prod => {
            let product = new Product(prod.prodName, prod.prodPrice, prod.prodImgSrc);
            let ui = new UI(product);
            ui.pushToCart(product);
        });
    }

    static addToLocal(prodName, prodPrice, prodImgSrc) {
        let products = Storage.getData();
        let product = new Product(prodName, prodPrice, prodImgSrc);
        
        products.push(product);
        localStorage.setItem(shopsmart, JSON.stringify(products));
    }

    static removeFromLocal(product) {
        let products = Storage.getData();
        this.product = product;

        products.forEach((product, index) => {
            if (product.prodImgSrc == this.product.prodImgSrc) {
                // need unique productId for product identification 
                // need cartEntryId for duplicate identification 
                products.splice(index, 1);
            }
        });
        
        localStorage.setItem(shopsmart, JSON.stringify(products));
    }
}