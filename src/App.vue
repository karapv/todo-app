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
  import PopupConfirm from "@/components/popup-confirm/popup-confirm";
  export default {
    components: {PopupConfirm}
  }
</script>