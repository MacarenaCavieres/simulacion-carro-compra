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
        total: +e.target.dataset.precio,
    };

    let price = fruta.precio;

    if (carritoObjeto.hasOwnProperty(fruta.nombre)) {
        fruta.cantidad = carritoObjeto[fruta.nombre].cantidad + 1;
        fruta.total = price * (carritoObjeto[fruta.nombre].cantidad + 1);
    }
    carritoObjeto[fruta.nombre] = fruta;

    agregarCarrito();
    totalSuma();
};

const agregarCarrito = () => {
    carrito.textContent = "";

    Object.values(carritoObjeto).forEach((item) => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector(".lead").textContent = item.nombre;
        clone.querySelector(".disminuir").dataset.fruta = item.nombre;
        clone.querySelector(".cantidad").textContent = `Cantidad: ${item.cantidad}`;
        clone.querySelector(".precio").textContent = `Precio: ${item.total}`;
        clone.querySelector(".delete").dataset.fruta = item.nombre;

        fragment.appendChild(clone);
    });

    carrito.appendChild(fragment);
};

const totalSuma = () => {
    let all = 0;

    Object.values(carritoObjeto).forEach((item) => {
        all += item.total;
    });

    sumaTotal.textContent = "";

    const clone = templateTotal.content.firstElementChild.cloneNode(true);
    clone.querySelector(".suma").textContent = "Total";
    clone.querySelector(".total").textContent = `$${all}`;

    fragmentTotal.appendChild(clone);

    sumaTotal.appendChild(fragmentTotal);
};

carrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("disminuir")) {
        let price = carritoObjeto[e.target.dataset.fruta].precio;
        if (
            carritoObjeto[e.target.dataset.fruta].cantidad > 0 &&
            carritoObjeto.hasOwnProperty(e.target.dataset.fruta)
        ) {
            carritoObjeto[e.target.dataset.fruta].cantidad -= 1;
            carritoObjeto[e.target.dataset.fruta].total =
                price * carritoObjeto[e.target.dataset.fruta].cantidad;
            agregarCarrito();
            totalSuma();
        }
    }
});

carrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const frutaNombre = e.target.dataset.fruta;
        delete carritoObjeto[frutaNombre];
        agregarCarrito();
        totalSuma();
    }
});

btnes.forEach((btn) => btn.addEventListener("click", pintarCarrito));
