<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-5" width="400">
      <v-card-title class="text-center">Área Protegida</v-card-title>
      <v-card-text>
        <p>Bem-vindo! Você está autenticado.</p>
        <v-btn color="error" block @click="logout">Sair</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
