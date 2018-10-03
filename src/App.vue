<template>
  <div id="app">
    <h1 class='title'>Bank Data Analysis</h1>
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  background-color: rgb(173, 173, 173);

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.title {
  color: #fff;
  font-size: 36px;
}
</style>
