const fs = require('fs').promises;

class Container {
    constructor(path){
        this.path = path;
    }

    async save(product){
        try{
            const data = await fs.readFile(this.path, "utf-8");
            const products = JSON.parse(data);
            let id = products.length === 0 ? 1 : products[products.length-1].id+1;
            const newProduct = {...product, id};
            products.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
            return newProduct.id;
        }catch (error){
            console.error(error);
        }
    }

    async getById(id){
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const productos = JSON.parse(data);
            const product = productos.find(el => el.id===id);
            if(!product){
                return null
            }
            return product;
        }catch (error){
            console.error(error);
        }
    }

    async getAll(){
        try{
            const products = JSON.parse(await fs.readFile(this.path, 'utf8'));
            return products;
        }catch(error) {
            console.error(error);
        }
    }

    async deleteById(id){
        try{
            const products = JSON.parse(await fs.readFile(this.path, 'utf8'));
            const newProducts = products.filter(el => {
                return el.id != id
            })
            await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2), "utf-8");
        }catch(error) {
            console.log(error);
        }
    }

    async deleteAll(){
        try{
            await fs.writeFile(this.path, JSON.stringify([]), null, "utf-8");
            console.log("Productos borrados correctamente.");
        }catch(error) {
            console.error(error);
        }
    }
}

module.exports=Container;
