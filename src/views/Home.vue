
import Products from '@/components/Products.vue';
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <!-- <v-col cols="12" sm="2">
            <v-card color="#F5F5F5" flat class="mt-14 pa-2" width="100%">
              <h4>Teste 01</h4>
              <span>Teste 02</span>
              <v-select
                clearable
                label="Select"
                :items="['Tempo', 'Tamanho', 'Cor', 'Detalhes']"
                variant="outlined"
                class="mt-2"
              ></v-select>
              <v-divider></v-divider>
              <Item />
            </v-card>
          </v-col> -->

          <v-col cols="12" sm="10">
            <v-breadcrumbs :items="items">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
            </v-breadcrumbs>
            <v-divider></v-divider>

            <v-toolbar color="transparent" class="pa-4">
              <h1>Items</h1>
              <v-spacer></v-spacer>
              <v-select
                clearable
                label="Selecione"
                :items="['Manaus', 'Belem', 'Sao Paulo', 'Rio de Janeiro']"
                variant="outlined"
              ></v-select>
            </v-toolbar>

            <!-- <ProductsVue /> -->

            <v-card variant="outlined" class="my-2">
              <v-row>
                <v-col
                  v-for="product in products"
                  :key="product.id"
                  cols="12"
                  sm="4"
                >
                  <v-card variant="outlined" class="my-2">
                    <v-img :src="product.image" alt="Product Image"></v-img>
                    <v-card-title>{{ product.name }}</v-card-title>
                    <v-card-subtitle>{{ product.price }}</v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const selectedCity = ref(null);
const products = ref([]);

const items = [
  {
    text: "Home",
    disabled: false,
    href: "Bread_dashboard",
  },
];

onMounted(async () => {
  // Substitua a URL abaixo pela sua API real
  const apiUrl = "http://127.0.0.1:8000/api/produtos/get";
  try {
    const response = await axios.get(apiUrl);
    products.value = response.data.data;
  } catch (error) {
    console.error("Erro ao buscar produtos da API:", error);
  }
});
</script>
