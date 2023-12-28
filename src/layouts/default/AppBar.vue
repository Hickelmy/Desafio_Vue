<template>
  <!-- Main App Bar -->
  <v-app-bar height="80" flat fixed>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <!-- <h4>Manaus<strong class="color">Express</strong>Brasil</h4> -->
      <v-col cols="12" sm="10">
      <router-link to="/">
      <v-img
        :width="100"
        aspect-ratio="1/1"
        cover
        src="../../assets/logoManaus.png"
      ></v-img>
    </router-link>
  </v-col>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn color="success">
      <v-img :width="20" src="../../assets/brasil.png"></v-img>
      Brasil
    </v-btn>
    <v-btn prepend-icon="mdi mdi-email">
      <template v-slot:prepend>
        <v-icon></v-icon>
      </template>
      email@email.com.br
    </v-btn>
    <v-btn prepend-icon="mdi mdi-cart">
      <template v-slot:prepend>
        <v-icon></v-icon>
      </template>
      Comprar
    </v-btn>
  </v-app-bar>

  <!-- <v-navigation-drawer v-model="drawer" app> </v-navigation-drawer> -->

  <v-navigation-drawer :width="220" v-model="drawer" app>
    <v-list>
      <v-list-item>
        <v-btn @click="$router.push('/')">
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn @click="$router.push('/dashboard')">
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn @click="$router.push('/login')">
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn @click="$router.push('/cadastro')">
          <v-list-item-content>
            <v-list-item-title>Cadastro</v-list-item-title>
          </v-list-item-content>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar height="80" flat color="black" fixed>
    <v-btn append-icon="mdi mdi-link" class="mr-16">
      <template v-slot:append>
        <v-icon></v-icon>
      </template>
      Home
    </v-btn>

    <v-btn append-icon="mdi mdi-link" class="mr-16">
      <template v-slot:append>
        <v-icon></v-icon>
      </template>
      Dashboard
    </v-btn>

    <v-btn append-icon="mdi mdi-link" class="mr-16">
      <template v-slot:append>
        <v-icon></v-icon>
      </template>
      Login
    </v-btn>

    <v-btn append-icon="mdi mdi-link" class="mr-16">
      <template v-slot:append>
        <v-icon></v-icon>
      </template>
      Cadastro
    </v-btn>
  </v-app-bar>

  <v-container> </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const drawer = ref(false);
</script>

<style scoped>
.color {
  color: #1bc45f;
}
</style>
