<template>
  <v-row>
    <v-col cols="12" sm="3" v-for="(product, i) in products" :key="i">
      <v-card class="mx-auto" max-height="344">
        <v-img :src="product.img" height="200px" cover></v-img>
        <v-card-title>
          {{ product.type }}
        </v-card-title>
        <v-card-subtitle> NOKIIA </v-card-subtitle>

        <v-card-title>
          <v-card-subtitle>Subtitulo</v-card-subtitle>
          <v-card-title>{{ product.money }}</v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn variant="text">Preço </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="orange-lighten-2" icon="mdi-chevron-down">text</v-btn>
          </v-card-actions>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import { defineProps } from 'vue';
// import { useStore } from 'pinia';

const products = ref([
  {
    img: '3.png',
    type: 'Produto A',
    money: '500,00',
  },
  {
    img: '4.png',
    type: 'Produto B',
    money: '500,00',
  },
]);

// export default {
//   props: defineProps(['prop1', 'prop2']),
//   setup() {
//     const store = useStore(); // Assuming you have a Pinia store

//     // Additional setup logic if needed

//     return {
//       products,
//     };
//   },
// };
</script>

<style></style>
