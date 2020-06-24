<template>
    <div :class="{'popup': true,'active': this.getPopup.enable}">
        <div class="flex-container popup-container">
            <div class="confirm-popup">
                <h4 class="confirm-popup-title">Are you sure?</h4>
                <div class="grid-container confirm-popup-btns">
                    <b-button variant="success" class="btn-popup" @click="confirmPopup">Yes</b-button>
                    <b-button variant="danger" class="btn-popup" @click="cancelPopup">No</b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
  @import "popup-confirm"
</style>
<script lang="ts">
    import { mapGetters } from 'vuex';
    export default {
        name: "popup-confirm",
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters(['getPopup'])
        },
        methods:{
            confirmPopup(): void {
                this.$store.dispatch('changePopup',{enable: false, confirm: true, id: this.getPopup.id});
            },
            cancelPopup(): void {
                this.$store.dispatch('changePopup',{enable: false, confirm: false, id: this.getPopup.id});
            }
        }
    }
</script>

