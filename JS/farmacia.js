const { createApp } = Vue

createApp({
    data() {
      return {
        productos: [],
        cualquiera: null,
        productosFarmacia: []
      }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/petshop' )
        .then( response => response.json() )
        .then( ( data )  => {
            this.productos = data
            //console.log(this.productos)
            let categoria = 'farmacia'
            this.productosFarmacia = this.productos.filter(producto => producto.categoria == categoria)
            console.log(productosFarmacia)
        })
        .catch(error => console.log(error))
    },
    methods:{
        
    }
}).mount('#app')