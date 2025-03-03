<template>
  <div class="chat-container">
    <h2>Chat de Suporte</h2>
    <div class="chat-window">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="chat-message"
        :class="{ support: msg.userType === 'support', client: msg.userType === 'client' }"
      >
        <div class="message-header">
          <span class="sender">{{ msg.userType === 'support' ? '👨‍💼 Suporte' : '🙋 Cliente' }}</span>
          <span class="timestamp">{{ new Date(msg.timestamp).toLocaleTimeString() }}</span>
        </div>
        <div class="message-body">{{ msg.message }}</div>
      </div>
    </div>
    <div class="chat-input">
      <input
        type="text"
        v-model="message"
        placeholder="Digite sua mensagem..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Chat',
  data() {
    return {
      socket: null,
      message: '',
      messages: [],
      email: localStorage.getItem('email') || '',
      googleId: localStorage.getItem('googleId') || '',
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000')

    this.socket.emit('joinChat', { email: this.email, googleId: this.googleId })

    this.socket.on('message', (data) => {
      this.messages.push(data)
    })

    this.socket.on('userJoined', (data) => {
      console.log('Usuário entrou: ', data)
    })
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        this.socket.emit('message', { message: this.message })
        this.message = ''
      }
    },
  },
}
</script>

<style scoped>
.chat-container {
  background-color: #1e1e1e;
  color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 15px;
}

.chat-window {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 5px;
  background-color: #2a2a2a;
}

.chat-message {
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 10px;
  max-width: 80%;
  word-wrap: break-word;
}

.support {
  background-color: #283593;
  color: white;
  align-self: flex-start;
}

.client {
  background-color: #388e3c;
  color: white;
  align-self: flex-end;
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  opacity: 0.8;
}

.message-body {
  margin-top: 5px;
  font-size: 14px;
}

.chat-input {
  display: flex;
  margin-top: 10px;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #2e2e2e;
  color: white;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px 15px;
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
}

.chat-input button:hover {
  background-color: #ff5252;
}
</style>
