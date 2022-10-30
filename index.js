const Container = require("./container");

const contenedorProductos = new Container('./products.json');
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
contenedorProductos.save(prod1).then(p=>console.log("save: ",p));
//Segundo método
const productoObtenido = contenedorProductos.getById(1);
productoObtenido.then(p=>console.log("getbyid: ", p));
//Tercer método
contenedorProductos.getAll().then(p=>console.log("getall: ", p));
//Cuarto método
contenedorProductos.deleteById(1);
contenedorProductos.getAll().then(p=>console.log("deletebyid: ", p));
