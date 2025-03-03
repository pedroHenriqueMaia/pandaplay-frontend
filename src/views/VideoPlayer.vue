<template>
  <div class="video-player">
    <h1>{{ videoTitle }}</h1>
    <video
      ref="videoPlayer"
      :src="videoUrl"
      controls
      autoplay
      @canplay="onVideoLoad"
      class="video-player-video"
    >
      Seu navegador não suporta a tag de vídeo.
    </video>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      videoTitle: '',
      videoUrl: '',
      isVideoLoaded: false, // Controle para indicar quando o vídeo está carregado
    }
  },
  async created() {
    this.videoTitle = this.$route.query.nome // Usando o ID do filme
    this.videoUrl = (
      await axios.get('http://localhost:3000/videos/get-url', {
        params: { path: this.$route.query.nomeArquivo },
      })
    ).data
  },
  methods: {
    // Evento que é chamado quando o vídeo está pronto para ser reproduzido
    onVideoLoad() {
      this.isVideoLoaded = true
      this.scrollToVideo() // Rola até o vídeo quando carregado
    },
    scrollToVideo() {
      // Espera o vídeo carregar e rola para ele
      if (this.isVideoLoaded) {
        this.$nextTick(() => {
          this.$refs.videoPlayer.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        })
      }
    },
  },
}
</script>

<style scoped>
.video-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Faz com que ocupe toda a altura da tela */
  width: 100vw; /* Faz com que ocupe toda a largura da tela */
  padding: 0;
  margin: 0;
  background-color: #000; /* Fundo preto para simular tela cheia */
}

.video-player-video {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Faz o vídeo se ajustar corretamente dentro da tela */
}

h1 {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 24px;
}
</style>
