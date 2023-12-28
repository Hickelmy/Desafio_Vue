<template>
    <v-container>
      <h1>Dashboard</h1>
  
      <v-toolbar>
        <v-text-field
          v-model="searchTerm"
          label="Search"
          outlined
          solo-inverted
          clearable
        ></v-text-field>
  
        <v-select
          v-model="searchCategory"
          :items="searchCategories"
          label="Search Category"
          solo-inverted
        ></v-select>
  
        <v-btn @click="search" icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
  
      <v-dialog v-model="editDialog" max-width="600px">
        <v-card>
          <v-card-title>Editar Produto</v-card-title>
          <v-card-text>
            <v-form ref="editForm" @submit.prevent="saveEdit">
              <v-text-field v-model="selectedProduct.name" label="Nome"></v-text-field>
              <v-text-field v-model="selectedProduct.description" label="Descrição"></v-text-field>
              <v-text-field v-model="selectedProduct.price" label="Preço"></v-text-field>
  
              <v-alert
                v-if="successMessage"
                type="success"
                dismissible
                @input="clearMessages"
              >
                {{ successMessage }}
              </v-alert>
  
              <v-card-actions>
                <v-btn @click="editDialog = false">Cancelar</v-btn>
                <v-btn color="primary" type="submit">Salvar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="deleteDialog" max-width="400px">
        <v-card>
          <v-card-title>Confirmar</v-card-title>
          <v-card-text>
            Tem certeza de que deseja excluir este produto?
          </v-card-text>
          <v-card-actions>
            <v-btn @click="deleteDialog = false">Cancelar</v-btn>
            <v-btn color="error" @click="confirmDelete">Deletar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
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
            <td>
              <v-icon @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon @click="confirmDeleteItem(item)">mdi-delete</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
  
      <v-alert
        v-if="successMessage"
        type="success"
        dismissible
        @input="clearMessages"
      >
        {{ successMessage }}
      </v-alert>
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
    { text: 'Actions', value: 'actions', sortable: false },
  ];
  
  const searchTerm = ref('');
  const searchCategory = ref('name'); // Default to searching by name
  const searchCategories = ['name', 'description', 'price', 'expiration_date', 'category_id'];
  
  const filteredProducts = ref([]);
  const perPage = ref(10);
  const page = ref(1);
  const totalItems = ref(0);
  const loading = ref(false);
  const editDialog = ref(false);
  const deleteDialog = ref(false);
  const selectedProduct = ref(null);
  const successMessage = ref('');
  const errorMessage = ref('');
  
  const loadData = async () => {
    try {
      loading.value = true;
  
      const response = await axios.get('http://127.0.0.1:8000/api/produtos/get', {
        params: {
          per_page: perPage.value,
          page: page.value,
          [searchCategory.value]: searchTerm.value,
        },
      });
  
      filteredProducts.value = response.data.data;
      totalItems.value = response.data.meta.total;
      errorMessage.value = '';
    } catch (error) {
      console.error('Error loading data:', error);
      errorMessage.value = 'Error loading data. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  
  const editItem = (item) => {
    selectedProduct.value = { ...item };
    editDialog.value = true;
  };
  
  const confirmDeleteItem = (item) => {
    selectedProduct.value = item;
    deleteDialog.value = true;
  };
  
  const saveEdit = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('id', selectedProduct.value.id);
      formData.append('name', selectedProduct.value.name);
      formData.append('description', selectedProduct.value.description);
      formData.append('price', selectedProduct.value.price);
  
      await axios.put('http://127.0.0.1:8000/api/produtos/update', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      successMessage.value = 'Product updated successfully';
      editDialog.value = false;
  
      loadData();
    } catch (error) {
      errorMessage.value = 'Error updating product';
      console.error('Error updating product:', error);
    }
  };
  
  const search = () => {
    loadData(); // Reload all data
  };
  
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/produtos/delete?id=${selectedProduct.value.id}`);
  
      successMessage.value = 'Product deleted successfully';
      deleteDialog.value = false;
  
      loadData();
    } catch (error) {
      errorMessage.value = 'Error deleting product';
      console.error('Error deleting product:', error);
    }
  };
  
  const clearMessages = () => {
    successMessage.value = '';
    errorMessage.value = '';
  };
  
  watch([perPage, page], () => {
    loadData();
  });
  
  onMounted(() => {
    loadData();
  });
  </script>
  