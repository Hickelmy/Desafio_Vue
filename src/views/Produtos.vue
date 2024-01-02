<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Cadastro de Produto</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitForm">
                <v-text-field
                  v-model="form.name"
                  label="Nome do Produto"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.description"
                  label="Descrição"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.price"
                  label="Preço"
                  type="number"
                  required
                ></v-text-field>
                <v-date-picker
                  v-model="form.expiration_date"
                  label="Data de Expiração"
                  required
                ></v-date-picker>
                <v-file-input
                  v-model="form.image"
                  label="Imagem do Produto"
                  show-size
                  accept="image/*"
                  required
                ></v-file-input>
                <v-select
                  v-model="form.category_id"
                  :items="categories"
                  label="Categoria"
                  item-text="text"
                  item-value="value"
                  required
                ></v-select>
                <v-btn type="submit" color="primary">Cadastrar</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const form = ref({
  name: "",
  description: "",
  price: 0,
  expiration_date: null,
  image: null,
  category_id: null,
});

const categories = ref([]);
const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref("success");

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/categories/get"
    );
    // categories.value = response.data.map((category) => ({ text: category.name, value: category.id }));
    categories.value = response.data.map((category) => category.name);

    console.log("categories.value :", categories.value);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
  }
};

const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("description", form.value.description);
    formData.append("price", form.value.price);
    formData.append(
      "expiration_date",
      form.value.expiration_date.toISOString().split("T")[0]
    );
    formData.append("category_id", form.value.category_id);

    formData.append("image", form.value.image[0]);
    console.log("form.value.image : ", form.value.image);

    if (
      Array.isArray(form.value.image) &&
      form.value.image[0] instanceof File
    ) {
      formData.append("image", form.value.image[0]);
    } else {
      console.error("Imagem inválida");
    }
    console.log("form.value.image : ", form.value.image);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/produtos/add",
      formData
    );

    showAlert.value = true;
    alertMessage.value = "Produto cadastrado com sucesso!";
    alertType.value = "success";

    resetForm();
  } catch (error) {
    showAlert.value = true;
    alertMessage.value = "Erro ao cadastrar produto";
    alertType.value = "error";

    console.error("Erro ao cadastrar produto:", error);
  }
};

const resetForm = () => {
  form.value.name = "";
  form.value.description = "";
  form.value.price = 0;
  form.value.expiration_date = null;
  form.value.image = null;
  form.value.category_id = "";
};

onMounted(() => {
  fetchCategories();
});
</script>