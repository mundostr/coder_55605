import { promises as fs } from 'fs'

export class ProductController {
    constructor(path) {
        this.path = path
    }

    static incrementID() {
        this.idIncrement ? this.idIncrement++ : this.idIncrement = 1
        return this.idIncrement
    }

    async addProduct(product) {
        try {
            const products = await JSON.parse(await fs.readFile(this.path, 'utf-8'))
            product.id = ProductManager.incrementID()
            products.push(product)
            await fs.writeFile(this.path, JSON.stringify(products))
            return "Producto agregado"
        } catch (err) {
            return err.message
        }
    }

    async getProducts() {
        try {
            const products = await JSON.parse(await fs.readFile(this.path, 'utf-8'))
            return products
        } catch (err) {
            return err.message
        }
        
    }

    async getProduct(id) {
        try {
            const products = this.getProducts()
            
            if(products.some(prod => prod.id === parseInt(id))) {
                return products.find(prod => prod.id === parseInt(id))
            } else {
                return "Producto no encontrado"
            }
        } catch (err) {
            return err.message
        }
    }

    async updateProduct(id, newContent) {
        try {
            const products = this.getProducts()

            if(products.some(prod => prod.id === parseInt(id))) {
                let index= products.findIndex(prod => prod.id === parseInt(id))
                
                products[index].title = newContent.title
                products[index].description = newContent.description
                products[index].price = newContent.price
                products[index].thumbnail = newContent.thumbnail
                products[index].code = newContent.code
                products[index].stock = newContent.stock
                
                await fs.writeFile(this.path, JSON.stringify(products))
                return "Producto actualizado"
            } else {
                return "Producto no encontrado"
            }
        } catch (err) {
            return err.message
        }
    }

    async deleteProduct(id) {
        try {
            const products = this.getProducts()
            if(products.some(prod => prod.id === parseInt(id))) {
                const filteredProducts = products.filter(prod => prod.id !== parseInt(id))
                await fs.writeFile(this.path, JSON.stringify(filteredProducts))
                return "Producto eliminado"
            } else {
                return "Producto no encontrado"
            }
        } catch (err) {
            return err.message
        }
    }
}