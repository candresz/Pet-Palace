const { createApp } = Vue

createApp({
    data() {
      return {
        productos: [],
        cualquiera: null,
        productosJugueteria: []
      }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/petshop' )
        .then( response => response.json() )
        .then( ( data )  => {
            this.productos = data
            //console.log(this.productos)
            let categoria = 'jugueteria'
            this.productosJugueteria = this.productos.filter(producto => producto.categoria == categoria)
            console.log(this.productosJugueteria)
        })
        .catch(error => console.log(error))
    },
    methods:{
        
    }
}).mount('#app')