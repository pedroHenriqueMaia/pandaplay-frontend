<template>
  <div class="home">
    <!-- Navbar -->
    <nav class="navbar">
      <h1 class="logo">PandaPlay</h1>
      <ul>
        <li><a href="#">Home</a></li>
      </ul>
    </nav>

    <!-- Seção de apresentação da plataforma -->
    <section class="intro">
      <h2>Bem-vindo ao PandaPlay</h2>
      <p>
        Conheça a plataforma de streaming que revoluciona a forma de assistir seus filmes e séries
        favoritos. Com uma curadoria exclusiva, conteúdos de alta qualidade e uma experiência
        imersiva, o PandaPlay é o futuro do entretenimento.
      </p>
      <button @click="goToLogin" class="login-btn">Entrar</button>
    </section>

    <!-- Carrossel de filmes em breve -->
    <section class="carousel">
      <h2>Filmes em Breve</h2>
      <div class="carousel-container">
        <button class="arrow left" @click="prevSlide">&#10094;</button>
        <div class="carousel-slide">
          <img
            :src="filmesEmBreve[currentIndex].nomeThumbnail"
            :alt="filmesEmBreve[currentIndex].nome"
          />
          <div class="slide-info">
            <h3>{{ filmesEmBreve[currentIndex].nome }}</h3>
            <p>{{ filmesEmBreve[currentIndex].descricao }}</p>
            <span
              >{{ filmesEmBreve[currentIndex].duracao }} min |
              {{ filmesEmBreve[currentIndex].categoria }}</span
            >
          </div>
        </div>
        <button class="arrow right" @click="nextSlide">&#10095;</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      filmesEmBreve: [
        {
          _id: '1',
          nome: 'Futuro Apocalíptico',
          descricao: 'Um mundo devastado onde a humanidade luta para sobreviver.',
          duracao: 120,
          categoria: 'Ficção Científica',
          quandoLancou: 'Em breve',
          nomeThumbnail: '1.jpg',
        },
        {
          _id: '2',
          nome: 'A Última Missão',
          descricao: 'Um agente secreto precisa completar uma missão impossível.',
          duracao: 110,
          categoria: 'Ação',
          quandoLancou: 'Em breve',
          nomeThumbnail: '2.jpg',
        },
        {
          _id: '3',
          nome: 'O Mistério do Lago',
          descricao: 'Um suspense envolvente sobre um desaparecimento inexplicável.',
          duracao: 95,
          categoria: 'Suspense',
          quandoLancou: 'Em breve',
          nomeThumbnail: '3.jpg',
        },
        {
          _id: '4',
          nome: 'Reino Perdido',
          descricao: 'Uma aventura épica em um reino esquecido pelo tempo.',
          duracao: 130,
          categoria: 'Fantasia',
          quandoLancou: 'Em breve',
          nomeThumbnail: '4.jpg',
        },
      ],
      currentIndex: 0, // Índice atual do carrossel
    }
  },
  created() {
    this.fetchVideoUrls()
  },
  methods: {
    async fetchVideoUrls() {
      for (let movie of this.filmesEmBreve) {
        if (movie.nomeThumbnail) {
          try {
            const response = await axios.get('http://localhost:3000/videos/get-url', {
              params: { path: movie.nomeThumbnail },
            })
            movie.nomeThumbnail = response.data
          } catch (error) {
            console.error(`Erro ao obter URL da tumb para ${movie.nomeThumbnail}:`, error)
          }
        }
      }
    },
    prevSlide() {
      this.currentIndex =
        this.currentIndex === 0 ? this.filmesEmBreve.length - 1 : this.currentIndex - 1
    },
    nextSlide() {
      this.currentIndex =
        this.currentIndex === this.filmesEmBreve.length - 1 ? 0 : this.currentIndex + 1
    },
    goToLogin() {
      // Redireciona para a view de Login (LoginView)
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style>
/* Estilos globais para garantir que toda a tela tenha fundo preto */
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  color: white;
  font-family: Arial, sans-serif;
}

.home {
  padding: 20px;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1c1c1c;
  padding: 15px 30px;
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

/* Seção de apresentação */
.intro {
  text-align: center;
  margin: 40px 0;
}

.intro h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.intro p {
  font-size: 18px;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.login-btn {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

/* Carrossel */
.carousel {
  margin-top: 50px;
  text-align: center;
}

.carousel h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide {
  position: relative;
  width: 400px;
  height: 250px;
  background-color: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 20px;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-info {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  padding: 10px;
  text-align: left;
}

.arrow {
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
}
</style>
