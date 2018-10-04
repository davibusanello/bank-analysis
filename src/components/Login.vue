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

    <div v-if="api.loaded" class="charts">
      <span class="title">Categories</span>
      <bar-chart  :data=this.api.data.categories></bar-chart>
    </div>

  </div>
</template>

<script>

import BarChart from './Charts/CategoriesChart.vue';

export default {
  name: 'Login',
  components: { BarChart },
  data: () => ({
    username: null,
    password: null,
    message: null,
    api: { loaded: false },
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
      const apiResponse = await this.axios.post('/login', dataPost);

      this.api.data = await apiResponse.data.data;
      this.api.loaded = await true;
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
