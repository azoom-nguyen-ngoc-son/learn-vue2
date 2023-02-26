<template>
    <div>
        <div class="header-page">
            <box-icon class='icon' name='menu'></box-icon>
            <h1 class='title'>Nguyễn Ngọc Sơn </h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderPage'
    }
</script>

<style lang="scss" scoped>
    .header-page{
        display: flex;
        justify-content: center;
        height: 50px;
        background-color: #d3a1eb;
        line-height: 1.5;
        font-family: cursive;
        font-size: 16px;
        position: relative;
        > .title{
            color: #fff;
            font-weight: 700;
            font-family: cursive !important;
            margin-top: 10px;
        }
        > .icon{
            position: absolute;
            left: 10px;
            margin-top: 14px;
        }
    }

</style>