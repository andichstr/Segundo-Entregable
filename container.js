const fs = require('fs');

class Container {
    constructor(path){
        this.nameFile = path;
        this.productos = [];
        try{
            fs.readFile(path, 'UTF-8')
        }catch (error){
            console.warn('No hay ningún archivo en la ruta indicada.\nSe inicializarán los productos con un array vacío.');
        }

    }

    async save(producto){
        //Si el array de productos esta vacío, inicializa el id del producto en 1 y lo agrega a sus propiedades.
        if(this.productos.length==0){
            producto.id = 1;
        //Si ya tenia productos, lo inicializa en el valor del id+1 del último producto agregado.
        }else{
            producto.id = this.productos[this.productos.length-1].id+1;
        }
        //Agrega el producto al array del productos, y pasa el array actualizado para sobreescribir el archivo.
        this.productos.push(producto);
        await fs.promises.writeFile(this.nameFile, JSON.stringify(this.productos))
        .then(response => {
            return producto.id;
        })
        .catch(error => {
            throw new Error('No se pudo escribir el archivo');
        })
    }

    async getById(id){
        this.productos.forEach(element => {
            if(element.id == id) return element; //Si encuentra el producto, devuelve el producto y corta la ejecucion del método.
        });
        return false; //Si no encuentra el producto, devuelve falso.
    }

    async getAll(){
        return this.productos;
    }

    async deleteById(id){
        let found = false;
        for(let i=0; i<this.productos.length; i++){
            if(this.productos[i].id === id){
                found = true;
                this.productos.splice(i,1);
            }
        }
        //Si no encuentra el id del producto, corta la ejecucion de la funcion y devuelve falso.
        if(!found) return false;
        await fs.promises.writeFile(this.nameFile, JSON.stringify(this.productos))
        .then(response => {
            console.log('Producto borrado correctamente.');
        })
        .catch(error => {
            throw new Error('Error al borrar el producto.');
        })
    }

    async deleteAll(){
        this.productos = [];
        await fs.promises.writeFile(this.nameFile, JSON.stringify(this.productos))
        .then(response => {
            console.log("Productos borrados correctamente.");
        })
        .catch(error => {
            throw new Error('Error al borrar los productos.');
        })
    }
}

const contenedorProductos = new Container('./productos.txt');
const prod1 = {
    'nombre': 'Cerveza Heineken 1lt',
    'precio': 510,
    'img': 'https://monkeysushi.com.ar/wp-content/uploads/2020/02/CERVEZA-HEINEKEN-1-LITRO-NO-RETORNABLE-1-859.png'
}
const prod2 = {
    'nombre': 'Doritos 220gr',
    'precio': 1135,
    'img': 'https://http2.mlstatic.com/D_NQ_NP_712388-MLA51026803779_082022-O.webp'
}

const prod3 = {
    'nombre': 'Papas Fritas Pringles Cebolla 139gr',
    'precio': 715,
    'img': 'https://http2.mlstatic.com/D_NQ_NP_711555-MLA46924659450_072021-O.jpg'
}

//Primer método
console.log("Primer save: ", contenedorProductos.save(prod1));
console.log("Segundo save: ", contenedorProductos.save(prod2));
console.log("Tercer save: ", contenedorProductos.save(prod3));
//Segundo método
const productoObtenido = contenedorProductos.getById(2);
console.log("getById(2): ", productoObtenido);
//Tercer método
console.log("getAll(): ", contenedorProductos.getAll());
//Cuarto método
contenedorProductos.deleteById(1);
console.log("getAll() despues de borrar el id=1: ", contenedorProductos.getAll())
//Quinto método
contenedorProductos.deleteAll();
console.log("getAll() despues de borrar todos los productos: ", contenedorProductos.getAll());