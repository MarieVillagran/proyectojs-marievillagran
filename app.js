const stockProductos = [
  {
    id: 1,
    nombre: "Jamon y Queso",
    cantidad: 1,
    desc: "Jamón y Mozzarella la perfecta combinación, para lograr la humedad justa esta la ricota",
    precio: 950,
    img: "https://res.cloudinary.com/marievillagran/image/upload/v1661698208/Proyecto/clasico2_hjh2ji.jpg",
  },
  {
    id: 2,
    nombre: "Jamon y Queso con nuez",
    cantidad: 1,
    desc: "Jamón y Mozzarella, sumado a las nueces con su textura y sabor inigualable",
    precio: 950,
    img: "https://res.cloudinary.com/marievillagran/image/upload/v1661698208/Proyecto/clasico2_hjh2ji.jpg",
  },
  {
    id: 3,
    nombre: "Ternera",
    cantidad: 1,
    desc: "La ternera combinada con mozzarella logran una revolución en tu paladar",
    precio: 1100,
    img: "https://res.cloudinary.com/marievillagran/image/upload/v1661698207/Proyecto/ternera2_pel2ai.jpg",
  },
  {
    id: 4,
    nombre: "Verdura",
    cantidad: 1,
    desc: "Con verduras nobles como la espinaca, un toque de cebolla y morron rojo. Sumamos la ricota",
    precio: 900,
    img: "https://res.cloudinary.com/marievillagran/image/upload/v1661698208/Proyecto/verdura2_kgilih.jpg",
  },
  {
    id: 5,
    nombre: "Calabaza",
    cantidad: 1,
    desc: "La calabaza asada logra una textura y la dulzura adecuada, coronado con mozzarella",
    precio: 900,
    img: "https://res.cloudinary.com/marievillagran/image/upload/v1661698207/Proyecto/calabaza2_qcnoe9.jpg",
  },
  {
    id: 6,
    nombre: "Gourmet",
    cantidad: 1,
    desc: "El brasilero a las finas hierbas y el queso crema forman un relleno novedoso y perfecto",
    precio: 950,
    img: "https://res.cloudinary.com/marievillagran/image/upload/v1661698207/Proyecto/gourmet2_oy3bfh.jpg",
  },
  {
    id: 7,
    nombre: "Promo 1",
    cantidad: 1,
    desc: "Siempre lista: 3 docenas de sorrentinos(incluye una de Ternera). Podes combinarlas",
    precio: 2700,
    img: "https://res.cloudinary.com/marievillagran/image/upload/v1672102399/Proyecto/promo2_ytlywl.jpg",
  },
  {
    id: 8,
    nombre: "Promo 2",
    cantidad: 1,
    desc: "Con amigos y familia: 8 docenas de sorrentinos(incluye 3 de Ternera). Podes combinarlas",
    precio: 6000,
    img: "https://res.cloudinary.com/marievillagran/image/upload/v1672102399/Proyecto/promo1_ncpygf.jpg",
  },
];
let carrito = [];


const contenedor = document.querySelector("#contenedor")
const carritoContenedor = document.querySelector('#carritoContenedor')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal = document.querySelector('#precioTotal')
const procesarCompra = document.querySelector('#procesarCompra')
const activarFuncion = document.querySelector('#activarFuncion')
const totalProceso = document.querySelector('#totalProceso')
const formulario = document.querySelector('#procesar-pago')

if (formulario) {
  formulario.addEventListener('submit', enviarPedido)
}

if (activarFuncion) {
  activarFuncion.addEventListener('click', procesarPedido)
}


document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  mostrarCarrito()
  if (activarFuncion) {
    document.querySelector('#activarFuncion').click(procesarPedido)
  }
})



stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod
  if (contenedor) {
    contenedor.innerHTML += `
      <div class="card shadow mb-1 bg-dark rounded" style="width: 18rem;">
      <h5 class="card-title pt-2 text-center text-primary">${nombre}</h5>
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        
        <h5 class="card-text text-primary">Precio: ${precio}</h5>
        <p class="card-text text-white-50 description"> ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>

        <button onclick="agregarProducto(${id})" class="btn btn-primary">Agregar al carrito</button>
      </div>
    </div>
      `
  }
})

if (procesarCompra) {
  procesarCompra.addEventListener('click', () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacío!",// si el carrito esta en cero no pasa
        text: "¡Compra algo para continuar con la compra!",
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    } else {
      location.href = "compra.html"
    }
  })
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener('click', () => {
    carrito.length = []
    mostrarCarrito()
  })
}

function agregarProducto(id) {
  const existe = carrito.some(prod => prod.id === id)
  if (existe) {
    //el metodo map creamos un nuevo arreglo, iteramos y cuando map encuentre cual es el agregado, le suma la cantidad
    const prod = carrito.map(prod => {//Busca si existe el producto en el carrito
      if (prod.id === id) {
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()
}

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body")
  if (modalBody) {
    modalBody.innerHTML = ''
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod
      modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
          <p>Precio: ${precio}</p>
          <p>Cantidad :${cantidad}</p>

          <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar producto</button>
          </div>
        </div>    
        `
    })
  }

  if (carrito.length === 0) {
    modalBody.innerHTML = `
      <p class= "text-center text-primary parrafo">¡Debes agregar producots al carrito!</p> 
      `
  }

  carritoContenedor.textContent = carrito.length

  if (precioTotal) {
    precioTotal.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
  }
  guardarStorage()
}
function eliminarProducto(id) {
  const sorrentinoId = id
  carrito = carrito.filter((sorrentino) => sorrentino.id !== sorrentinoId)//traemos los productos menos los que cumplan la condicion
  mostrarCarrito()
}
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito))

}

function procesarPedido() {

  carrito.forEach((prod) => {
    const listaCompra = document.querySelector('#lista-compra tbody')
    const { id, nombre, precio, cantidad, img } = prod

    const row = document.createElement('tr')
    row.innerHTML += `
         <td>
          <img class= "img-fluid img-carrito" src="${img}" />
         </td>
         <td>${nombre}</td>
         <td>${precio}</td>
         <td>${cantidad}</td>
         <td>${precio * cantidad}</td>  
      `
    listaCompra.appendChild(row)
  })
  totalProceso.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

function enviarPedido(e) {
  e.preventDefault()
  const cliente = document.querySelector('#cliente').value
  const correo = document.querySelector('#correo').value

  if (correo === '' || cliente === '') {
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Asi registramos tu pedido",
      icon: "error",
      ConfirmButtonText: "Aceptar",
    })
  } else {

    const btn = document.getElementById('button')

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_qpuwx4h';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar Compra';
        alert('Enviado!');
      }, (err) => {
        btn.value = 'Finalizar Compra';
        alert(JSON.stringify(err));
      });


    const spinner = document.querySelector('#spinner')
    spinner.classList.add('d-flex')
    spinner.classList.remove('d-none')

    setTimeout(() => {
      spinner.classList.remove('d-flex')
      spinner.classList.add('d-none')
      formulario.reset()
    }, 3000)

    const alertExito = document.createElement('p')
    alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-md-12', 'mt-2', 'alert-success')
    alertExito.textContent = "Compra realizada de forma exitosa"
    formulario.appendChild(alertExito)

    setTimeout(() => {
      alertExito.remove()
    }, 3000)
    localStorage.clear()
  }
}

//Se accede a la datos a traves de ruta relativa
fetch('data.json')
  .then((response) => response.json())
  .then((usuarios) => {
    let bodyList = document.getElementById("bodyUsers");
    console.log(usuarios);
    usuarios.forEach(element => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
                <h4 class="text-center text-primary">${element.nombre}</h4>
                `;
      bodyList.append(listItem)
    });
  })