<template>
  <div>
    <h1>Processando Login...</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    // Extrai o token da URL
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      // Armazena o token no localStorage
      localStorage.setItem('access_token', accessToken);
      // Redireciona para a página de dashboard
      this.$router.push({ name: 'dashboard' });
    } else {
      // Redireciona para a página inicial em caso de erro
      this.$router.push({ name: 'home' });
    }
  },
};
</script>
