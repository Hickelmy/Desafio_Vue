<template>

<v-alert
                    v-if="successMessage"
                    type="success"
                    dismissible
                    @input="successMessage = false"
                  >
                    {{ successMessage }}
                  </v-alert>
  
                  <v-alert
                    v-if="errorMessage"
                    type="error"
                    dismissible
                    @input="errorMessage = false"
                  >
                    {{ errorMessage }}
                  </v-alert>
                  
    <v-app>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Cadastro de Categoria</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm">
                  <v-text-field
                    v-model="form.name"
                    label="Nome da Categoria"
                    required
                  ></v-text-field>
  
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
  import { ref } from "vue";
  import axios from "axios";
  
  const form = ref({
    name: "",
  });
  
  const successMessage = ref("");
  const errorMessage = ref("");
  
  const submitForm = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/categories/add",
        form.value
      );
  
      form.value = {
        name: "",
      };
  
      successMessage.value = "Categoria cadastrada com sucesso!";
      errorMessage.value = ""; 
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
  
      errorMessage.value =
        "Erro ao cadastrar categoria. Verifique se a categoria já existe.";
      successMessage.value = ""; 
    }
  };
  </script>
  