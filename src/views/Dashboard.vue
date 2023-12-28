<template>
    <v-container>
      <h1>Dashboard</h1>
  
      <v-data-table
        :headers="headers"
        :items="filteredProducts"
        :items-per-page="perPage"
        :page.sync="page"
        :server-items-length="totalItems"
        :loading="loading"
        @update:page="loadData"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.expiration_date }}</td>
            <td>{{ item.category_id }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Description', value: 'description' },
  { text: 'Price', value: 'price' },
  { text: 'Expiration Date', value: 'expiration_date' },
  { text: 'Category ID', value: 'category_id' },
];

const filteredProducts = ref([]);
const perPage = ref(10);
const page = ref(1);
const totalItems = ref(0);
const loading = ref(false);

const loadData = async () => {
  loading.value = true;

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/produtos/get', {
      params: {
        per_page: perPage.value,
        page: page.value,
      },
    });

    filteredProducts.value = response.data.data;
    totalItems.value = response.data.meta.total;
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    loading.value = false;
  }
};

watch([perPage, page], () => {
  loadData();
});

onMounted(() => {
  loadData();
});
</script>