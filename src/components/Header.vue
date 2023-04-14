<template>
    <div>
        <h1> this is commit 1</h1>
        <div class="headerPage" v-bind:style="{ 'background-color': backgroundHeader }">
            <box-icon class='icon' name='menu'></box-icon>
            <h1 class='title'>{{ titleHeader }} </h1>
            <box-icon 
                v-if="isDetailPage" 
                class="isDetailPage" 
                @click="deleteBoard()" 
                name='trash-alt'>
            </box-icon>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderPage',
    props: {
        titleHeader: {
            type: String,
            default: "Nguyễn Ngọc Sơn"
        },
        backgroundHeader: {
            type: String,
            default: "pink"
        },
        isDetailPage: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        deleteBoard() {
            const data = JSON.parse(localStorage.getItem("data")).filter(x => x.id !== this.$route.params.id)
            let detailData = JSON.parse(localStorage.getItem("detailData")).filter(x => x.paramsId !== this.$route.params.id )
            let cardData = JSON.parse(localStorage.getItem("cardData")).filter(x => x.paramsId !== this.$route.params.id )
            localStorage.setItem("data", JSON.stringify(data))  
            localStorage.setItem("detailData", JSON.stringify(detailData))
            localStorage.setItem("cardData", JSON.stringify(cardData))  

            this.$router.push("/")
        }
    }
}

</script>

<style lang="scss" scoped>
.headerPage {
    display: flex;
    justify-content: space-evenly;
    height: 50px;
    line-height: 1.5;
    font-family: cursive;
    font-size: 16px;
    position: relative;

    >.title {
        color: #fff;
        font-weight: 700;
        font-family: cursive !important;
        margin-top: 10px;
    }

    >.icon {
        position: absolute;
        left: 10px;
        margin-top: 14px;
    }

    >.isDetailPage {
        position: absolute;
        right: 10px;
        margin-top: 20px;
        cursor: pointer;
        width: 16px;
        height: 16px;
    }
}
</style>