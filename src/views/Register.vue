<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
              <v-card-title class="headline">Cadastro de Usuário</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field
                    v-model="form.name"
                    label="Nome"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    type="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password"
                    label="Senha"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="primary" class="mr-4">Cadastrar</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Register",
  setup() {
    const router = useRouter();
    const showAlert = ref(false);
    const alertMessage = ref("");
    const alertType = ref<"error" | "success" | "warning" | "info">("error");
    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const register = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.value),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        if (data.token) {
          // Save the token in local storage
          localStorage.setItem("token", data.token);
          router.push("/dashboard");
          showAlert.value = true;
          alertMessage.value = "Cadastro com sucesso!";
          alertType.value = "success";
        } else {
          throw new Error("Token inválido ou expirado");
        }
      } catch (error) {
        showAlert.value = true;
        alertMessage.value = error.message;
        alertType.value = "error";
      }
    };

    return {
      form,
      register,
      showAlert,
      alertMessage,
      alertType,
    };
  },
});
</script>

<style scoped>
body {
  background: url("@/assets/background-image.jpg") no-repeat center center fixed;
  background-size: cover;
}

.v-main {
  background: rgba(255, 255, 255, 0.8);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-card {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
}
</style>
