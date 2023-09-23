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
            prueba: [],
            productoCarritoID: [],
            totalPrecioCarrito: 0
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
                this.productosFarmaciaFiltrados = [... this.productosFarmacia];
            })
            .catch((error) => console.log(error));
            this.productoCarritoID = JSON.parse(localStorage.getItem('productoCarritoID')) || [];
    },

    methods: {
        filtroCheck(valorCheck, listaProductos) {
            if (valorCheck === "Todos") {
                return listaProductos;
            }
            else return listaProductos.filter(producto => producto.precio <= parseInt(valorCheck));
        },
        filtroSearch(valorInput, listaProductos) {
            return listaProductos.filter(product => product.producto.toLowerCase().includes(valorInput.toLowerCase()));
        },
        filtroCruzado() {
            const listaProductosChecks = this.filtroCheck(this.valorSeleccionado, this.productosFarmacia);
            const listaProductosSearch = this.filtroSearch(this.valorInput, listaProductosChecks);
            this.productosFarmaciaFiltrados = listaProductosSearch;
            // console.log(this.productosFarmaciaFiltrados);
        },
        agregarCarrito(producto) {
            if (producto.disponibles > 0) {
                this.productoCarritoID.push(producto._id);
                localStorage.setItem("productoCarritoID", JSON.stringify(this.productoCarritoID));
            }
        },
        removerCarrito(producto) {
            this.productoCarritoID =  this.productoCarritoID.filter(elemento => elemento !== producto._id);
            localStorage.setItem("productoCarritoID", JSON.stringify(this.productoCarritoID));
        }
    },

    computed: {
        filtarCarrito() {
            this.productosCarrito = this.productosFarmaciaFiltrados.filter(producto => this.productoCarritoID.includes(producto._id))
        }
    }
}).mount("#app");
