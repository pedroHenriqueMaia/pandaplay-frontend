<template>
  <v-container fluid class="login-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-5" elevation="10" outlined>
          <v-card-title class="headline">{{ isRegistering ? 'Criar Conta' : 'Login' }}</v-card-title>
          
          <v-form @submit.prevent="isRegistering ? handleRegister() : handleLogin()">
            <v-text-field v-model="email" label="E-mail" outlined required type="email"/>
            <v-text-field v-model="password" label="Senha" :type="passwordVisible ? 'text' : 'password'" outlined required @click:append="togglePasswordVisibility" append-icon="mdi-eye" />
            
            <v-text-field 
              v-if="isRegistering" 
              v-model="confirmPassword" 
              label="Confirmar Senha" 
              :type="passwordVisible ? 'text' : 'password'" 
              outlined 
              required 
            />
            
            <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
            <span v-if="successMessage" class="success-message">{{ successMessage }}</span>
            
            <v-btn type="submit" color="primary" block :disabled="isRegistering && !isFormValid">{{ isRegistering ? 'Cadastrar' : 'Entrar' }}</v-btn>
          </v-form>

          <v-btn v-if="isRegistering" color="grey" block class="mt-2" @click="isRegistering = false">Cancelar</v-btn>
          
          <v-btn v-if="!isRegistering" color="google" block class="mt-4" @click="handleGoogleLogin">
            <v-icon left>mdi-google</v-icon>
            Entrar com Google
          </v-btn>

          <p class="text-center mt-4">
            <a href="#" @click.prevent="isRegistering = true">{{ isRegistering ? '' : 'Criar Conta' }}</a>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';  // Importando o Vue Router

const router = useRouter();  // Usando o Vue Router para navegação

const isRegistering = ref(false);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordVisible = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const isFormValid = computed(() => {
  return email.value && password.value && confirmPassword.value === password.value && password.value.length >= 6;
});

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogin = async () => {
  try {
    await axios.post('http://localhost:3000/auth/login', { email: email.value, password: password.value });
    successMessage.value = 'Login bem-sucedido!';
    setTimeout(() => successMessage.value = '', 3000);
    
    // Redireciona para a página desejada após o login
    router.push('/dashboard');  // Altere para o caminho desejado
  } catch (error) {
    errorMessage.value = 'Erro ao fazer login';
    setTimeout(() => errorMessage.value = '', 3000);
  }
};

const handleRegister = async () => {
  if (!isFormValid.value) return;
  try {
    await axios.post('http://localhost:3000/auth/register', { email: email.value, password: password.value });
    successMessage.value = 'Conta criada com sucesso!';
    setTimeout(() => {
      successMessage.value = '';
      isRegistering.value = false;
    }, 3000);
  } catch (error) {
    errorMessage.value = 'Erro ao criar conta';
    setTimeout(() => errorMessage.value = '', 3000);
  }
};

const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:3000/auth/google';
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  background-image: url('../assets/bg-login.png');
  background-size: cover;
  background-position: center;
}
.v-card {
  background-color: rgba(255, 255, 255, 0.95);
}
.error-message {
  color: red;
  font-size: 0.9rem;
}
.success-message {
  color: green;
  font-size: 0.9rem;
}
</style>
