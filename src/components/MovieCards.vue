<template>
  <div class="movies-container">
    <div
      v-for="movie in movies"
      :key="movie._id"
      class="movie-card"
      @mouseover="hoverMovie = movie._id"
      @mouseleave="hoverMovie = null"
      @click="goToVideoPlayer(movie._id)"
    >
      <img :src="movie.thumbnail" alt="Movie Thumbnail" class="movie-thumbnail" />
      <div class="movie-info">
        <h3>{{ movie.nome }}</h3>
        <p>{{ movie.descricao }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoverMovie: null,
      movies: [
        {
          _id: '1',
          nome: 'Shrek 5',
          descricao: 'O retorno da comédia em animação!',
          thumbnail: '/assets/shrek-thumbnail.jpg',
        },
        {
          _id: '2',
          nome: 'Batman: Caped Crusader',
          descricao: 'A nova jornada do cavaleiro das trevas.',
          thumbnail: '/assets/batman-thumbnail.jpg',
        },
      ],
    }
  },
  methods: {
    goToVideoPlayer(id) {
      this.$router.push({ name: 'VideoPlayer', params: { id } })
    },
  },
}
</script>

<style scoped>
.movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.movie-card {
  width: 200px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.movie-thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.movie-info {
  padding: 10px;
  background-color: #fff;
}

.movie-info h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.movie-info p {
  margin-top: 5px;
  color: #666;
}
</style>
