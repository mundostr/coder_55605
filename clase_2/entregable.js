/**
 * Desafío entregable #1
 */

class ProductManager {
    static productId = 0

    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (arguments.length === this.addProduct.length) {
            const indexCode = this.products.findIndex((product) => { return product.code === code.toUpperCase() })
    
            if (indexCode === -1) {
                ProductManager.productId++
    
                const newProduct = {
                    id: ProductManager.productId,
                    title: title.toUpperCase(),
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code.toUpperCase(),
                    stock: stock
                }
    
                this.products.push(newProduct)
            } else {
                console.log('El código de producto indicado ya existe')
            }
        } else {
            console.log('Todos los campos son obligatorios')
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productoEncontrado = this.products.find((producto) => { producto.id === id })
        return productoEncontrado || 'Not found'
    }
}


const manager = new ProductManager()
manager.addProduct('Producto 1', 'La descripción del producto 1', 1000, '', 'abc123', 100)
manager.addProduct('Producto 2', 'La descripción del producto 2', 2000, '', 'abc456', 200)
console.log(manager.getProducts())