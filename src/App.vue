<template>
  <div id="app">
    <router-view/>
    <PopupConfirm/>
  </div>
</template>
<style lang="sass">
  @import "App"
</style>

<script>
  import PopupConfirm from "@/components/popup-confirm/PopupConfirm";
  export default {
    components: {PopupConfirm}
  }
</script>