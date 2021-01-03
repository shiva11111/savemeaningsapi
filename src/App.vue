<template>
  <div id="app">
    <div class="container">
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Search</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/meanings" class="nav-link"
              >Saved Meanings</router-link
            >
          </li>
        </ul>
      </nav>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
