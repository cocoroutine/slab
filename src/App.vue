<template>
  <div id="app" class="ui container">
    <router-view />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #app {
    width: 100%;
    float: left;
    margin-left: -260px !important;
  }
  .ui.pusher {
    margin-left: 260px !important;
    padding: 50px 200px !important;
  }
</style>
