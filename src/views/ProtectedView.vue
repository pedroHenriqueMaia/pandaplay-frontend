<template>
  <div class="wrapper">
    <nav class="navbar">
      <h1 class="logo">PandaPlay</h1>
      <ul>
        <li><a href="/suporte">Suporte</a></li>
      </ul>
    </nav>
    <div class="movies-container">
      <div
        v-for="(movie, index) in movies"
        :key="movie._id"
        class="movie-card"
        @mouseover="hoverMovie = movie._id"
        @mouseleave="hoverMovie = null"
        @click="goToVideoPlayer(movie._id, movie.nome, movie.nomeArquivo)"
      >
        <div class="movie-image-wrapper">
          <img :src="movie.nomeThumbnail" alt="Movie Thumbnail" class="movie-thumbnail" />
        </div>
        <div class="movie-info">
          <h3>{{ movie.nome }}</h3>
          <p class="movie-description">{{ movie.descricao }}</p>
          <div class="movie-details">
            <span class="movie-duration">{{ movie.duracao }} min</span>
            <span class="movie-category">{{ movie.categoria }}</span>
          </div>
          <p class="movie-release-date">Lançado: {{ movie.quandoLancou }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      hoverMovie: null,
      movies: [],
      videoUrls: {},
    }
  },
  created() {
    this.fetchAllMovies()
  },
  methods: {
    async fetchAllMovies() {
      try {
        axios.get('http://localhost:3000/videos').then(async (response) => {
          this.movies = response.data
          await this.fetchVideoUrls()
        })
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      }
    },

    async fetchVideoUrls() {
      for (let movie of this.movies) {
        if (movie.nomeThumbnail) {
          try {
            const response = await axios.get('http://localhost:3000/videos/get-url', {
              params: { path: movie.nomeThumbnail },
            })
            this.videoUrls[movie._id] = response
            movie.nomeThumbnail = response.data
          } catch (error) {
            console.error(`Erro ao obter URL da tumb para ${movie.nomeArquivo}:`, error)
          }
        }
      }
    },

    async goToVideoPlayer(id, nome, nomeArquivo) {
      try {
        this.$router.push({
          name: 'VideoPlayer',
          query: { id: id, nome: nome, nomeArquivo: nomeArquivo },
        })
      } catch (error) {
        console.error(`Erro ao obter URL do video para ${nomeArquivo}:`, error)
      }
    },
  },
}
</script>

<style>
/* Estilos globais para garantir que toda a tela fique com fundo preto */
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  font-family: Arial, sans-serif;
}

/* Opcional: garantir que o wrapper ocupe toda a altura */
.wrapper {
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #1c1c1c;
}

.navbar .logo {
  font-size: 24px;
  font-weight: bold;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background-color: black;
}

.movie-card {
  width: 350px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  background-color: #1e1e1e;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.2);
}

.movie-image-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.movie-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-info {
  padding: 15px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .movie-info {
  opacity: 1;
}

.movie-info h3 {
  font-size: 20px;
  margin: 10px 0;
}

.movie-description {
  font-size: 14px;
  color: #ddd;
  margin-bottom: 10px;
}

.movie-details {
  font-size: 14px;
  margin-bottom: 10px;
  color: #f1f1f1;
}

.movie-duration,
.movie-category {
  margin-right: 10px;
}

.movie-release-date {
  font-size: 12px;
  color: #aaa;
}
</style>
