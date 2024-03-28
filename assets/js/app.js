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
        precio: +e.target.dataset.precio,
    };

    let price = fruta.precio;

    if (carritoObjeto.hasOwnProperty(fruta.nombre)) {
        fruta.cantidad = carritoObjeto[fruta.nombre].cantidad + 1;
        fruta.precio = price * (carritoObjeto[fruta.nombre].cantidad + 1);
    }

    carritoObjeto[fruta.nombre] = fruta;

    agregarCarrito();
    totalSuma();
    decrease(fruta, price);
};

const agregarCarrito = () => {
    carrito.textContent = "";

    Object.values(carritoObjeto).forEach((item) => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector(".lead").textContent = item.nombre;
        clone.querySelector(".disminuir").textContent = `-`;
        clone.querySelector(".cantidad").textContent = `Cantidad: ${item.cantidad}`;
        clone.querySelector(".precio").textContent = `Precio: ${item.precio}`;
        clone.querySelector(".delete").textContent = `X`;

        fragment.appendChild(clone);
    });

    carrito.appendChild(fragment);
};

const totalSuma = () => {
    let all = 0;

    Object.values(carritoObjeto).forEach((item) => {
        all += item.precio;
    });

    sumaTotal.textContent = "";

    const clone = templateTotal.content.firstElementChild.cloneNode(true);
    clone.querySelector(".suma").textContent = "Total";
    clone.querySelector(".total").textContent = `$${all}`;

    fragmentTotal.appendChild(clone);

    sumaTotal.appendChild(fragmentTotal);
};

const decrease = (fruta, price) => {
    const disminuir = document.querySelectorAll(".disminuir");

    disminuir.forEach((btn) =>
        btn.addEventListener("click", () => {
            if (carritoObjeto[fruta.nombre].cantidad > 0) {
                carritoObjeto[fruta.nombre].cantidad = carritoObjeto[fruta.nombre].cantidad - 1;
                carritoObjeto[fruta.nombre].precio = price * carritoObjeto[fruta.nombre].cantidad;
                agregarCarrito();
                totalSuma();
            }
        })
    );
};

btnes.forEach((btn) => btn.addEventListener("click", pintarCarrito));
