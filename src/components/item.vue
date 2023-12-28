<template>
  <div>
    <v-expansion-panel class="mb-6">
      <v-expansion-panel v-for="i in 3" :key="i">
        <v-expansion-panel-title expand-icon="mdi-menu-down">
          ManausExpress
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          TEXT TEXTO TEXTO TTEXTO
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
        Modelo
      </v-expansion-panel-title>

      <v-expansion-panel-text> TEXTO TEXTO TEXTO </v-expansion-panel-text>
    </v-expansion-panel>


<v-expansion-panel expand focusable>
    
</v-expansion-panel>

    <v-expansion-panel-title>
      MARQUE
      <template v-slot:actions="{ expanded }">
        <v-icon
          :color="!expanded ? 'teal' : ''"
          :icon="expanded ? 'mdi-pencil' : 'mdi-check'"
        ></v-icon>
      </template>
    </v-expansion-panel-title>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
