<template>
  <div class="container">
    <h2 class="title-nubank">Nubank</h2>
      <div>
        <label for="username">Login:</label>
        <input type="text"
          name="username"
          id="username"
          v-model="username"
          placeholder="CPF">
        <label for="password">Password</label>
        <input type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="password">
        <button @click="authenticate()">Consultar</button>
      </div>
    <span class="message" v-if="message" v-html="message"></span>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    username: null,
    password: null,
    message: null,
    api: {},
  }),
  methods: {
    /** Handle the authentication request */
    async authenticate() {
      if (this.username === null) {
        this.message = 'Username: is empty!';
        return;
      }
      if (this.password === null) {
        this.message = 'Password: is empty!';
        return;
      }

      const dataPost = {
        username: this.username,
        password: this.password,
      };
      const apiResponse = await axios.post('/login', dataPost);

      this.api = await apiResponse.data;
      this.message = await apiResponse.data.message;
    },
  },
};
</script>
<style scoped>
.title-nubank {
  color:blueviolet;
}
span.message {
  position: relative;
  color: rgb(214, 176, 8);
  background-color: #000;
  border-radius: 5px;
  border: 1px solid blueviolet;
  top: 20px;
  padding: 10px;
}
</style>
