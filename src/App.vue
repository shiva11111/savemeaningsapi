<template>
  <div id="app">
    <div class="container">
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/meanings" class="nav-link"
              >Create Post</router-link
            >
          </li>
        </ul>
      </nav>
      <br />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
