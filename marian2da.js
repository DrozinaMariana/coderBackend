class Product {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}
class ProductManager {
    listaProductos = []

    async ingresoProductos() {
        const fs = require('fs')
        let contador = 0
        try {
            const db = await fs.promises.readFile('./marianDb.json')
            const productos = JSON.parse(db)
            productos.forEach((p) => {
                const newProducto = new Product(p.title, p.description, p.price, p.tumbnail, p.code, p.stock, p.id = contador)
                this.addProduct(newProducto)
                contador += 1

            })
            this.archivarLista()
        } catch (error) {
            console.log(error)
        }

    }

    addProduct = (producto) => {
        const exist = this.listaProductos.some((prod) => prod.code == producto.code)
        if (exist) {
            console.log("existe productos con el mismo codigo")
        } else {
            this.listaProductos.push(producto)
        }

    }
    archivarLista() {
        const fs = require('fs')
        const listajson = JSON.stringify(this.listaProductos)
        fs.promises.writeFile('./data/products.json', listajson)
            .then(() => console.log("el archivo se guardo correctamente"))
            .catch(() => console.log("ocurrio un error al guardar el archivo"))

    }
    async getProducts() {
        const fs = require('fs')
        const lista = await fs.promises.readFile('./data/products.json')
            .then(() => {
                const productos = JSON.parse(lista)
                console.log(productos)
            })
            .catch(() => console.log("se produjo un error al leer el documento"))
    }
    getProductsById = (id) => {
        const inList = this.listaProductos.find((p) => p.id == id)
        if (inList) {
            return inList
        } else {
            console.log("Not Found")
        }
    }


}
const manejador = new ProductManager()
manejador.ingresoProductos()
module.exports = manejador;