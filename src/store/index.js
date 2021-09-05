import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productos: [],
    carrito: [],
    categorias:[],
    cantidad: '',
  },

  getters:{
    productos: state => {return state.productos},
    carrito: state => {return state.carrito},
    totalItems(state) {
      return state.carrito.length;
    },

    getProductosInfo:(state) => (id) =>  {
      const { productos } = state;
      console.log(productos)
      const producto = productos.find((r) => r.id === id);
      console.log(producto)
      return producto;
    },

     precioTotal(state) {
      const precioTotal = state.productos.reduce((acc, p) => acc  +p.price * p.cantidad,0);
      console.log(precioTotal)
      return precioTotal
      },


    },
  mutations: {
      GET_PRODUCTS(state, productos) {
      state.productos = productos;
    },

    ADD_TO_CART(state, {id, cantidad}) {
      const { carrito } = this.state;
      const productoExistsIndex = carrito.findIndex((r) => r.id === id);
      productoExistsIndex !== -1
        ? carrito[productoExistsIndex].cantidad++
        : carrito.push({ id, cantidad });
    },

    CLEAR_CART(state){
      state.carrito = [];
    },
    
    ADD_ONE_MORE(state,id){
      state.id.map((r)=>{
        if(r.id === id) 
        cantidad++    
      })
    },
    
    REMOVE_ONE(state,i){
      state.carrito.splice(i,1);
    }

  },

  actions: {
    getProductosFromApi({commit}) {
      axios.get('http://sva.talana.com:8000/api/product/')
      .then(response => response.data)
      .then(productos =>{
        console.log(productos);
        commit('GET_PRODUCTS', productos)
      })
    },

    add_to_cart({ commit },item) {
      console.log(item);
      commit("ADD_TO_CART", item);
    },

    clear_cart({commit, state}){
      console.log(state.carrito)
      commit("CLEAR_CART")
    },

     add_One_More({commit}){
      commit("ADD_ONE_MORE")
    },

    remove_One({commit, state},i){
      console.log(state)
      commit("REMOVE_ONE",i)
    },

    getCategory({commit}) {
      axios
        .get("http://sva.talana.com:8000/api/product-category/")
        .then((response) => (this.categorias = response.data))
        .then((categorias) => {
          console.log(categorias);
        });
        commit(categorias)
      // return categorias;
    },
  },

})
