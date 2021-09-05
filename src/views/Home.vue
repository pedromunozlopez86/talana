<template>
  <v-container>
    <h2>Categoria: {{}}</h2>
    <h4>raiz</h4>
    <!-- {{productos}} -->

    <v-row>
      <v-col cols="12" md="3" v-for="producto,i in productos" :key="i">
      <v-card  class="mx-auto my-12" max-width="350">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="220"
        :src="producto.photo" contain
      ></v-img>
      <v-card-title class="display-5">{{producto.name}}</v-card-title>
      <v-card-text>
       <p>Precio: ${{producto.price}} </p>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
          <v-text-field class="px-16" v-model="cantidad">
          <v-icon slot="append" color="red" @click="aumenta(producto, i)">
            mdi-plus
          </v-icon>
          <v-icon slot="prepend" color="green" @click="disminuye(producto,i)">
            mdi-minus
          </v-icon>
        </v-text-field>
        <v-btn color="deep-purple lighten-2" icon @click="addProduct(producto)">
          <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: "Home",
  components: {},
  data(){
    return {
      cantidad: 1,
    }
  },

  mounted() {
    this.$store.dispatch('getProductosFromApi')
    },


  computed: {
    ...mapState(['productos','carrito']),
    ...mapGetters(['productos','getProductosInfo'])
  },   

  methods: {
    ...mapMutations([ "ADD_TO_CART","CLEAR_CART","ADD_ONE_MORE","REMOVE_ONE",]),
    ...mapActions(['getProductosFromApi', "add_to_cart","getRepuestos","clear_cart","add_One_More","remove_One",]),

    addProduct(item){
      alert("Agregando: " + JSON.stringify(item.name)+ " Cantidad: "+this.cantidad);
      let cantidad = this.cantidad
      let numId = item.id;
      const nuevoItem = { cantidad, id: numId };
      this.add_to_cart(nuevoItem);
      this.cantidad = 1;
      console.log(typeof(this.carrito))
    },

    cantidadPorItem(){
      if (this.aumenta){
        return this.aumenta
      }
    },

    aumenta(item,i){
this.cantidad++
      },
   
    disminuye(i){
       if(this.cantidad === 0){
        alert('no se puede!')
      } else{
      this.cantidad--}
    },


    }
  }

</script>

