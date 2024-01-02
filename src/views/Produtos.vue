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
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.category_id"
                      :items="categories"
                      label="Categoria"
                      item-text="text"
                      item-value="value"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn icon @click="openCategoryDialog">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-dialog v-model="categoryDialog" max-width="600px">
                  <v-card>
                    <v-card-title>Cadastro de Categoria</v-card-title>
                    <v-card-text>
                      <v-form @submit.prevent="submitCategoryForm">
                        <v-text-field
                          v-model="categoryForm.name"
                          label="Nome da Categoria"
                          required
                        ></v-text-field>

                        <v-row>
                          <v-col>
                            <v-btn @click="categoryDialog = false"
                              >Cancelar</v-btn
                            >
                          </v-col>
                          <v-col>
                            <v-btn type="submit" color="primary"
                              >Confirmar</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>

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

const categoryDialog = ref(false);
const categoryForm = ref({
  name: "",
});

const openCategoryDialog = () => {
  categoryDialog.value = true;
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/categories/get"
    );
    categories.value = response.data.map((category) => category.name);
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

    if (
      Array.isArray(form.value.image) &&
      form.value.image[0] instanceof File
    ) {
      formData.append("image", form.value.image[0]);
    } else {
      console.error("Imagem inválida");
    }

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

const submitCategoryForm = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/categories/add",
      categoryForm.value
    );

    fetchCategories();

    categoryForm.value = {
      name: "",
    };

    successMessage.value = "Categoria cadastrada com sucesso!";
    errorMessage.value = "";

    categoryDialog.value = false; 
  } catch (error) {
    console.error("Erro ao cadastrar categoria:", error);

    errorMessage.value =
      "Erro ao cadastrar categoria. Verifique se a categoria já existe.";
    successMessage.value = "";
  }
};

onMounted(() => {
  fetchCategories();
});
</script>
