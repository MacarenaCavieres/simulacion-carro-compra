const carrito = document.querySelector("#carrito");
const sumaTotal = document.querySelector("#sumaTotal");
const template = document.querySelector("#template");
const templateTotal = document.querySelector("#templateTotal");
const btnes = document.querySelectorAll(".card button");
const fragment = document.createDocumentFragment();
const fragmentTotal = document.createDocumentFragment();

const carritoObjeto = {};

const pintarCarrito = (e) => {
    const fruta = {
        nombre: e.target.dataset.fruta,
        cantidad: 1,
        precio: e.target.dataset.precio,
    };

    let price = fruta.precio;

    if (carritoObjeto.hasOwnProperty(fruta.nombre)) {
        fruta.cantidad = carritoObjeto[fruta.nombre].cantidad + 1;
        fruta.precio = price * (carritoObjeto[fruta.nombre].cantidad + 1);
    }

    carritoObjeto[fruta.nombre] = fruta;

    agregarCarrito();
};

const agregarCarrito = () => {
    carrito.textContent = "";

    Object.values(carritoObjeto).forEach((item) => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector(".lead").textContent = item.nombre;
        clone.querySelector(".badge").textContent = `Cantidad: ${item.cantidad}`;
        clone.querySelector(".precio").textContent = `Precio: ${item.precio}`;

        fragment.appendChild(clone);
    });

    carrito.appendChild(fragment);
};

const totalSuma = () => {
    sumaTotal.textContent = "";

    let all = 0;

    Object.values(carritoObjeto).forEach((item) => {});
};

btnes.forEach((btn) => btn.addEventListener("click", pintarCarrito));
