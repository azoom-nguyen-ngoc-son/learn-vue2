<template>
    <div>
        <HeaderPage />
        <ContainerPage/>
    </div>
</template>

<script>
import HeaderPage from '../../components/Header.vue'
import ContainerPage from '../../components/ContainerPage.vue'
    export default {
        name: "HomePage",
        components: {
            HeaderPage,
            ContainerPage
        }
    }
</script>

<style lang="scss" scoped>

</style>