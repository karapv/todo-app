<template>
    <div class="container flex-container not-found-container">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="not-found-title">404</h1>
                <h2 class="not-found-subtitle">Oops!  It seems that such a page does not exist.</h2>
                <b-button variant="success" class="not-found-btn" @click="backToHome"> Back to the main page</b-button>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
  @import "not-found"
</style>
<script>
    import router from "@/router";
    export default {
        name: "NotFound",
        methods:{
            backToHome(){
                router.push({ name: 'Home' });
            }
        }
    }
</script>

