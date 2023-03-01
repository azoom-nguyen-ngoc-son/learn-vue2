<template>  
    <div class="containerDetailBoard" 
        v-bind:style="{ 'background-color': backgroundHeader }" >
        <HeaderPage 
            :titleHeader="titleHeader" 
            :backgroundHeader="backgroundHeader"
            :isDetailPage=true>
        </HeaderPage>
        <DetailBoard :itemBoard="itemBoard" />
    </div>
</template>

<script>
import HeaderPage from "../../components/Header.vue"
import DetailBoard from "../../components/DetailBoard.vue"
export default {
    name: "DetailBoardPage",
    components: { HeaderPage, DetailBoard },

    data() {
        return {
            itemBoard: {},
            titleHeader: "DetailBoard",
            backgroundHeader: "",
            isDetailPage: Boolean
        }
    },
    created() {
        this.itemBoard = JSON.parse(localStorage.getItem("data")).filter(item => item.id === this.$route.params.id)[0];
        this.backgroundHeader = this.itemBoard.colorCode
    },
}
</script>

<style lang="scss" scoped>
.containerDetailBoard{
    height: 100%;
    overflow-x: scroll;
}
</style>