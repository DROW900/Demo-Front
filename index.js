async function getCategorias() {

    let categorias = await fetch('http://localhost:4000/categorias');
    let datos = await categorias.json();
    let dato = '';
    for (let index = 0; index < datos.length; index++) {
        document.getElementById("ocultasub").style.display = 'none';
        dato += `<li><button  value="${datos[index].id}" onclick="getSubCategorias(this.value)"class="dropdown-item">${datos[index].name}</button></li>`;
    }
    document.getElementById('ul').innerHTML = dato;
    //console.log(datos);
}

async function getSubCategorias(idPadre) {


    let subCategorias = await fetch(`http://localhost:4000/subcategorias/${idPadre}`);
    let datos = await subCategorias.json();
    // console.log(datos);

    let dato = ''
    for (let index = 0; index < datos.children_categories.length; index++) {

        dato += `<li><button  id="${datos.children_categories[index].id}" onclick="getProductosPorIdSubCategoria(this.id)" class="dropdown-item">${datos.children_categories[index].name}</button></li>`;
        document.getElementById("ocultasub").style.display = 'block';
    }

    document.getElementById('ul2').innerHTML = dato;


}

async function getProductosPorIdSubCategoria(id) {
    let productos = await fetch(`http://localhost:4000/subcategorias/productos/${id}`);
    let datos = await productos.json();
    //console.log(datos);
    let producto = ''
    for (let index = 0; index < datos.results.length; index++) {
        producto += ` <div class="col"><div class="card shadow-sm" '><img src="${datos.results[index].thumbnail}" class="imagenes" id='img0 ' alt="error"><div class="card-body"><h3 >${datos.results[index].title}</h3><p class="card-text">$${datos.results[index].price}</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button value="${[datos.results[index].price, datos.results[index].title, datos.results[index].thumbnail]}" onclick="agregarProd(this.value)" type="button" class="btn btn-sm btn-outline-secondary"><img src="./assets/images/anadir-al-carrito-1.png" alt=""></button><button type="button" class="btn btn-sm btn-outline-secondary">Edit</button></div><small class="text-muted">9 mins</small> </div></div></div></div>`;

    }
    document.getElementById('hola ').innerHTML = producto;
    // console.log(producto);

}


//crearLista();
//lista();

let carrito = []
if (sessionStorage.getItem('carrito') != null) {
    carrito = JSON.parse(sessionStorage.getItem('carrito'));
}

async function agregarProd(prod) {

    carrito.push(prod);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}

async function prepararCarrito() {
    console.log(carrito);
    if (sessionStorage.getItem('carrito') != null) {
        let prodArr = []
        for (let index = 0; index < carrito.length; index++) {
            prodArr.push(carrito[index].split(','));

        }
        //console.log(prodArr);
        await mostrarCarrito(prodArr);



    } else {
        document.getElementById('productos').innerHTML = '<h2> carrito vacío </h2>';
    }

}

async function mostrarCarrito(arr) {
    //console.log(arr);
    let producto = ''
    for (let index = 0; index < arr.length; index++) {
        producto += ` <div class="col"><div class="card shadow-sm" '><img src="${arr[index][2]}" class="imagenes" id='img0 ' alt="error"><div class="card-body"><h3 >${arr[index][1]}</h3><p class="card-text">$${arr[index][0]}</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button  type="button" class="btn btn-sm btn-outline-secondary"><img src="./assets/images/anadir-al-carrito-1.png" alt=""></button><button type="button" class="btn btn-danger btn-sm btn-outline-secondary" value="${index}" onclick="eliminarProductoCarrito(this.value)">Eliminar</button></div><small class="text-muted">9 mins</small> </div></div></div></div>`;

    }
    document.getElementById('productos').innerHTML = producto;
}

async function eliminarProductoCarrito(id) {
    carrito.splice(id, 1);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));

    // console.log(Array.from(carrito));

    location.reload();
}

async function vaciar() {
    sessionStorage.removeItem('carrito');
    location.reload();
}


/* getCategorias(); */