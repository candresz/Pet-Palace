const { createApp } = Vue;
createApp({
    data() {
        return {
            productos: [],
            productosFarmacia: [],
            productosFarmaciaFiltrados: [],
            productosCarrito: [],
            valorSeleccionado: "",
            valorInput: "",
            productoCarritoID: [],
            totalPrecioCarrito: 0,
            totalPrecioCarrito: 0,
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                this.productos = [...datos];
                this.productosFarmacia = this.productos.filter(
                    (producto) => producto.categoria === "farmacia"
                );
                for (productos of this.productos) {
                    productos.catidadAComprar = 0;
                    productos.precioCantidad = 0;
                }
                this.productosFarmaciaFiltrados = this.productosFarmacia;
            })
            .catch((error) => console.log(error));
        this.productoCarritoID = JSON.parse(localStorage.getItem("productoCarritoID")) || [];
        this.productosCarrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    },
    methods: {
        filtroCheck(valorCheck, listaProductos) {
            if (valorCheck === "Todos" || valorCheck.length === 0) {
                return listaProductos;
            } else
                return listaProductos.filter(
                    (producto) => producto.precio <= parseInt(valorCheck)
                );
        },
        filtroSearch(valorInput, listaProductos) {
            return listaProductos.filter((product) =>
                product.producto
                    .toLowerCase()
                    .includes(valorInput.toLowerCase())
            );
        },
        filtroCruzado() {
            const listaProductosChecks = this.filtroCheck(
                this.valorSeleccionado,
                this.productosFarmacia
            );
            const listaProductosSearch = this.filtroSearch(
                this.valorInput,
                listaProductosChecks
            );
            this.productosFarmaciaFiltrados = listaProductosSearch;
            // console.log(this.productosFarmaciaFiltrados);
        },
        agregarCarrito(producto) {
            if (producto.disponibles > 0) {
                this.productoCarritoID.push(producto._id);
                producto.catidadAComprar++;
                producto.precioCantidad = producto.catidadAComprar * producto.precio;
                this.AgregarAlCarrito(producto);
            }
        },
        removerCarrito(producto) {
            producto.catidadAComprar = 0;
            this.productoCarritoID = this.productoCarritoID.filter((elemento) => elemento !== producto._id);
            this.quitarDelCarrito();
        },
        sumarCompra(producto) {
            if (producto.catidadAComprar < producto.disponibles) {
                producto.catidadAComprar++;
                producto.precioCantidad =
                    producto.catidadAComprar * producto.precio;
            }
        },
        restarCompra(producto) {
            if (producto.catidadAComprar === 1) {
                producto.catidadAComprar--;
                producto.precioCantidad = producto.catidadAComprar * producto.precio;
                this.productoCarritoID = this.productoCarritoID.filter((elemento) => elemento !== producto._id);
                this.quitarDelCarrito();
            } else {
                producto.catidadAComprar--;
                producto.precioCantidad = producto.catidadAComprar * producto.precio;
            }
        },
        AgregarAlCarrito(productoAReicibir) {
            this.productosCarrito.push(productoAReicibir)
        },
        quitarDelCarrito() {
            this.productosCarrito = this.productosCarrito.filter((producto) => this.productoCarritoID.includes(producto._id));
        }
    },
    computed: {
        calcularTotal() {
            this.totalPrecioCarrito = this.productosCarrito.reduce(
                (totalAcumulado, producto) =>
                    totalAcumulado + producto.precioCantidad,
                0
            );
        },
        guardarDatosCarrito() {
            localStorage.setItem("productosCarrito", JSON.stringify(this.productosCarrito));
        },
        guardarDatosCarritoID() {
            localStorage.setItem("productoCarritoID", JSON.stringify(this.productoCarritoID));
        },

    },
}).mount("#app");
