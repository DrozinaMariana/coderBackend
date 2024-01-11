const express = require("express")
const productManagment = require("./marian2da")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/products", async(req, res) => {

    try {
        const limit = req.query.limit;
        const productos = await productManagment.ingresoProductos()
        const listProducts = productManagment.listaProductos
        if (limit) {
            return res.send(listProducts.slice(0, parseInt(limit)))
        } else {
            res.send(listProducts)

        }
    } catch (error) {
        res.send("hubo un error")
    }

})

app.get("/products/:pid", async(req, res) => {

    let id = req.params.pid
    const inList = await productManagment.getProductsById(id)
    if (inList) {
        res.send(inList)
    } else {
        res.send("no se encuentra el producto seleccionado")
    }
})


app.listen(4040, () => {
    console.log("el servicio se encuentra levantado y funcionando")
})