<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" absolute bottom temporary left>
      <h3 class="pl-4 pt-10">Categorias</h3>
      <v-list nav dense v-for="{ name, i } in categorias" :key="i">
        <v-list-item-group
        class="pl-5"
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <!-- <v-list-item-title>Categorias</v-list-item-title> -->
          <v-list-item>
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!--Sidebar Carro-->
    <v-navigation-drawer
      app
      right
      float-end
      temporary
      hide-overlay
      bottom
      width="35vw"
      v-model="drawer2"
    >
      <v-list-item-title class="primary--text pt-3 pl-3">
        Resumen de Compra
      </v-list-item-title>

      <v-list-item-content> </v-list-item-content>

      <v-list dense>
        <v-list-item v-for="item, i in carrito" :key="item.name">
          <v-list-item-content>
            <v-list-item-title>
              <v-row>
                <v-col cols="5">
                  <p class="mt-5">
                    Nombre: {{ getProductosInfo(item.id).name }} 
                  </p>
                  <p> Precio: ${{ getProductosInfo(item.id).price}}</p>
                </v-col>


                <v-col cols="2" class="">
                  <div class="d-flex">
                   <v-icon
                      slot="prepend"
                      color="green"
                      @click="remove(i)"
                    >
                      mdi-minus
                    </v-icon>
                  <v-text-field class="px-16" v-text="item.cantidad"> </v-text-field>
                    <v-icon
                      slot="append"
                      color="red"
                      @click="add(i)"
                    >
                      mdi-plus
                    </v-icon>                   
                 </div>
                </v-col>

                <v-col cols="2" class="text-center">
                  <p class="text-center">Sub-total: $ {{getProductosInfo(item.id).price * item.cantidad}} </p>
                </v-col>
              </v-row>
            </v-list-item-title>
            <v-list-item-title></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
              <h3 >Subtotal: {{sumaTotal}}</h3>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>LOGO</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-input></v-input>
      <v-btn icon @click="hola">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-badge
        class="mr-5 mt-1"
        color="green"
        :content="totalItems"

      >
        <v-icon @click.stop="drawer2 = !drawer2">mdi-cart</v-icon>
      </v-badge>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <p>Footer</p>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "App",

  data: () => ({
    drawer: false,
    drawer2: false,
    group: null,

    // totalItems:0,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    ...mapGetters(["productos", "carrito", "totalItems","getProductosInfo"]),
    ...mapState(["productos", "carrito","categorias"]),

    sumaTotal(){
      let sum =0;
      this.carrito.forEach(item =>{
       let produc = this.getProductosInfo(item.id)
        sum+= produc.price * item.cantidad
      })
      return sum
    }
  },
  created(){
    console.log(this.$store)
    this.$state.getCategory();

  },

  methods: {
    ...mapActions(['remove_One','getCategory']),
    hola() {
      console.log(this.totalItems);
    },
    getCategorias() {
      axios
        .get("http://sva.talana.com:8000/api/product-category/")
        .then((response) => (this.categorias = response))
        .then((categorias) => {
          console.log(categorias);
        });
      return categorias;
    },

    add(item){
      this.carrito[item].cantidad++;
    },
    remove(item){
      if (this.carrito[item].cantidad === 1) {
        this.remove_One(item);
      } else {
        this.carrito[item].cantidad--;
      }
    },

    // total(){
    //   carrito.forEach(element => {
    //     let valorUnitario=  getProductosInfo(item.id).price 
    //     let cantidad = element.cantidad
    //     let subtotal = valorUnitario*cantidad
    //     subtotal += subtotal
    //     return subtotal
    //   });
    // }
  },
};
</script>
