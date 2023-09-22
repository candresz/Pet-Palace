const { createApp } = Vue;

createApp({
    data() {
        return {
            productos: [],
            productosFarmacia: [],
            productosFarmaciaFiltrados: [],
            valorSeleccionado: "",
            valorInput: ""
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
    },

    methods: {
        filtroCheck(valorCheck, listaProductos) {
            if (valorCheck === "Todos") {
                return listaProductos
            }
            return listaProductos.filter(producto => producto.precio <= parseInt(valorCheck));
        },
        // filtroSearch(valorInput, listaProductos) {
        //     return listaProductos.filter(producto => producto.producto.includes(valorInput));
        // },
        filtroCruzado() {
            const listaProductosChecks = this.filtroCheck(this.valorSeleccionado, this.productosFarmacia);
            // const listaProductosSearch = this.filtroSearch(this.valorInput, listaProductosChecks);
            this.productosFarmaciaFiltrados = listaProductosChecks;
            // console.log(this.productosFarmaciaFiltrados);
        }
    },
}).mount("#app");
