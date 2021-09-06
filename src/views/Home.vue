<template>
  <v-container>
    <h2>Categoria: {{ categorias }}</h2>
    <h4>raiz</h4>
    <!-- {{productos}} -->

    <v-row>
      <v-col cols="12" md="3" v-for="(producto, i) in productos" :key="i">
        <v-card class="mx-auto my-12" max-width="350">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="220" :src="producto.photo" contain class="mb-5"> </v-img>
          <v-chip class="ml-5"
            close-icon="mdi-close-outline"
            color="success"
            v-if="producto.stock > 0"
            >Disponible</v-chip
          >
          <v-chip close-icon="mdi-close-outline" color="error" v-else class="ml-5">Sin Stock</v-chip>
          <v-card-title class="display-5">{{ producto.name }}</v-card-title>
          <v-card-text>
            <p>Precio: ${{ producto.price }}</p>
            <p>Stock: {{ producto.stock }}</p>
          </v-card-text>

          <v-card-actions>
            <v-row class="pb-5 ml-2">
              <v-col cols="4" class="pa-0 pl-3 borde-nuevo mt-3 ml-3" >
              <div class="d-flex align-start">
                <v-icon
                  slot="prepend"
                  color="error"
                  @click="disminuye(producto, i)">
                  mdi-minus
                </v-icon>
                <!-- <div class=" error"> -->
                <v-text-field class="input-carro pt-2 pl-1" dense placeholder="cantidad" v-model="cantidad">
                </v-text-field>
                <!-- </div> -->
                <v-icon slot="append" color="success" @click="aumenta(producto, i)">
                  mdi-plus
                </v-icon>
              </div>
              </v-col>
  <v-col cols="7">
    <div class="d-flex justify-center warning">

            <v-btn
              color="white"
              icon
              @click="addProduct(producto)">
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
    </div>
  </v-col>


            </v-row>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      cantidad: 1,
    };
  },

  mounted() {
    this.$store.dispatch("getProductosFromApi");
  },

  computed: {
    ...mapState(["productos", "carrito", "categorias"]),
    ...mapGetters(["productos", "getProductosInfo","categorias"]),
  },

  methods: {
    ...mapMutations([
      "ADD_TO_CART",
      "CLEAR_CART",
      "ADD_ONE_MORE",
      "REMOVE_ONE",
    ]),
    ...mapActions([
      "getProductosFromApi",
      "add_to_cart",
      "getRepuestos",
      "clear_cart",
      "add_One_More",
      "remove_One",
    ]),

    addProduct(item) {
      alert(
        "Agregando: " +
          JSON.stringify(item.name) +
          " Cantidad: " +
          this.cantidad
      );
      let cantidad = this.cantidad;
      let numId = item.id;
      const nuevoItem = { cantidad, id: numId };
      this.add_to_cart(nuevoItem);
      this.cantidad = 1;
      console.log(typeof this.carrito);
    },

    cantidadPorItem() {
      if (this.aumenta) {
        return this.aumenta;
      }
    },

    aumenta(item, i) {
      this.cantidad++;
    },

    disminuye(i) {
      if (this.cantidad === 0) {
        alert("no se puede!");
      } else {
        this.cantidad--;
      }
    },
  },
};
</script>


<style scoped>
.input-carro{
  width: 10px !important;
  height: 23px;
  justify-content: center;
  left: 10px !important;
  align-items: center;
}

.borde-nuevo{
  height: 2rem;
  border: 2px solid black;
}
</style>