<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
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
                v-model="selectedSort"
                clearable
                label="Ordenar por"
                :items="sortOptions"
                variant="outlined"
              ></v-select>
            </v-toolbar>

            <v-card variant="outlined" class="my-2">
              <v-row>
                <v-col
                  v-for="product in filteredProducts"
                  :key="product.id"
                  cols="12"
                  sm="4"
                >
                  <v-card variant="outlined" class="my-2">
                    <v-img :src="product.image" alt="Product Image" class="v-responsive"></v-img>
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
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";

const selectedSort = ref(null);
const sortOptions = ["Alfabético", "Data mais recente"];
const products = ref([]);
const search = ref("");

const items = [
  {
    text: "Home",
    disabled: false,
    href: "Bread_dashboard",
  },
];

onMounted(async () => {
  fetchProducts();
});

const fetchProducts = async () => {
  const apiUrl = `http://127.0.0.1:8000/api/produtos/get?search=${search.value}`;
  try {
    const response = await axios.get(apiUrl);
    products.value = response.data.data;

    if (selectedSort.value === "Alfabético") {
      products.value.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort.value === "Data mais recente") {
      products.value.sort(
        (a, b) => new Date(b.expiration_date) - new Date(a.expiration_date)
      );
    }
  } catch (error) {
    console.error("Erro ao buscar produtos da API:", error);
  }
};

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    return !search.value || product.name.includes(search.value);
  });
});

watch([search, selectedSort], () => {
  fetchProducts();
});
</script>
